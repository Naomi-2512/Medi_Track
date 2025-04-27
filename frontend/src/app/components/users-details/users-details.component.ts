import { Component, OnInit } from '@angular/core';
import { NotificationsComponent } from "../notifications/notifications.component";
import { Client } from '../../../interfaces/medic.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { NotificationsService } from '../../services/notifications.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-users-details',
  imports: [NotificationsComponent,CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './users-details.component.html',
  styleUrl: './users-details.component.css'
})
export class UsersDetailsComponent implements OnInit {
  clientId: string = '';
  client: Client | null = null;
  loading: boolean = true;
  error: boolean = false;
  errorMessage: string = 'Unable to load client details.';
  
  // Share modal
  showShareModal: boolean = false;
  selectedShareOption: string | null = null;
  apiEndpoint: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private notificationService: NotificationsService,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    this.apiEndpoint = this.router.url;
    this.route.params.subscribe(params => {
      if (params['clientId']) {
        console.log('Client ID:', params['clientId']);
        
        this.clientId = params['clientId'];
        this.loadClientDetails();
      } else {
        this.error = true;
        this.errorMessage = 'Client ID is missing.';
        this.loading = false;
      }
    });
  }

  loadClientDetails(): void {
    this.loading = true;
    this.error = false;
    
    this.clientService.fetchClient(this.clientId).subscribe({
      next: (response) => {
        if (response.client) {
          this.client = response.client;
          this.apiEndpoint = `${this.clientService.API_URL}/fetchOne/${this.clientId}`;
        } else {
          this.error = true;
          this.errorMessage = response.error || 'Failed to load client details.';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = true;
        this.errorMessage = err.error?.error || 'Failed to load client details.';
        this.loading = false;
      }
    });
  }

  getInitials(): string {
    if (!this.client) return '';
    
    const firstInitial = this.client.firstName ? this.client.firstName.charAt(0) : '';
    const lastInitial = this.client.lastName ? this.client.lastName.charAt(0) : '';
    
    return `${firstInitial}${lastInitial}`.toUpperCase();
  }

  editClient(): void {
    if (!this.client) return;
    
    this.router.navigate(['/clients'], { 
      state: { 
        action: 'edit', 
        client: this.client 
      } 
    });
  }

  showShareOptions(): void {
    this.showShareModal = true;
    this.selectedShareOption = null;
  }

  hideShareModal(): void {
    this.showShareModal = false;
    this.selectedShareOption = null;
  }

  shareViaEmail(): void {
    this.selectedShareOption = 'email';
    if (this.client) {
      const subject = `Client Information: ${this.client.firstName} ${this.client.lastName}`;
      const body = `Client Details:\n\nName: ${this.client.firstName} ${this.client.lastName}\nEmail: ${this.client.email}\nPhone: ${this.client.phone}`;
      
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      this.notificationService.showMessage('Email client opened.', true);
      setTimeout(() => this.hideShareModal(), 1000);
    }
  }

  shareViaAPI(): void {
    this.copyToClipboard(this.apiEndpoint);

  }

  generatePDF(): void {
    this.selectedShareOption = 'pdf';
    
    this.notificationService.showMessage('PDF generation is not implemented in this demo.', false);
  }

  copyToClipboard(text: string): void {
    this.clipboard.copy(text);
    this.notificationService.showMessage('Copied to clipboard!', true);
    alert('API endpoint copied to clipboard!');
  }

  confirmShare(): void {
    if (!this.selectedShareOption) return;
    
    switch(this.selectedShareOption) {
      case 'api':
        this.notificationService.showMessage('API endpoint details shared.', true);
        break;
      case 'pdf':
        this.notificationService.showMessage('PDF generation initiated.', true);
        break;
    }
    
    setTimeout(() => this.hideShareModal(), 1000);
  }

  // Program functionality
  enrollInProgram(): void {
    this.router.navigate(['/programs/enroll'], { 
      state: { 
        clientId: this.clientId,
        clientName: this.client ? `${this.client.firstName} ${this.client.lastName}` : ''
      } 
    });
  }

  viewProgramDetails(programId: string): void {
    this.router.navigate(['/programs', programId]);
  }

  updateEnrollmentStatus(enrollmentId: string): void {
    this.router.navigate(['/enrollments/update', enrollmentId]);
  }
}
