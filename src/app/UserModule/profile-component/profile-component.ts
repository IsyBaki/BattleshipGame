import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


// Beispielhafte UserProfile-Struktur
type UserProfile = {
  username: string;
  email: string;
  createdAt: string;
  stats: {
    games: number;
    wins: number;
    losses: number;
  };
};

@Component({
  selector: 'app-profile-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-component.html',
  styleUrl: './profile-component.scss',
})

// Profil-Komponente für die Anzeige und Bearbeitung von Benutzerprofilen
export class ProfileComponent implements OnInit {
  loading = true;
  editingName = false;
  error: string | null = null;

  profile!: UserProfile;
  newUsername = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    //  später durch echten UserService ersetzen
    this.profile = {
      username: 'Isy',
      email: 'isy@mail.com',
      createdAt: '2026-01-01T10:00:00Z',
      stats: {
        games: 20,
        wins: 12,
        losses: 8,
      },
    };

    this.newUsername = this.profile.username;
    this.loading = false;
  }

  get winRate(): number {
    const { games, wins } = this.profile.stats;
    return games === 0 ? 0 : Math.round((wins / games) * 100);
  }

  startEditName() {
    this.editingName = true;
  }

  cancelEditName() {
    this.newUsername = this.profile.username;
    this.editingName = false;
  }

  saveName() {
    if (this.newUsername.trim().length < 3) {
      this.error = 'Name must be at least 3 characters long.';
      return;
    }

    this.profile.username = this.newUsername.trim();
    this.editingName = false;
    this.error = null;

    // TODO: UserService.updateUsername(...)
  }

  logout() {
    // TODO: AuthService.logout()
    this.router.navigate(['/login']);
  }
}
