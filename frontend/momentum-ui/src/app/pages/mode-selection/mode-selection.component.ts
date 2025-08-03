import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserStorageService } from '../../services/browser-storage.service';

@Component({
  selector: 'app-mode-selection',
  standalone: true,
  templateUrl: './mode-selection.component.html',
  styleUrls: ['./mode-selection.component.scss'],
})
export class ModeSelectionComponent {
  @Output() modeSelect = new EventEmitter<'single' | 'pair' | 'group'>();

  constructor(
    private router: Router,
    private storageService: BrowserStorageService
  ) {}

  selectMode(mode: 'single' | 'pair' | 'group') {
    // Store selected mode in storage service
    this.storageService.setItem('selectedMode', mode);

    // Navigate to dashboard with selected mode as query parameter
    this.router.navigate(['/dashboard'], { queryParams: { mode } });

    // Also emit event for backward compatibility
    this.modeSelect.emit(mode);
  }

  // Navigate to home page when clicking on the logo/name
  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
