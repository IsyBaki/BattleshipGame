import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-fleet-page',
  standalone: true,
  imports: [RouterLink], 
  templateUrl: './fleet-page.html',
  styleUrls: ['./fleet-page.scss'],
})
export class FleetPage {

  // Router-Service für Navigation 
  constructor(private router: Router) {}

 
  // hotseat = 2 Spieler an einem Gerät
  // singleplayer = später gegen AI
  mode: 'hotseat' | 'singleplayer' = 'hotseat';

  // Welcher Spieler platziert gerade seine Schiffe
  currentPlayer: 1 | 2 = 1;

  // Text für den einzigen Button unten auf der Fleet-Seite
  readyButtonText = 'Start Game';

  // Wird geklickt, wenn der Ready-Button gedrückt wird
  onReadyClick() {

    // Hotseat: Player 1 ist fertig → zu Player 2 wechseln
    if (this.mode === 'hotseat' && this.currentPlayer === 1) {
      this.currentPlayer = 2;
      this.readyButtonText = 'Start Game';

      // TODO:
      // - Board zurücksetzen
      // - Ships für Player 2 neu platzieren lassen
    } 
    // Alle anderen Fälle → Spiel starten
    else {
      // Navigation zur GameBoard-Seite
      this.router.navigate(['/game']);
    }
  }
}
