import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard.component';
import { DashboardComponent } from './components/doctor-dashboard/dashboard/dashboard.component';
import { ProgramsComponent } from './components/doctor-dashboard/programs/programs.component';
import { ClientsComponent } from './components/doctor-dashboard/clients/clients.component';
import { ApiComponent } from './components/doctor-dashboard/api/api.component';
import { ProfileComponent } from './components/doctor-dashboard/profile/profile.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { LogoutComponent } from './components/doctor-dashboard/logout/logout.component';
import { UsersDetailsComponent } from './components/users-details/users-details.component';

export const routes: Routes = [
    {path: '' , component:LandingPageComponent},
    {path: 'register' , component:RegistrationPageComponent},
    {path: 'login' , component:LoginPageComponent},
    {path: 'notifications' , component:NotificationsComponent},
    {path: 'logout' , component:LogoutComponent},
    {path: 'userDetails/:clientId' , component:UsersDetailsComponent},
    {path: 'doctor' , component:DoctorDashboardComponent, children: [
        {path: 'dashboard', component: DashboardComponent},
        {path: 'programs', component: ProgramsComponent},
        {path: 'clients', component: ClientsComponent},
        {path: 'api', component: ApiComponent},
        {path: 'profile', component: ProfileComponent},
        {path: '', redirectTo: 'programs',pathMatch: 'full'}
    ]},
];
