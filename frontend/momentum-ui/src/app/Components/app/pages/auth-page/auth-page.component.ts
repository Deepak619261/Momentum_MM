import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent {
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

  toggleTab(tab: 'login' | 'signup') {
    this.activeTab = tab;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
