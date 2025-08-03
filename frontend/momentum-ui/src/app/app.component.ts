import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ModeSelectionComponent } from './pages/mode-selection/mode-selection.component';
import { CodingSectionComponent } from './pages/coding-section/coding-section.component';
import { AboutComponent } from './pages/about/about.component';
// Import AuthPage and Dashboard from Components folder (note the capital C)
import { AuthPageComponent } from './Components/auth/auth-page.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

type AppState = 'landing' | 'auth' | 'mode-selection' | 'dashboard' | 'about';
type Mode = 'single' | 'pair' | 'group';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LandingPageComponent,
    AuthPageComponent,
    ModeSelectionComponent,
    DashboardComponent,
    CodingSectionComponent,
    AboutComponent,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // Navigation state
  currentView: AppState = 'landing';
  selectedMode: Mode = 'single';
  currentSection: string = 'dashboard';

  constructor(private router: Router) {}

  ngOnInit() {
    // Keep track of current view based on router navigation
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects;
        if (url === '/') {
          this.currentView = 'landing';
        } else if (url === '/auth') {
          this.currentView = 'auth';
        } else if (url === '/mode-selection') {
          this.currentView = 'mode-selection';
        } else if (url === '/dashboard') {
          this.currentView = 'dashboard';
        } else if (url === '/about') {
          this.currentView = 'about';
        }
      });
  }

  // Handle direct navigation
  navigateTo(view: AppState) {
    this.currentView = view;

    // Navigate using the router to change the URL
    switch (view) {
      case 'landing':
        this.router.navigate(['/']);
        break;
      case 'auth':
        this.router.navigate(['/auth']);
        break;
      case 'mode-selection':
        this.router.navigate(['/mode-selection']);
        break;
      case 'dashboard':
        this.router.navigate(['/dashboard']);
        break;
      case 'about':
        this.router.navigate(['/about']);
        break;
    }
  }

  // Go back using browser history
  goBack() {
    window.history.back();
  }

  // Go forward using browser history
  goForward() {
    window.history.forward();
  } // User flow handlers - these methods are now primarily kept for backward compatibility
  // In the new routing approach, most navigation is handled directly in the components

  handleGetStarted(mode: Mode) {
    this.selectedMode = mode;
    this.router.navigate(['/auth'], { queryParams: { mode } });
  }

  handleLogin() {
    this.router.navigate(['/auth']);
  }

  handleAuthSuccess() {
    this.router.navigate(['/mode-selection']);
  }

  handleModeSelect(mode: Mode) {
    this.selectedMode = mode;
    this.router.navigate(['/dashboard'], { queryParams: { mode } });
  }

  // Direct to dashboard (skip mode selection)
  handleSkipToDashboard() {
    this.router.navigate(['/dashboard'], {
      queryParams: { mode: this.selectedMode },
    });
  }

  handleSectionClick(section: string) {
    this.currentSection = section;
    this.router.navigate(['/dashboard'], {
      queryParams: {
        mode: this.selectedMode,
        section: section,
      },
      queryParamsHandling: 'merge',
    });
  }
}
