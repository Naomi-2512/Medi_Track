import { Component } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, Subject, takeUntil } from 'rxjs';
import { Client, Enrollment, Program } from '../../../../interfaces/medic.interface';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../services/client.service';
import { ProgramService } from '../../../services/program.service';
import { NotificationsService } from '../../../services/notifications.service';
import { EnrollmentService } from '../../../services/enrollment.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  totalClients: number = 0;
  newClients: number = 0;
  activePrograms: number = 0;
  newPrograms: number = 0;
  todayEnrollments: number = 0;
  newEnrollments: number = 0;

  activePrograms$: Observable<Program[]> = of([]);
  
  recentClients: Client[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private clientService: ClientService,
    private programService: ProgramService,
    private enrollmentService: EnrollmentService,
    private notificationService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchDashboardData(): void {
    forkJoin({
      clients: this.clientService.fetchClients().pipe(
        map(response => response.clients || []),
        catchError(error => {
          this.notificationService.showMessage('Failed to fetch clients: ' + (error.error?.error || error.message || 'Unknown error'), false);
          return of([]);
        })
      ),
      programs: this.programService.fetchPrograms().pipe(
        map(response => response.programs || []),
        catchError(error => {
          this.notificationService.showMessage('Failed to fetch programs: ' + (error.error?.error || error.message || 'Unknown error'), false);
          return of([]);
        })
      ),
      enrollments: this.enrollmentService.fetchEnrollments().pipe(
        map(response => response.enrollments || []),
        catchError(error => {
          this.notificationService.showMessage('Failed to fetch enrollments: ' + (error.error?.error || error.message || 'Unknown error'), false);
          return of([]);
        })
      )
    }).pipe(
      takeUntil(this.destroy$)
    ).subscribe(({ clients, programs, enrollments }) => {
      this.totalClients = clients.length;
      this.activePrograms = programs.length;

      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      this.newClients = clients.filter(client => 
        new Date(client.createdAt) > oneWeekAgo
      ).length;
      this.recentClients = [...clients]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

      const oneMonthAgo = new Date();
      oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
      
      this.newPrograms = programs.filter(program => 
        new Date(program.createdAt) > oneMonthAgo
      ).length;

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      this.todayEnrollments = enrollments.filter(enrollment => {
        const enrollmentDate = new Date(enrollment.enrollmentDate);
        enrollmentDate.setHours(0, 0, 0, 0);
        return enrollmentDate.getTime() === today.getTime();
      }).length;

      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const yesterdayEnrollments = enrollments.filter(enrollment => {
        const enrollmentDate = new Date(enrollment.enrollmentDate);
        enrollmentDate.setHours(0, 0, 0, 0);
        return enrollmentDate.getTime() === yesterday.getTime();
      }).length;
      
      this.newEnrollments = this.todayEnrollments - yesterdayEnrollments;

      if (programs.length > 0 && enrollments.length > 0) {
        const programsWithEnrollments = programs.map(program => {
          const programEnrollments = enrollments.filter(
            enrollment => enrollment.programId === program.programId
          );
          
          return {
            ...program,
            Enrollments: programEnrollments
          };
        });
        
        this.activePrograms$ = of(programsWithEnrollments);
      } else {
        this.activePrograms$ = of(programs);
      }
    });
  }
}

