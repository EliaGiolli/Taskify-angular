// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';

import { LucideAngularModule, Sun, Moon } from 'lucide-angular';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent,appConfig);
