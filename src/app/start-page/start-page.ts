import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './start-page.html',
  styleUrl: './start-page.scss',
})
export class StartPage {

}
