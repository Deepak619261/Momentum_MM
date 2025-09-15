import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-google-callback',
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div class="text-center">
        <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
        <h2 class="text-white text-xl mb-2">Completing sign in...</h2>
        <p class="text-gray-400">Please wait while we authenticate you with Google.</p>
        
        <div *ngIf="error" class="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
          <p class="text-red-300">{{ error }}</p>
          <button 
            (click)="goToAuth()" 
            class="mt-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class GoogleCallbackComponent implements OnInit {
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private storageService: BrowserStorageService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      const state = params['state'];
      const error = params['error'];

      if (error) {
        this.error = 'Authentication was cancelled or failed.';
        return;
      }

      if (code) {
        this.handleGoogleCallback(code, state);
      } else {
        this.error = 'No authorization code received from Google.';
      }
    });
  }

  private handleGoogleCallback(code: string, state?: string) {
    this.authService.handleGoogleCallback(code, state).subscribe({
      next: (response) => {
        // Get the selected mode that was stored before redirect
        const selectedMode = this.storageService.getItem('selectedMode') || 'single';
        
        // Navigate to dashboard with the mode
        this.router.navigate(['/dashboard'], {
          queryParams: { mode: selectedMode }
        });
      },
      error: (error) => {
        console.error('Google callback error:', error);
        this.error = 'Authentication failed. Please try again.';
      }
    });
  }

  goToAuth() {
    this.router.navigate(['/auth']);
  }
}
