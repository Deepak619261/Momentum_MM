import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../pages/login/login.component';
import { SignupComponent } from '../pages/signup/signup.component';


@Component({
  selector: 'app-auth-modal',
  standalone: true,
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
  imports: [CommonModule, LoginComponent, SignupComponent],
})
export class AuthModalComponent {
  @Output() close = new EventEmitter<void>();
  showLogin: boolean = true;

  toggleAuthMode() {
    this.showLogin = !this.showLogin;
  }

  closeModal() {
    this.close.emit();
  }
}
