import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-game-room',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './game-room.html',
  styleUrl: './game-room.scss',
})
export class GameRoom {

 
  canStartGame = false;

  // Beispiel: wenn 2 Spieler im Raum sind
  onSecondPlayerJoined(){
    this.canStartGame = true;
  }

}
