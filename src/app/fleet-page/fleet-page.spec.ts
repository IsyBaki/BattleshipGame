import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { FleetPage } from './fleet-page';

describe('FleetPage', () => {
  let component: FleetPage;
  let fixture: ComponentFixture<FleetPage>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FleetPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  // test case 1: should create the component
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // test case 2: should initialize ships and board
  it('should start with no selected ship', () => {
    expect(component.selectedShipName).toBeNull();
  });

  // test case 3: should select a ship
  it('should select a ship', () => {
    const ship = component.ships[0];

    component.selectShip(ship.name);

    expect(component.selectedShipName).toBe(ship.name);
  });

  // test case 4: should deselect a ship if the same one is selected again
  it('should return true when the ship is selected', () => {
    const ship = component.ships[0];
    component.selectedShipName = ship.name;

    expect(component.isSelected(ship.name)).toBeTrue();
  });

  // test case 5: should return false when a different ship is selected
  it('should return false when the ship is not selected', () => {
    component.selectedShipName = component.ships[0].name;

    expect(component.isSelected(component.ships[1].name)).toBeFalse();
  });

  // test case 6: should return false when no ship is selected
  it('should show message when rotateSelected is called without selected ship', () => {
    component.selectedShipName = null;

    component.rotateSelected();

    expect(component.showMessage).toBeTrue();
  });

  // test case 7: should rotate selected ship
  it('should rotate ship when one is selected', () => {
    component.selectedShipName = component.ships[0].name;
    component.isVertical = false;

    component.rotateSelected();

    expect(component.isVertical).toBeTrue();
  });

  // test case 8: should set draggedShipName and selectedShipName on drag start
  it('should set draggedShipName and selectedShipName on drag start', () => {
    const ship = component.ships[0];

    component.onShipDragStart(ship.name);

    expect(component.draggedShipName).toBe(ship.name);
    expect(component.selectedShipName).toBe(ship.name);
  });

  // test case 9: should clear draggedShipName and preview on drag end
  it('should clear draggedShipName on drag end', () => {
    component.draggedShipName = component.ships[0].name;
    component.previewCells = [{ row: 1, col: 1 }];
    component.previewValid = true;

    component.onShipDragEnd();

    expect(component.draggedShipName).toBeNull();
    expect(component.previewCells).toEqual([]);
    expect(component.previewValid).toBeFalse();
  });

  // test case 10: should update preview on cell hover during drag
  it('should place selected ship on cell click', () => {
    const ship = component.ships[0];
    component.selectedShipName = ship.name;

    component.onCellClick(0, 0);

    expect(ship.placed).toBeTrue();
    expect(ship.row).toBe(0);
    expect(ship.col).toBe(0);
  });

  // test case 11: should not place ship on cell click when placement is invalid
  it('should not place ship on cell click when no ship is selected', () => {
    component.selectedShipName = null;

    component.onCellClick(0, 0);

    expect(component.board[0][0]).toBeNull();
  });

  // test case 12: should return ship by name
  it('should return a ship by name', () => {
    const ship = component.ships[0];

    expect(component.getShipByName(ship.name)).toBe(ship);
  });

  // test case 13: should return undefined for unknown ship name
  it('should return undefined for unknown ship name', () => {
    expect(component.getShipByName('unknown')).toBeUndefined();
  });

  // test case 14: should return true when ship can be placed
  it('should return true when ship can be placed', () => {
    const ship = component.ships[0];

    expect(component.canPlaceShip(ship, 0, 0, false)).toBeTrue();
  });

  // test case 15: should return false when ship cannot be placed due to size
  it('should return false when ship cannot be placed outside board', () => {
    const ship = component.ships[0];

    expect(component.canPlaceShip(ship, 0, component.boardSize, false)).toBeFalse();
  });

  // test case 16: should return false when ship cannot be placed due to overlap
  it('should place a ship on the board', () => {
    const ship = component.ships[0];

    component.placeShip(ship.name, 0, 0);

    expect(ship.placed).toBeTrue();
    expect(component.board[0][0]).toBe(ship.name);
  });

  // test case 17: should remove ship from board
  it('should remove a ship from the board', () => {
    const ship = component.ships[0];
    component.placeShip(ship.name, 0, 0);

    component.removeShipFromBoard(ship);

    expect(ship.placed).toBeFalse();
    expect(ship.row).toBeNull();
    expect(ship.col).toBeNull();
  });

  // test case 18: should clear preview
  it('should clear preview', () => {
    component.previewCells = [{ row: 0, col: 0 }];
    component.previewValid = true;

    component.clearPreview();

    expect(component.previewCells).toEqual([]);
    expect(component.previewValid).toBeFalse();
  });

  // test case 19: should detect occupied cell
  it('should detect preview cell', () => {
    component.previewCells = [{ row: 2, col: 3 }];

    expect(component.isPreviewCell(2, 3)).toBeTrue();
    expect(component.isPreviewCell(0, 0)).toBeFalse();
  });

  // test case 20: should return null for empty cell
  it('should return null when no ship is at cell', () => {
    expect(component.getShipAtCell(0, 0)).toBeNull();
  });

  // test case 21: should return ship at occupied cell
  it('should return ship at occupied cell', () => {
    const ship = component.ships[0];
    component.placeShip(ship.name, 0, 0);

    expect(component.getShipAtCell(0, 0)?.name).toBe(ship.name);
  });

  // test case 22: should return false when not all ships are placed
  it('should return false when not all ships are placed', () => {
    expect(component.allShipsPlaced()).toBeFalse();
  });

  // test case 23: should return true when all ships are placed
  it('should return true when all ships are placed', () => {
    component.ships.forEach((ship, index) => {
      component.placeShip(ship.name, index, 0);
    });

    expect(component.allShipsPlaced()).toBeTrue();
  });

  // test case 24: should not navigate when not all ships are placed
  it('should not navigate when not all ships are placed', () => {
    spyOn(window, 'alert');

    component.onReadyClick();

    expect(window.alert).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  // test case 25: should navigate to game in singleplayer mode when all ships are placed
  it('should navigate to game in singleplayer mode when all ships are placed', () => {
    component.mode = 'singleplayer';

    component.ships.forEach((ship, index) => {
      component.placeShip(ship.name, index, 0);
    });

    component.onReadyClick();

    expect(router.navigate).toHaveBeenCalledWith(['/game']);
  });

  // test case 26: should navigate to waiting room in multiplayer mode when all ships are placed
  it('should reset board for next player', () => {
    const ship = component.ships[0];
    component.placeShip(ship.name, 0, 0);
    component.selectedShipName = ship.name;
    component.draggedShipName = ship.name;
    component.previewCells = [{ row: 0, col: 0 }];
    component.previewValid = true;

    component.resetBoardForNextPlayer();

    expect(component.board[0][0]).toBeNull();
    expect(component.selectedShipName).toBeNull();
    expect(component.draggedShipName).toBeNull();
    expect(component.previewCells).toEqual([]);
    expect(component.previewValid).toBeFalse();
  });

  //===========================Die anderen Test cases hier einfügen===========================
});