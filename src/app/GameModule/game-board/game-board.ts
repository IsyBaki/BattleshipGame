import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-board.html',
  styleUrl: './game-board.scss',
})
export class GameBoard {

  //=============================== Board-Größe und Koordinaten =========================================
  boardSize = 10;

  rows = Array.from({ length: this.boardSize }, (_, i) => i);

  cols = Array.from({ length: this.boardSize }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  //=============================== Nachricht / Popup =========================================
  message: string = '';
  showPopup = false;
  isHitPopup = false;

  //=============================== Board-Daten =========================================
  oceanBoard: string[][] = Array.from({ length: this.boardSize }, () =>
    Array(this.boardSize).fill('')
  );

  targetBoard: string[][] = Array.from({ length: this.boardSize }, () =>
    Array(this.boardSize).fill('')
  );

  enemyShips: string[][] = Array.from({ length: this.boardSize }, () =>
    Array(this.boardSize).fill('')
  );

  // Für kurze Explosion / Animation im Feld
  animatedHitCell: { row: number; col: number } | null = null;
  animatedMissCell: { row: number; col: number } | null = null;

  //=============================== Konstruktor / Demo-Schiffe setzen =========================================
  
  // Hier setze ich paar schiffe als Test !!!!!!!
  // erste Reihe wäre 0 index [0][0] = A1, [0][1] = B1, ... [0][9] = J1
  
  constructor() {
    this.enemyShips[2][3] = 'ship';
    this.enemyShips[2][4] = 'ship';
    this.enemyShips[2][5] = 'ship';
    this.enemyShips[2][6] = 'ship';
    this.enemyShips[2][7] = 'ship';

    this.enemyShips[3][3] = 'ship';
    this.enemyShips[3][4] = 'ship';
    this.enemyShips[3][5] = 'ship';
    this.enemyShips[3][6] = 'ship';

    this.enemyShips[4][3] = 'ship';
    this.enemyShips[4][4] = 'ship';
    this.enemyShips[4][5] = 'ship';
    
    this.enemyShips[5][3] = 'ship';
    this.enemyShips[5][4] = 'ship';
    this.enemyShips[5][5] = 'ship';
    
    this.enemyShips[6][3] = 'ship';
    this.enemyShips[6][4] = 'ship';


     
  }

  //=============================== Funktion für Klick auf das Target Board =========================================
  shoot(row: number, col: number): void {
    if (this.targetBoard[row][col] !== '') return;

    if (this.enemyShips[row][col] === 'ship') {
      this.targetBoard[row][col] = 'hit';
      this.showShotPopup(' Treffer!', true);
      this.playHitSound();
      this.triggerHitAnimation(row, col);
    } else {
      this.targetBoard[row][col] = 'miss';
      this.showShotPopup(' Miss!', false);
      this.playMissSound();
      this.triggerMissAnimation(row, col);
    }

    console.log(`Shot at: ${this.cols[col]}${row + 1}`);
  }

  //=============================== Funktion für Popup =========================================
  showShotPopup(text: string, isHit: boolean): void {
    this.message = text;
    this.isHitPopup = isHit;
    this.showPopup = true;

    setTimeout(() => {
      this.showPopup = false;
    }, 1000);
  }

  //=============================== Funktion für Sound bei Treffer =========================================
  playHitSound(): void {
    const audio = new Audio('/sound/hit.mp3');
    audio.volume = 0.6;
    audio.play().catch(() => {});
  }

  //=============================== Funktion für Sound bei Miss =========================================
  playMissSound(): void {
    const audio = new Audio('/sound/miss.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {});
  }

  //=============================== Funktion für Hit-Animation im Feld =========================================
  triggerHitAnimation(row: number, col: number): void {
    this.animatedHitCell = { row, col };

    setTimeout(() => {
      this.animatedHitCell = null;
    }, 500);
  }

  //=============================== Funktion für Miss-Animation im Feld =========================================
  triggerMissAnimation(row: number, col: number): void {
    this.animatedMissCell = { row, col };

    setTimeout(() => {
      this.animatedMissCell = null;
    }, 500);
  }

  //=============================== Funktion ob Hit-Zelle gerade animiert wird =========================================
  isAnimatedHitCell(row: number, col: number): boolean {
    return !!this.animatedHitCell &&
      this.animatedHitCell.row === row &&
      this.animatedHitCell.col === col;
  }

  //=============================== Funktion ob Miss-Zelle gerade animiert wird =========================================
  isAnimatedMissCell(row: number, col: number): boolean {
    return !!this.animatedMissCell &&
      this.animatedMissCell.row === row &&
      this.animatedMissCell.col === col;
  }

  //=============================== Funktion für CSS-Klassen der Ocean-Zellen =========================================
  getOceanCellClass(row: number, col: number): string {
    const value = this.oceanBoard[row][col];

    if (value === 'hit') return 'hit';
    if (value === 'miss') return 'miss';
    if (value === 'ship') return 'ship';

    return 'water';
  }

  //=============================== Funktion für CSS-Klassen der Target-Zellen =========================================
  getTargetCellClass(row: number, col: number): string {
    const value = this.targetBoard[row][col];

    if (value === 'hit') return 'hit';
    if (value === 'miss') return 'miss';

    return 'water';
  }

  //=============================== Funktion ob Target-Zelle schon benutzt wurde =========================================
  isTargetCellDisabled(row: number, col: number): boolean {
    return this.targetBoard[row][col] !== '';
  }
}



//=============================== andere Funktionen =========================================