import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard.component';

export const routes: Routes = [
    {path: '' , component:LandingPageComponent},
    {path: 'register' , component:RegistrationPageComponent},
    {path: 'login' , component:LoginPageComponent},
    {path: 'dashboard' , component:DoctorDashboardComponent},
];
