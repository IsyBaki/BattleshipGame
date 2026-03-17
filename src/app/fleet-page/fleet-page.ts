import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

// Interface für die Schiffe
interface Ship {
  name: string;
  size: number;
  image: string;
  placed: boolean;
  row: number | null;
  col: number | null;
  vertical: boolean;
}

@Component({
  selector: 'app-fleet-page',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './fleet-page.html',
  styleUrls: ['./fleet-page.scss'],
})
export class FleetPage {

  //======================= Funktion für die Rotation der Schiffe =======================
  isVertical = false;
  selectedShipName: string | null = null;
  showMessage = false;

  selectShip(shipName: string): void {
    this.selectedShipName = shipName;
  }

  rotateSelected(): void {
    if (!this.selectedShipName) {
      this.showMessage = true;

      setTimeout(() => {
        this.showMessage = false;
      }, 2000);

      return;
    }

    this.isVertical = !this.isVertical;
  }

  isSelected(shipName: string): boolean {
    return this.selectedShipName === shipName;
  }

  //======================= Funktion für das Board und die Schiffe =======================
  boardSize = 10;
  rows = Array.from({ length: this.boardSize }, (_, i) => i);
  cols = Array.from({ length: this.boardSize }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  ships: Ship[] = [
    {
      name: 'Carrier',
      size: 5,
      image: '/image/ships/aircraft carrier.png',
      placed: false,
      row: null,
      col: null,
      vertical: false,
    },
    {
      name: 'Battleship',
      size: 4,
      image: '/image/ships/battleship.png',
      placed: false,
      row: null,
      col: null,
      vertical: false,
    },
    {
      name: 'Cruiser',
      size: 3,
      image: '/image/ships/Cruiser.png',
      placed: false,
      row: null,
      col: null,
      vertical: false,
    },
    {
      name: 'Submarine',
      size: 3,
      image: '/image/ships/Submarine.png',
      placed: false,
      row: null,
      col: null,
      vertical: false,
    },
    {
      name: 'Destroyer',
      size: 2,
      image: '/image/ships/destroyer.png',
      placed: false,
      row: null,
      col: null,
      vertical: false,
    }
  ];

  board: (string | null)[][] = Array.from({ length: this.boardSize }, () =>
    Array(this.boardSize).fill(null)
  );

  draggedShipName: string | null = null;
  previewCells: { row: number; col: number }[] = [];
  previewValid = false;

  //======================= Funktion für Drag and Drop der Schiffe =======================
  onShipDragStart(shipName: string): void {
    this.draggedShipName = shipName;
    this.selectedShipName = shipName;
  }

  onShipDragEnd(): void {
    this.draggedShipName = null;
    this.clearPreview();
  }

  onCellDragOver(event: DragEvent, row: number, col: number): void {
    event.preventDefault();

    const shipName = this.draggedShipName ?? this.selectedShipName;
    if (!shipName) return;

    const ship = this.getShipByName(shipName);
    if (!ship) return;

    this.showPreview(ship, row, col);
  }

  onCellDrop(event: DragEvent, row: number, col: number): void {
    event.preventDefault();

    const shipName = this.draggedShipName ?? this.selectedShipName;
    if (!shipName) return;

    this.placeShip(shipName, row, col);
    this.draggedShipName = null;
    this.clearPreview();
  }

  onCellClick(row: number, col: number): void {
    if (!this.selectedShipName) return;
    this.placeShip(this.selectedShipName, row, col);
  }

  //======================= Funktion für die Platzierung der Schiffe =======================
  placeShip(shipName: string, startRow: number, startCol: number): void {
    const ship = this.getShipByName(shipName);
    if (!ship) return;

    const vertical = this.isVertical;

    const oldState = {
      placed: ship.placed,
      row: ship.row,
      col: ship.col,
      vertical: ship.vertical,
    };

    if (ship.placed) {
      this.removeShipFromBoard(ship);
    }

    if (!this.canPlaceShip(ship, startRow, startCol, vertical)) {
      if (
        oldState.placed &&
        oldState.row !== null &&
        oldState.col !== null
      ) {
        ship.vertical = oldState.vertical;
        this.writeShipToBoard(
          ship,
          oldState.row,
          oldState.col,
          oldState.vertical
        );
      }
      return;
    }

    ship.vertical = vertical;
    this.writeShipToBoard(ship, startRow, startCol, vertical);
  }

  canPlaceShip(
    ship: Ship,
    startRow: number,
    startCol: number,
    vertical: boolean
  ): boolean {
    for (let i = 0; i < ship.size; i++) {
      const row = vertical ? startRow + i : startRow;
      const col = vertical ? startCol : startCol + i;

      if (row < 0 || row >= this.boardSize || col < 0 || col >= this.boardSize) {
        return false;
      }

      if (this.board[row][col] !== null) {
        return false;
      }
    }

    return true;
  }

  writeShipToBoard(
    ship: Ship,
    startRow: number,
    startCol: number,
    vertical: boolean
  ): void {
    for (let i = 0; i < ship.size; i++) {
      const row = vertical ? startRow + i : startRow;
      const col = vertical ? startCol : startCol + i;

      this.board[row][col] = ship.name;
    }

    ship.placed = true;
    ship.row = startRow;
    ship.col = startCol;
    ship.vertical = vertical;
  }

  removeShipFromBoard(ship: Ship): void {
    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        if (this.board[row][col] === ship.name) {
          this.board[row][col] = null;
        }
      }
    }

