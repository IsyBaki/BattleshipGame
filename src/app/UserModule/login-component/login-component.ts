import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {

  // Router-Instanz injizieren
  constructor(private router: Router) {}

  // Switch: Register anzeigen
  switchToSignUp() {
    document.getElementById('container')
      ?.classList.add('right-panel-active');
  }

  // Switch: Sign In anzeigen
  switchToSignIn() {
    document.getElementById('container')
      ?.classList.remove('right-panel-active');
  }

  //  Nach dem Anmelden zum Profil navigieren
  onSignIn() {
    this.router.navigate(['/profile']);
  }
}
