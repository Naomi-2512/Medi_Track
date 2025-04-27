import { Component } from '@angular/core';
import { Client, Enrollment, Program } from '../../../../interfaces/medic.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProgramService } from '../../../services/program.service';
import { ClientService } from '../../../services/client.service';
import { EnrollmentService } from '../../../services/enrollment.service';
import { NotificationsService } from '../../../services/notifications.service';
import { NotificationsComponent } from "../../notifications/notifications.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-programs',
  imports: [NotificationsComponent,CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.css'
})
export class ProgramsComponent {
  programs: Program[] = [];
  filteredPrograms: Program[] = [];
  clients: Client[] = [];
  availableClients: Client[] = [];
  
  showAddForm = false;
  isEditing = false;
  searchQuery = '';
  clientSearchQuery = '';
  
  showProgramDetailsModal = false;
  showEnrollClientModal = false;
  showConfirmationModal = false;
  showClientDetailsModal = false;
  
  confirmationMessage = '';
  confirmationAction: () => void = () => {};
  
  programForm: FormGroup;
  selectedProgram: Program | null = null;
  selectedClient: Client | null = null;
  selectedEnrollment: Enrollment | null = null;
  
  constructor(
    private programService: ProgramService,
    private clientService: ClientService,
    private enrollmentService: EnrollmentService,
    private fb: FormBuilder,
    private notificationService: NotificationsService
  ) {
    this.programForm = this.createProgramForm();
  }
  
  ngOnInit(): void {
    this.fetchAllPrograms();
    this.fetchAllClients();
  }
  
