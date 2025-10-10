// navbar.component.ts
import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  get currentTheme() {
    return this.themeService.isDarkMode() ? 'dark' : 'light';
  }

  get isDarkMode() {
    return this.themeService.isDarkMode();
  }
}

