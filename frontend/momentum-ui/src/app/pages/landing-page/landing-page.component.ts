import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BrowserStorageService } from '../../services/browser-storage.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  @Output() getStarted = new EventEmitter<'single' | 'pair' | 'group'>();
  @Output() login = new EventEmitter<void>();

  constructor(
    private router: Router,
    private storageService: BrowserStorageService
  ) {}

  handleGetStarted(mode: 'single' | 'pair' | 'group') {
    // Store selected mode in localStorage for cross-page state using storage service
    this.storageService.setItem('selectedMode', mode);

    // Use router navigation and also emit event for backward compatibility
    this.router.navigate(['/auth'], { queryParams: { mode } });
    this.getStarted.emit(mode);
  }

  handleLogin() {
    // Use router navigation and also emit event for backward compatibility
    this.router.navigate(['/auth']);
    this.login.emit();
  }

  // Navigate to home page when clicking on the logo/name
  navigateToHome(): void {
    // Since we're already on the landing/home page, we can simply refresh or do nothing
    // For consistency with other components, we'll use the router to navigate to the home route
    this.router.navigate(['/']);
  }
}
