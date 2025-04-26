import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../services/doctor.service';
import { NotificationsService } from '../../services/notifications.service';
import { Router } from '@angular/router';
import { Doctor } from '../../../interfaces/medic.interface';
import { NotificationsComponent } from "../notifications/notifications.component";

@Component({
  selector: 'app-registration-page',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NotificationsComponent],
  templateUrl: './registration-page.component.html', 
  styleUrl: './registration-page.component.css'
})
export class RegistrationPageComponent implements OnInit {
  registerForm!: FormGroup;
  showPassword: boolean = false;
  passwordStrength: number = 0;
  passwordStrengthText: string = '';

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private notificationService: NotificationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      terms: [false, Validators.requiredTrue]
    });

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
    console.log('Form submitted, valid:', this.registerForm.valid); // Debug log
    if (this.registerForm.invalid) {
      this.notificationService.showMessage('Please fill all required fields correctly.', false);
      return;
    }

    const doctorData: Partial<Doctor> = { 
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.doctorService.createDoctor(doctorData).subscribe({
      next: (response) => {
        console.log('API response:', response); // Debug log
        if (response.message) {
          this.notificationService.showMessage(response.message, true);
          this.registerForm.reset();
          this.router.navigate(['/login']);
        } else {
          this.notificationService.showMessage(response.error || 'Failed to register doctor.', false);
        }
      },
      error: (err) => {
        console.error('Registration error:', err); // Debug log
        this.notificationService.showMessage(err.error?.error || 'Failed to register doctor.', false);
      }
    });
  }
}
