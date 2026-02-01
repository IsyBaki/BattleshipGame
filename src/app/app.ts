//import 'zone.js'; // das muss man hier haben sonst zeigt fehler beim testen an.

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuBar } from './menu-bar/menu-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('battleship');
}
