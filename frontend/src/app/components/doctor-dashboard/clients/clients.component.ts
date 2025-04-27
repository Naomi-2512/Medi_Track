import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Client, ClientDetails } from '../../../../interfaces/medic.interface';
import { ClientService } from '../../../services/client.service';
import { NotificationsService } from '../../../services/notifications.service';
import { NotificationsComponent } from '../../notifications/notifications.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NotificationsComponent, RouterLink],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  deletedClients: Client[] = [];
  
  showAddForm = false;
  isEditing = false;
  showingDeletedClients = false;
  searchQuery = '';
  
  showClientDetailsModal = false;
  showConfirmationModal = false;
  confirmationMessage = '';
  confirmationAction: () => void = () => {};
  
  clientForm: FormGroup;
  selectedClient: Client | null = null;
  
  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private notificationService: NotificationsService
  ) {
    this.clientForm = this.createClientForm();
  }
  
  ngOnInit(): void {
    this.fetchAllClients();
  }
  
  createClientForm(): FormGroup {
    return this.fb.group({
      clientId: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      dateOfBirth: [''],
      gender: [''],
      isWelcomed: [false]
    });
  }
  
  fetchAllClients(): void {
    this.clientService.fetchClients().subscribe({
      next: (response) => {
        if (response.clients) {
          this.clients = response.clients;
          this.filteredClients = [...this.clients];
          this.sortClientsByDate();
        } else {
          this.notificationService.showMessage(response.error || 'Failed to load clients.', false);
        }
      },
      error: (err) => {
        this.notificationService.showMessage(err.error?.error || 'Failed to load clients.', false);
      }
    });
  }
  
  fetchDeletedClients(): void {
    this.clientService.fetchDeletedClients().subscribe({
      next: (response) => {
        if (response.clients) {
          this.deletedClients = response.clients;
        } else {
          this.notificationService.showMessage(response.error || 'Failed to load deleted clients.', false);
        }
      },
      error: (err) => {
        this.notificationService.showMessage(err.error?.error || 'Failed to load deleted clients.', false);
      }
    });
  }
  
  toggleAddClientForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }
  
  resetForm(): void {
    this.clientForm.reset();
    this.isEditing = false;
    this.selectedClient = null;
  }
  
  submitClientForm(): void {
    console.log('Submit button clicked, form valid:', this.clientForm.valid, 'Form value:', this.clientForm.value);
    if (this.clientForm.invalid) {
      this.notificationService.showMessage('Please fill all required fields correctly.', false);
      return;
    }
    
    const clientData: ClientDetails = {
      firstName: this.clientForm.value.firstName,
      lastName: this.clientForm.value.lastName,
      email: this.clientForm.value.email,
      phone: this.clientForm.value.phone,
      dateOfBirth: this.clientForm.value.dateOfBirth,
      gender: this.clientForm.value.gender || undefined
    };
    
    if (this.isEditing && this.selectedClient) {
      this.clientService.updateClient(this.selectedClient.clientId, clientData).subscribe({
        next: (response) => {
          console.log('Update response:', response);
          if (response.message) {
            const index = this.clients.findIndex(c => c.clientId === this.selectedClient?.clientId);
            if (index !== -1) {
              this.clients[index] = { ...this.clients[index], ...clientData };
              this.filteredClients = [...this.clients];
              this.sortClientsByDate();
            }
            this.notificationService.showMessage(response.message, true);
            setTimeout(() => this.toggleAddClientForm(), 2000);
          } else {
            this.notificationService.showMessage(response.error || 'Failed to update client.', false);
          }
        },
        error: (err) => {
          console.error('Update error:', err);
          this.notificationService.showMessage(err.error?.error || 'Failed to update client.', false);
        }
      });
    } else {
      this.clientService.createClient(clientData).subscribe({
        next: (response) => {
          console.log('Create response:', response);
          if (response.message) {
            this.fetchAllClients();
            this.notificationService.showMessage(response.message, true);
            setTimeout(() => this.toggleAddClientForm(), 2000);
          } else {
            this.notificationService.showMessage(response.error || 'Failed to create client.', false);
          }
        },
        error: (err) => {
          console.error('Create error:', err);
          this.notificationService.showMessage(err.error?.error || 'Failed to create client.', false);
        }
      });
    }
  }
  
  editClient(client: Client): void {
    this.isEditing = true;
    this.selectedClient = client;
    this.clientForm.patchValue({
      clientId: client.clientId,
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      phone: client.phone,
      dateOfBirth: client.dateOfBirth ? new Date(client.dateOfBirth).toISOString().split('T')[0] : '',
      gender: client.gender || '',
      isWelcomed: client.isWelcomed || false
    });
    this.showAddForm = true;
    this.closeClientDetailsModal();
  }
  
  confirmDelete(client: Client): void {
    this.selectedClient = client;
    this.confirmationMessage = `Are you sure you want to delete client "${client.firstName + ' ' + client.lastName}"?`;
    this.confirmationAction = this.deleteClient.bind(this);
    this.showConfirmationModal = true;
  }
  
  deleteClient(): void {
    if (!this.selectedClient) return;
    
    this.clientService.softDeleteClient(this.selectedClient.clientId).subscribe({
      next: (response) => {
        if (response.message) {
          this.clients = this.clients.filter(c => c.clientId !== this.selectedClient?.clientId);
          this.filteredClients = [...this.clients];
          this.notificationService.showMessage(response.message, true);
          setTimeout(() => this.closeConfirmationModal(), 2000);
        } else {
          this.notificationService.showMessage(response.error || 'Failed to delete client.', false);
        }
      },
      error: (err) => {
        this.notificationService.showMessage(err.error?.error || 'Failed to delete client.', false);
      }
    });
  }
  
  restoreClient(client: Client): void {
    this.clientService.restoreDeletedClient(client.clientId).subscribe({
      next: (response) => {
        if (response.message) {
          this.deletedClients = this.deletedClients.filter(c => c.clientId !== client.clientId);
          this.notificationService.showMessage(response.message, true);
          setTimeout(() => this.fetchAllClients(), 2000);
        } else {
          this.notificationService.showMessage(response.error || 'Failed to restore client.', false);
        }
      },
      error: (err) => {
        this.notificationService.showMessage(err.error?.error || 'Failed to restore client.', false);
      }
    });
  }
  
  viewClientDetails(client: Client): void {
    this.selectedClient = client;
    this.showClientDetailsModal = true;
  }
  
  closeClientDetailsModal(): void {
    this.showClientDetailsModal = false;
  }
  
  closeConfirmationModal(): void {
    this.showConfirmationModal = false;
    this.selectedClient = null;
  }
  
  confirmAction(): void {
    if (this.confirmationAction) {
      this.confirmationAction();
    }
  }
  
  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.filteredClients = [...this.clients];
      return;
    }
    
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredClients = this.clients.filter(client => 
      client.firstName.toLowerCase().includes(query) || 
      client.lastName.toLowerCase().includes(query) || 
      client.email.toLowerCase().includes(query) || 
      client.phone.toLowerCase().includes(query)
    );
    
    if (this.filteredClients.length === 0) {
      this.searchClientsOnServer(query);
    }
  }
  
  searchClientsOnServer(query: string): void {
    this.clientService.searchClients(query).subscribe({
      next: (response) => {
        if (response.clients) {
          this.filteredClients = response.clients;
        } else {
          this.notificationService.showMessage(response.error || 'No clients found.', false);
        }
      },
      error: (err) => {
        this.notificationService.showMessage(err.error?.error || 'Failed to search clients.', false);
      }
    });
  }
  
  showDeletedClients(): void {
    this.showingDeletedClients = true;
    this.fetchDeletedClients();
  }
  
  showActiveClients(): void {
    this.showingDeletedClients = false;
  }
  
  sortClientsByDate(): void {
    this.clients.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    this.filteredClients = [...this.clients];
  }
  
  getNewClientsCount(): number {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    return this.clients.filter(client => {
      const createdDate = new Date(client.createdAt);
      return createdDate >= oneWeekAgo;
    }).length;
  }
}
