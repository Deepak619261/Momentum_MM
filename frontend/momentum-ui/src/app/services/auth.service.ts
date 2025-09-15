import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BrowserStorageService } from './browser-storage.service';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

interface LoginDto {
  email: string;
  password: string;
}

interface RegisterDto {
  email: string;
  password: string;
  fullName: string;
}

interface User {
  id: number;
  email: string;
  fullName: string;
}

interface AuthResponse {
  token: string;
  user?: User;
}

interface GoogleAuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    private storageService: BrowserStorageService,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          this.storageService.setItem('authToken', response.token);
          if (response.user) {
            this.storageService.setItem('user', JSON.stringify(response.user));
          }
        })
      );
  }

  register(
    fullName: string,
    email: string,
    password: string
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/signup`, {
        fullName,
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this.storageService.setItem('authToken', response.token);
          if (response.user) {
            this.storageService.setItem('user', JSON.stringify(response.user));
          }
        })
      );
  }

  logout(): void {
    this.storageService.removeItem('authToken');
    this.storageService.removeItem('user');
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return !!this.storageService.getItem('authToken');
  }

  getToken(): string | null {
    return this.storageService.getItem('authToken');
  }

  getCurrentUser(): User | null {
    const userData = this.storageService.getItem<string>('user');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch {
        return null;
      }
    }
    return null;
  }

  // Google OAuth methods
  initiateGoogleLogin(): void {
    // Redirect to backend Google OAuth endpoint
    window.location.href = `${this.apiUrl}/google-login`;
  }

  handleGoogleCallback(code: string, state?: string): Observable<GoogleAuthResponse> {
    const params = new URLSearchParams({ code });
    if (state) params.append('state', state);
    
    return this.http
      .get<GoogleAuthResponse>(`${this.apiUrl}/google-callback?${params.toString()}`)
      .pipe(
        tap((response) => {
          this.storageService.setItem('authToken', response.token);
          this.storageService.setItem('user', JSON.stringify(response.user));
        })
      );
  }
}
