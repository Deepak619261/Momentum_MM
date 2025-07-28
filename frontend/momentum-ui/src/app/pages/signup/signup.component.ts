import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  standalone: true, 
  imports: [FormsModule], 
})
export class SignupComponent {
  form = {
    fullName: '',
    email: '',
    password: '',
  };

  constructor(private auth: AuthService) {}

  onSubmit() {
    this.auth.signup(this.form).subscribe({
      next: (res) => {
        console.log('Signup success', res);
        alert('Signup Successful!');
      },
      error: (err) => {
        console.error('Signup error', err);
        alert('Signup failed');
      },
    });
  }
}
