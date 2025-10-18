import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//Service that handles the theme of the app
export class ThemeService {

  private currentTheme = signal<'light' | 'dark'>('light');

  constructor() {

    if(typeof window === 'undefined') return;

    const retrievedTheme = localStorage.getItem('theme');

    if(retrievedTheme){
      this.currentTheme.set(JSON.parse(retrievedTheme))
    }
  }

  setTheme(theme: 'light' | 'dark'){
    this.currentTheme.set(theme);
    document.documentElement.setAttribute('data-theme', theme);
    this.saveTheme();
  }

  toggleTheme() {
    const newTheme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }
  
  get theme() {
    return this.currentTheme.asReadonly();
  }

  private saveTheme(){
    localStorage.setItem('theme', JSON.stringify(this.currentTheme()));
  }
}
