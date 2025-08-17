import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideHttpClient,
  withInterceptors,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { routes } from './app.routes';
import { BrowserStorageService } from './services/browser-storage.service';

// Auth interceptor function
function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const storageService = inject(BrowserStorageService);
  const token = storageService.getItem<string>('authToken');

  // Only add the token to API requests
  if (token && req.url.includes('api')) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  return next(req);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
