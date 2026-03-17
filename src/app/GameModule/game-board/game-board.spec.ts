import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoard } from './game-board';

describe('GameBoard', () => {
  let component: GameBoard;
  let fixture: ComponentFixture<GameBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test casse 1: Component Creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test case 2: Initial State
  it('should have correct board size', () => {
    expect(component.boardSize).toBe(10);
    expect(component.rows.length).toBe(component.boardSize);
    expect(component.cols.length).toBe(component.boardSize);
  });

  // Test case 3: Initial State of Boards and Popup
  it('should start with empty message and hidden popup', () => {
    expect(component.message).toBe('');
    expect(component.showPopup).toBeFalse();
    expect(component.isHitPopup).toBeFalse();
  });

  // Test case 4: Shooting Logic
  it('should mark target cell as hit when shooting a ship cell', () => {
    component.enemyShips[0][0] = 'ship';
    spyOn(component, 'showShotPopup');
    spyOn(component, 'playHitSound');
    spyOn(component, 'triggerHitAnimation');

    component.shoot(0, 0);

    expect(component.targetBoard[0][0]).toBe('hit');
    expect(component.showShotPopup).toHaveBeenCalledWith(' Treffer!', true);
    expect(component.playHitSound).toHaveBeenCalled();
    expect(component.triggerHitAnimation).toHaveBeenCalledWith(0, 0);
  });

  // Test case 5: Shooting Logic - Miss
  it('should mark target cell as miss when shooting water', () => {
    component.enemyShips[0][0] = '';
    spyOn(component, 'showShotPopup');
    spyOn(component, 'playMissSound');
    spyOn(component, 'triggerMissAnimation');

    component.shoot(0, 0);

    expect(component.targetBoard[0][0]).toBe('miss');
    expect(component.showShotPopup).toHaveBeenCalledWith(' Miss!', false);
    expect(component.playMissSound).toHaveBeenCalled();
    expect(component.triggerMissAnimation).toHaveBeenCalledWith(0, 0);
  });

  // Test case 6: Shooting Logic - Already Shot Cell
  it('should not shoot the same target cell twice', () => {
    component.targetBoard[0][0] = 'hit';
    spyOn(component, 'showShotPopup');
    spyOn(component, 'playHitSound');
    spyOn(component, 'playMissSound');

    component.shoot(0, 0);

    expect(component.showShotPopup).not.toHaveBeenCalled();
    expect(component.playHitSound).not.toHaveBeenCalled();
    expect(component.playMissSound).not.toHaveBeenCalled();
  });

  // Test case 7: Popup Logic
  it('should set popup values in showShotPopup', () => {
    component.showShotPopup('Test message', true);

    expect(component.message).toBe('Test message');
    expect(component.isHitPopup).toBeTrue();
    expect(component.showPopup).toBeTrue();
  });

  // Test case 8: Animation Logic
  it('should set animated hit cell', () => {
    component.triggerHitAnimation(2, 3);

    expect(component.animatedHitCell).toEqual({ row: 2, col: 3 });
  });

  // Test case 9: Animation Logic - Miss
  it('should set animated miss cell', () => {
    component.triggerMissAnimation(4, 5);

    expect(component.animatedMissCell).toEqual({ row: 4, col: 5 });
  });

  // Test case 10: Cell Class Logic
  it('should return true for animated hit cell', () => {
    component.animatedHitCell = { row: 1, col: 2 };

    expect(component.isAnimatedHitCell(1, 2)).toBeTrue();
    expect(component.isAnimatedHitCell(0, 0)).toBeFalse();
  });

  // Test case 11: Cell Class Logic - Miss
  it('should return true for animated miss cell', () => {
    component.animatedMissCell = { row: 3, col: 4 };

    expect(component.isAnimatedMissCell(3, 4)).toBeTrue();
    expect(component.isAnimatedMissCell(0, 0)).toBeFalse();
  });

  // Test case 12: Cell Class Logic - Ocean and Target Cells
  it('should return correct class for ocean cell', () => {
    component.oceanBoard[0][0] = 'hit';
    component.oceanBoard[0][1] = 'miss';
    component.oceanBoard[0][2] = 'ship';
    component.oceanBoard[0][3] = '';

    expect(component.getOceanCellClass(0, 0)).toBe('hit');
    expect(component.getOceanCellClass(0, 1)).toBe('miss');
    expect(component.getOceanCellClass(0, 2)).toBe('ship');
    expect(component.getOceanCellClass(0, 3)).toBe('water');
  });

  // Test case 13: Cell Class Logic - Target Cells
  it('should return correct class for target cell', () => {
    component.targetBoard[0][0] = 'hit';
    component.targetBoard[0][1] = 'miss';
    component.targetBoard[0][2] = '';

    expect(component.getTargetCellClass(0, 0)).toBe('hit');
    expect(component.getTargetCellClass(0, 1)).toBe('miss');
    expect(component.getTargetCellClass(0, 2)).toBe('water');
  });

  // Test case 14: Cell Disabled Logic
  it('should return true when target cell is disabled', () => {
    component.targetBoard[0][0] = 'hit';

    expect(component.isTargetCellDisabled(0, 0)).toBeTrue();
  });

  // Test case 15: Cell Disabled Logic - Not Disabled
  it('should return false when target cell is not disabled', () => {
    component.targetBoard[0][0] = '';

    expect(component.isTargetCellDisabled(0, 0)).toBeFalse();
  });


//=======================Die anderen Test cases hier =========================

});