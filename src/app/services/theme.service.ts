import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

//Service that handles the theme of the app
export class ThemeService {

  private darkMode = false; // false = light mode (default), true = dark mode

  toggleTheme() {
    this.darkMode = !this.darkMode;
  }

  isDarkMode() {
    return this.darkMode;
  }
}
