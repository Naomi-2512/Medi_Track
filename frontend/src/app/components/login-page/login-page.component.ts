import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginForm!: FormGroup;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder) {}

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
    if (this.loginForm.valid) {
      // Handle form submission
      console.log('Form submitted:', this.loginForm.value);
      // Add your API call or other submission logic here
    }
  }

  // Placeholder for social login methods
  signInWithGoogle(): void {
    console.log('Google sign-in initiated');
    // Implement Google sign-in logic here
  }

  signInWithMicrosoft(): void {
    console.log('Microsoft sign-in initiated');
    // Implement Microsoft sign-in logic here
  }
}
