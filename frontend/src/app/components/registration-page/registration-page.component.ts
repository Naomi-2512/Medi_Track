import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.css'
})
export class RegistrationPageComponent implements OnInit {
  registerForm!: FormGroup;
  showPassword: boolean = false;
  passwordStrength: number = 0;
  passwordStrengthText: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      terms: [false, Validators.requiredTrue]
    });

    // Watch password changes for strength calculation
    this.registerForm.get('password')?.valueChanges.subscribe(value => {
      this.calculatePasswordStrength(value);
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  calculatePasswordStrength(password: string): void {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    this.passwordStrength = strength;
    
    switch (strength) {
      case 1:
        this.passwordStrengthText = 'Weak';
        break;
      case 2:
        this.passwordStrengthText = 'Fair';
        break;
      case 3:
        this.passwordStrengthText = 'Good';
        break;
      case 4:
        this.passwordStrengthText = 'Strong';
        break;
      default:
        this.passwordStrengthText = '';
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      // Handle form submission
      console.log('Form submitted:', this.registerForm.value);
      // Add your API call or other submission logic here
    }
  }
}
