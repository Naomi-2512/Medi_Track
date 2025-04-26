import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from '../../services/notifications.service';
import { AuthService } from '../../services/auth.service';
import { NotificationsComponent } from "../notifications/notifications.component";

@Component({
  selector: 'app-login-page',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NotificationsComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginForm!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    console.log('Form submitted, valid:', this.loginForm.valid); // Debug log
    if (this.loginForm.invalid) {
      this.notificationService.showMessage('Please fill all required fields correctly.', false);
      return;
    }

    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.authService.loginDoctor(credentials).subscribe({
      next: (response) => {
        console.log('Login response:', response); // Debug log
        
        if (response.message && response.token) {
          localStorage.setItem('authToken', response.token); 
          this.notificationService.showMessage(response.message, true);
          this.loginForm.reset();
          this.router.navigate(['/doctor']);
        } else {
          this.notificationService.showMessage(response.error || 'Failed to log in.', false);
        }
      },
      error: (err) => {
        console.error('Login error:', err); // Debug log
        this.notificationService.showMessage(err.error?.error || 'Failed to log in.', false);
      }
    });
  }

  signInWithGoogle(): void {
    console.log('Google sign-in initiated');
    // Implement Google sign-in logic here
  }

  signInWithMicrosoft(): void {
    console.log('Microsoft sign-in initiated');
    // Implement Microsoft sign-in logic here
  }
}
