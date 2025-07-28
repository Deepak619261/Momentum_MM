import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [FormsModule], 
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form = {
    email: '',
    password: '',
  };

  constructor(private auth: AuthService) {}

  onLogin() {
    this.auth.login(this.form).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        alert('Login Successful!');
      },
      error: (err) => {
        console.error('Login error', err);
        alert('Login failed');
      },
    });
  }
}
