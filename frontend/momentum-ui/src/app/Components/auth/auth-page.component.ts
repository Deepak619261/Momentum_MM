import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserStorageService } from '../../services/browser-storage.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AuthPageComponent implements OnInit {
  @Output() skipToDashboard = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  selectedMode: 'single' | 'pair' | 'group' = 'single';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storageService: BrowserStorageService
  ) {}

  ngOnInit() {
    // Get the mode from query params if available
    this.route.queryParams.subscribe((params) => {
      if (params['mode']) {
        this.selectedMode = params['mode'];
      }
    });
  }

  activeTab: 'login' | 'signup' = 'login';
  showPassword = false;
  showConfirmPassword = false;

  // Form fields
  loginEmail = '';
  loginPassword = '';
  signupName = '';
  signupEmail = '';
  signupPassword = '';
  signupConfirmPassword = '';

  setActiveTab(tab: 'login' | 'signup'): void {
    this.activeTab = tab;
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // This component now uses BrowserStorageService for safe localStorage access

  handleSkipToDashboard(): void {
    // Store selected mode in localStorage for cross-page state using storage service
    this.storageService.setItem('selectedMode', this.selectedMode);

    // Navigate directly to dashboard using router
    this.router.navigate(['/dashboard'], {
      queryParams: { mode: this.selectedMode },
    });

    // Also emit event for backward compatibility
    this.skipToDashboard.emit();
  }

  handleLogin(): void {
    // In a real app, this would authenticate with the backend first

    // Store selected mode and auth data using storage service
    this.storageService.setItem('selectedMode', this.selectedMode);
    // In a real app, you might store auth tokens
    // this.storageService.setItem('authToken', response.token);

    this.router.navigate(['/dashboard'], {
      queryParams: { mode: this.selectedMode },
    });
  }

  handleSignup(): void {
    // In a real app, this would register with the backend first

    // Store selected mode and user data using storage service
    this.storageService.setItem('selectedMode', this.selectedMode);
    // In a real app, you might store additional user data
    // this.storageService.setItem('userData', { name: this.signupName, email: this.signupEmail });

    this.router.navigate(['/mode-selection']);
  }

  handleClose(): void {
    // Navigate back to the homepage
    this.router.navigate(['/']);

    // Also emit event for backward compatibility
    this.closeModal.emit();
  }
}
