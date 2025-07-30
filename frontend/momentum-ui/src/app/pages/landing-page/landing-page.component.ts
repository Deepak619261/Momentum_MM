import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  @Output() getStarted = new EventEmitter<'single' | 'pair' | 'group'>();
  @Output() login = new EventEmitter<void>();

  handleGetStarted(mode: 'single' | 'pair' | 'group') {
    this.getStarted.emit(mode);
  }

  handleLogin() {
    this.login.emit();
  }
}
