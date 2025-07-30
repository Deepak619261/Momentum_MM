import { Component } from '@angular/core';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AuthPageComponent } from './Components/app/pages/auth-page/auth-page.component';
import { CommonModule } from '@angular/common';

type AppState = 'landing' | 'auth' | 'mode-selection' | 'dashboard';
type Mode = 'single' | 'pair' | 'group';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LandingPageComponent,
    AuthPageComponent,
    // ModeSelectionComponent,
    // DashboardComponent,
    // CommonModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentView: AppState = 'landing';
  selectedMode: Mode = 'single';
  currentSection: string = 'dashboard';

  handleGetStarted(mode: Mode) {
    this.selectedMode = mode;
    this.currentView = 'auth';
  }

  handleLogin() {
    this.currentView = 'auth';
  }

  handleAuthSuccess() {
    this.currentView = 'mode-selection';
  }

  handleModeSelect(mode: Mode) {
    this.selectedMode = mode;
    this.currentView = 'dashboard';
  }

  handleSectionClick(section: string) {
    this.currentSection = section;
    console.log('Navigate to section:', section);
  }
}
