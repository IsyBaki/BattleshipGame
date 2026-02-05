import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {

 // Eingaben aus dem Formular
  email = '';
  password = '';

  // Fehlermeldung
  loginError: string | null = null;



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

  //  Nach dem Anmelden zum Profil navigieren, erst landet man auf der Profilseite
  onSignIn() {
    this.router.navigate(['/profile']);
  }


  
}