  createProgramForm(): FormGroup {
    return this.fb.group({
      programId: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }
  
  fetchAllPrograms(): void {
    this.programService.fetchPrograms().subscribe({
      next: (response) => {
        if (response.programs) {
          this.programs = response.programs;
          this.filteredPrograms = [...this.programs];
          this.sortProgramsByDate();
        } else {
          this.notificationService.showMessage(response.error || 'Failed to load programs.', false);
        }
      },
      error: (err) => {
        this.notificationService.showMessage(err.error?.error || 'Failed to load programs.', false);
      }
    });
  }
  
  fetchAllClients(): void {
    this.clientService.fetchClients().subscribe({
      next: (response) => {
        if (response.clients) {
          this.clients = response.clients;
        } else {
          this.notificationService.showMessage(response.error || 'Failed to load clients.', false);
        }
      },
      error: (err) => {
        this.notificationService.showMessage(err.error?.error || 'Failed to load clients.', false);
      }
    });
  }
  
  fetchProgramDetails(programId: string): void {
    this.programService.fetchProgram(programId).subscribe({
      next: (response) => {
        if (response.data?.program) {
          // Update the selected program with full details including enrollments
          this.selectedProgram = response.data.program;
        } else {
          this.notificationService.showMessage(response.error || 'Failed to load program details.', false);
        }
      },
      error: (err) => {
        this.notificationService.showMessage(err.error?.error || 'Failed to load program details.', false);
      }
    });
  }
  
  toggleAddProgramForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }
  
  resetForm(): void {
    this.programForm.reset();
    this.isEditing = false;
    this.selectedProgram = null;
  }
  
  submitProgramForm(): void {
    if (this.programForm.invalid) {
      this.notificationService.showMessage('Please fill all required fields correctly.', false);
      return;
    }
    
    const programData = {
      name: this.programForm.value.name,
      description: this.programForm.value.description
    };
    
    if (this.isEditing && this.selectedProgram) {
      this.programService.updateProgram(this.selectedProgram.programId, programData).subscribe({
        next: (response) => {
          if (response.message) {
            const index = this.programs.findIndex(p => p.programId === this.selectedProgram?.programId);
            if (index !== -1) {
              this.programs[index] = { ...this.programs[index], ...programData };
              this.filteredPrograms = [...this.programs];
              this.sortProgramsByDate();
            }
            this.notificationService.showMessage(response.message, true);
            setTimeout(() => this.toggleAddProgramForm(), 2000);
          } else {
            this.notificationService.showMessage(response.error || 'Failed to update program.', false);
          }
        },
        error: (err) => {
          this.notificationService.showMessage(err.error?.error || 'Failed to update program.', false);
        }
      });
    } else {
      this.programService.createProgram(programData).subscribe({
        next: (response) => {
          if (response.message) {
            this.fetchAllPrograms();
            this.notificationService.showMessage(response.message, true);
            setTimeout(() => this.toggleAddProgramForm(), 2000);
          } else {
            this.notificationService.showMessage(response.error || 'Failed to create program.', false);
          }
        },
        error: (err) => {
          this.notificationService.showMessage(err.error?.error || 'Failed to create program.', false);
        }
      });
    }
  }
  
  editProgram(program: Program): void {
    this.isEditing = true;
    this.selectedProgram = program;
    this.programForm.patchValue({
      programId: program.programId,
      name: program.name,
      description: program.description
    });
    this.showAddForm = true;
  }
  
  viewProgramDetails(program: Program): void {
    this.selectedProgram = program;
    this.fetchProgramDetails(program.programId);
    this.showProgramDetailsModal = true;
  }
  
  closeProgramDetailsModal(): void {
    this.showProgramDetailsModal = false;
    this.selectedProgram = null;
  }
  
  openEnrollClientModal(program: Program): void {
    this.selectedProgram = program;
    this.filterAvailableClients();
    this.showEnrollClientModal = true;
  }
  
  closeEnrollClientModal(): void {
    this.showEnrollClientModal = false;
    this.clientSearchQuery = '';
    this.selectedProgram = null;
  }
  
  filterAvailableClients(): void {
    if (!this.selectedProgram || !this.selectedProgram.Enrollments) {
      this.availableClients = [...this.clients];
      return;
    }
    
    const enrolledClientIds = this.selectedProgram.Enrollments.map(e => e.clientId);
    
    this.availableClients = this.clients.filter(client => !enrolledClientIds.includes(client.clientId));
  }
  
  searchClients(): void {
    if (!this.clientSearchQuery.trim()) {
      this.filterAvailableClients();
      return;
    }
    
    const query = this.clientSearchQuery.toLowerCase().trim();
    this.availableClients = this.clients.filter(client => 
      !this.isClientEnrolled(client) && (
        client.firstName.toLowerCase().includes(query) || 
        client.lastName.toLowerCase().includes(query) || 
        client.email.toLowerCase().includes(query) || 
        client.phone.toLowerCase().includes(query)
      )
    );
  }
  
  isClientEnrolled(client: Client): boolean {
    if (!this.selectedProgram || !this.selectedProgram.Enrollments) return false;
    return this.selectedProgram.Enrollments.some(e => e.clientId === client.clientId);
  }
  
  enrollClient(client: Client): void {
    if (!this.selectedProgram) return;
    
    const enrollmentData = {
      clientId: client.clientId,
      programId: this.selectedProgram.programId,
      status: 'Active'
    };
    
    this.enrollmentService.createEnrollment(enrollmentData).subscribe({
      next: (response) => {
        if (response.message) {
          this.notificationService.showMessage(response.message, true);
          this.fetchProgramDetails(this.selectedProgram!.programId);
          this.closeEnrollClientModal();
        } else {
          this.notificationService.showMessage(response.error || 'Failed to enroll client.', false);
        }
      },
      error: (err) => {
        this.notificationService.showMessage(err.error?.error || 'Failed to enroll client.', false);
      }
    });
  }
  
  confirmUnenroll(enrollment: Enrollment): void {
    this.selectedEnrollment = enrollment;
    this.confirmationMessage = `Are you sure you want to remove ${enrollment.Client?.firstName} ${enrollment.Client?.lastName} from this program?`;
    this.confirmationAction = this.unenrollClient.bind(this);
    this.showConfirmationModal = true;
  }
  
  unenrollClient(): void {
    if (!this.selectedEnrollment) return;
    
    // Since there's no direct unenroll method in the service, we'll use update to set status to 'Inactive'
    this.enrollmentService.updateEnrollment(this.selectedEnrollment.enrollmentId, { status: 'Inactive' }).subscribe({
      next: (response) => {
        if (response.message) {
          this.notificationService.showMessage(response.message, true);
          if (this.selectedProgram) {
            this.fetchProgramDetails(this.selectedProgram.programId);
          }
          this.closeConfirmationModal();
        } else {
          this.notificationService.showMessage(response.error || 'Failed to remove client from program.', false);
        }
      },
      error: (err) => {
        this.notificationService.showMessage(err.error?.error || 'Failed to remove client from program.', false);
      }
    });
  }
  
  viewClientDetails(client: Client): void {
    this.selectedClient = client;
    this.showClientDetailsModal = true;
  }
  
  closeClientDetailsModal(): void {
    this.showClientDetailsModal = false;
    this.selectedClient = null;
  }
  
  closeConfirmationModal(): void {
    this.showConfirmationModal = false;
    this.selectedEnrollment = null;
  }
  
  confirmAction(): void {
    if (this.confirmationAction) {
      this.confirmationAction();
    }
  }
  
  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.filteredPrograms = [...this.programs];
      return;
    }
    
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredPrograms = this.programs.filter(program => 
      program.name.toLowerCase().includes(query) || 
      program.description.toLowerCase().includes(query)
    );
  }
  
  sortProgramsByDate(): void {
    this.programs.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    this.filteredPrograms = [...this.programs];
  }
  
  getEnrollmentCount(program: Program): number {
    return program.Enrollments?.length || 0;
  }
  
  getProgramCapacity(program: Program): number {
    if (program.name.toLowerCase().includes('hiv')) return 120;
    if (program.name.toLowerCase().includes('tb')) return 100;
    return 150; // Default capacity
  }
  
  getCapacityPercentage(program: Program): number {
    const count = this.getEnrollmentCount(program);
    const capacity = this.getProgramCapacity(program);
    return Math.min(Math.round((count / capacity) * 100), 100);
  }
}
