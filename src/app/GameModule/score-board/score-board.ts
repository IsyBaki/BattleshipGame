import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-score-board',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './score-board.html',
  styleUrl: './score-board.scss',
})
export class ScoreBoard {


  // Dummy datan als beispiel, später mit echtem backend verbinden
   stats = {
    total: 12,
    wins: 7,
    losses: 5
  };

  games = [
    {
      date: '2026-02-03',
      mode: 'Single',
      result: 'Win',
      moves: 42,
      time: '08:34'
    },
    {
      date: '2026-02-02',
      mode: 'Multi',
      result: 'Lose',
      moves: 57,
      time: '14:10'
    },
    {
      date: '2026-02-01',
      mode: 'Single',
      result: 'Win',
      moves: 33,
      time: '06:45'
    },

    {
      date: '2026-01-31',
      mode: 'AI',
      result: 'Lose',
      moves: 48,
      time: '12:20'
    
    }

  ];



}
