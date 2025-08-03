import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ModeSelectionComponent } from './pages/mode-selection/mode-selection.component';
import { CodingSectionComponent } from './pages/coding-section/coding-section.component';
import { AboutComponent } from './pages/about/about.component';
// Use the one dashboard component from Components directory
import { AuthPageComponent } from './Components/auth/auth-page.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'auth', component: AuthPageComponent },
  { path: 'mode-selection', component: ModeSelectionComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'coding', component: CodingSectionComponent },
  { path: '**', redirectTo: '' },
];