    ship.placed = false;
    ship.row = null;
    ship.col = null;
  }

  getShipByName(shipName: string): Ship | undefined {
    return this.ships.find((ship) => ship.name === shipName);
  }

  //======================= Funktion für die Vorschau der Platzierung =======================
  showPreview(ship: Ship, startRow: number, startCol: number): void {
    const vertical = this.isVertical;
    const cells: { row: number; col: number }[] = [];

    for (let i = 0; i < ship.size; i++) {
      const row = vertical ? startRow + i : startRow;
      const col = vertical ? startCol : startCol + i;
      cells.push({ row, col });
    }

    this.previewCells = cells;
    this.previewValid = this.canPlaceShipPreview(ship, startRow, startCol, vertical);
  }

  canPlaceShipPreview(
    ship: Ship,
    startRow: number,
    startCol: number,
    vertical: boolean
  ): boolean {
    const ownCells = new Set<string>();

    if (ship.placed) {
      for (let row = 0; row < this.boardSize; row++) {
        for (let col = 0; col < this.boardSize; col++) {
          if (this.board[row][col] === ship.name) {
            ownCells.add(`${row}-${col}`);
          }
        }
      }
    }

    for (let i = 0; i < ship.size; i++) {
      const row = vertical ? startRow + i : startRow;
      const col = vertical ? startCol : startCol + i;

      if (row < 0 || row >= this.boardSize || col < 0 || col >= this.boardSize) {
        return false;
      }

      const value = this.board[row][col];
      const isOwnCell = ownCells.has(`${row}-${col}`);

      if (value !== null && !isOwnCell) {
        return false;
      }
    }

    return true;
  }

  clearPreview(): void {
    this.previewCells = [];
    this.previewValid = false;
  }

  isPreviewCell(row: number, col: number): boolean {
    return this.previewCells.some((cell) => cell.row === row && cell.col === col);
  }

  //======================= Funktion für die Anzeige der Schiffe auf dem Board =======================
  getShipAtCell(row: number, col: number): Ship | null {
    const shipName = this.board[row][col];
    if (!shipName) return null;
    return this.getShipByName(shipName) ?? null;
  }

  isShipStartCell(row: number, col: number): boolean {
    const ship = this.getShipAtCell(row, col);
    if (!ship) return false;
    return ship.row === row && ship.col === col;
  }

  getShipStyle(ship: Ship): { [key: string]: string } {
    const gap = 'var(--gap)';
    const span = ship.size;

    if (ship.vertical) {
      return {
        width: `calc(${span} * 100% + (${span - 1}) * ${gap})`,
        height: '100%',
      };
    }

    return {
      width: `calc(${span} * 100% + (${span - 1}) * ${gap})`,
      height: '100%',
    };
  }

  allShipsPlaced(): boolean {
    return this.ships.every((ship) => ship.placed);
  }

  //======================= Funktion für die Navigation =======================
  constructor(private router: Router) {}

  mode: 'hotseat' | 'singleplayer' = 'hotseat';
  currentPlayer: 1 | 2 = 1;
  readyButtonText = 'Start Game';

  onReadyClick() {
    if (!this.allShipsPlaced()) {
      alert('Please place all ships first.');
      return;
    }

    if (this.mode === 'hotseat' && this.currentPlayer === 1) {
      this.currentPlayer = 2;
      this.readyButtonText = 'Start Game';
      this.resetBoardForNextPlayer();
    } else {
      this.router.navigate(['/game']);
    }
  }

  resetBoardForNextPlayer(): void {
    this.board = Array.from({ length: this.boardSize }, () =>
      Array(this.boardSize).fill(null)
    );

    this.ships = this.ships.map((ship) => ({
      ...ship,
      placed: false,
      row: null,
      col: null,
      vertical: false,
    }));

    this.selectedShipName = null;
    this.draggedShipName = null;
    this.isVertical = false;
    this.clearPreview();
  }
}