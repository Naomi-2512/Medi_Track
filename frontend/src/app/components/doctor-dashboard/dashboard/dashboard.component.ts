import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client, Enrollment, Program } from '../../../../interfaces/medic.interface';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  totalClients: number = 248;
  newClients: number = 12;
  activePrograms: number = 6;
  newPrograms: number = 1;
  todayEnrollments: number = 8;
  newEnrollments: number = 3;

  // Observable for programs - would normally come from a service
  activePrograms$: Observable<Program[]> = of([]);
  
  // Recent clients - would normally come from a service
  recentClients: Client[] = [];

  constructor() { }

  ngOnInit(): void {
    // In a real app, these would be fetched from services
    this.fetchDashboardData();
  }

  fetchDashboardData(): void {
    // Mock data for demonstration purposes
    // In a real application, you would inject services and call APIs
    
    // Create sample programs first to reference them in enrollments
    const tbProgram: Program = {
      programId: '1',
      name: 'TB Prevention',
      description: 'Tuberculosis prevention program',
      createdAt: new Date('2024-03-01'),
      Enrollments: []
    };
    
    const hivProgram: Program = {
      programId: '2',
      name: 'HIV Support',
      description: 'HIV support and treatment program',
      createdAt: new Date('2024-03-05'),
      Enrollments: []
    };
    
    const malariaProgram: Program = {
      programId: '3',
      name: 'Malaria Prevention',
      description: 'Malaria prevention and awareness',
      createdAt: new Date('2024-03-10'),
      Enrollments: []
    };

    // Create sample clients with complete data
    const johnDoe: Client = {
      clientId: '1',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('1985-05-15'),
      gender: 'Male',
      phone: '+1234567890',
      email: 'john.doe@example.com',
      isDeleted: false,
      isWelcomed: true,
      createdAt: new Date('2024-04-10'),
      Enrollments: []
    };
    
    const janeSmith: Client = {
      clientId: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      dateOfBirth: new Date('1990-10-20'),
      gender: 'Female',
      phone: '+9876543210',
      email: 'jane.smith@example.com',
      isDeleted: false,
      isWelcomed: true,
      createdAt: new Date('2024-04-15'),
      Enrollments: []
    };

    // Create enrollments with references to both client and program
    const enrollment1: Enrollment = {
      enrollmentId: '101',
      clientId: '1',
      programId: '1',
      enrollmentDate: new Date('2024-04-10'),
      status: 'Active',
      createdAt: new Date('2024-04-10'),
      Client: johnDoe,
      Program: tbProgram
    };
    
    const enrollment2: Enrollment = {
      enrollmentId: '102',
      clientId: '1',
      programId: '2',
      enrollmentDate: new Date('2024-04-12'),
      status: 'Active',
      createdAt: new Date('2024-04-12'),
      Client: johnDoe,
      Program: hivProgram
    };
    
    const enrollment3: Enrollment = {
      enrollmentId: '103',
      clientId: '2',
      programId: '3',
      enrollmentDate: new Date('2024-04-15'),
      status: 'Active',
      createdAt: new Date('2024-04-15'),
      Client: janeSmith,
      Program: malariaProgram
    };

    // Connect enrollments to clients and programs
    johnDoe.Enrollments = [enrollment1, enrollment2];
    janeSmith.Enrollments = [enrollment3];
    
    tbProgram.Enrollments = [enrollment1];
    hivProgram.Enrollments = [enrollment2];
    malariaProgram.Enrollments = [enrollment3];

    // Assign to recentClients
    this.recentClients = [johnDoe, janeSmith];

    // Sample active programs with complete enrollment arrays
    const activePrograms: Program[] = [
      {
        programId: '1',
        name: 'TB Prevention',
        description: 'This program focuses on tuberculosis prevention through early screening, vaccination, and education on transmission prevention.',
        createdAt: new Date('2024-03-01'),
        Enrollments: Array(15).fill({}).map((_, i) => ({
          enrollmentId: `e${i + 1}`,
          clientId: `c${i + 1}`,
          programId: '1',
          enrollmentDate: new Date(),
          status: 'Active',
          createdAt: new Date(),
          Client: {
            clientId: `c${i + 1}`,
            firstName: `FirstName${i + 1}`,
            lastName: `LastName${i + 1}`,
            dateOfBirth: new Date(),
            gender: i % 2 === 0 ? 'Male' : 'Female',
            phone: `+${Math.floor(1000000000 + Math.random() * 9000000000)}`,
            email: `client${i + 1}@example.com`,
            isDeleted: false,
            isWelcomed: true,
            createdAt: new Date(),
            Enrollments: []
          },
          Program: tbProgram
        }))
      },
      {
        programId: '2',
        name: 'HIV Support',
        description: 'Comprehensive support program for HIV-positive individuals, including medication management, counseling, and community resources.',
        createdAt: new Date('2024-03-05'),
        Enrollments: Array(27).fill({}).map((_, i) => ({
          enrollmentId: `e${i + 100}`,
          clientId: `c${i + 100}`,
          programId: '2',
          enrollmentDate: new Date(),
          status: 'Active',
          createdAt: new Date(),
          Client: {
            clientId: `c${i + 100}`,
            firstName: `FirstName${i + 100}`,
            lastName: `LastName${i + 100}`,
            dateOfBirth: new Date(),
            gender: i % 2 === 0 ? 'Male' : 'Female',
            phone: `+${Math.floor(1000000000 + Math.random() * 9000000000)}`,
            email: `client${i + 100}@example.com`,
            isDeleted: false,
            isWelcomed: true,
            createdAt: new Date(),
            Enrollments: []
          },
          Program: hivProgram
        }))
      },
      {
        programId: '3',
        name: 'Malaria Prevention',
        description: 'Program aimed at reducing malaria cases through mosquito net distribution, medication, and education about prevention.',
        createdAt: new Date('2024-03-10'),
        Enrollments: Array(22).fill({}).map((_, i) => ({
          enrollmentId: `e${i + 200}`,
          clientId: `c${i + 200}`,
          programId: '3',
          enrollmentDate: new Date(),
          status: 'Active',
          createdAt: new Date(),
          Client: {
            clientId: `c${i + 200}`,
            firstName: `FirstName${i + 200}`,
            lastName: `LastName${i + 200}`,
            dateOfBirth: new Date(),
            gender: i % 2 === 0 ? 'Male' : 'Female',
            phone: `+${Math.floor(1000000000 + Math.random() * 9000000000)}`,
            email: `client${i + 200}@example.com`,
            isDeleted: false,
            isWelcomed: true,
            createdAt: new Date(),
            Enrollments: []
          },
          Program: malariaProgram
        }))
      },
      {
        programId: '4',
        name: 'Diabetes Management',
        description: 'Support for patients with diabetes, focusing on blood sugar monitoring, nutrition, and lifestyle modifications.',
        createdAt: new Date('2024-03-15'),
        Enrollments: Array(18).fill({}).map((_, i) => ({
          enrollmentId: `e${i + 300}`,
          clientId: `c${i + 300}`,
          programId: '4',
          enrollmentDate: new Date(),
          status: 'Active',
          createdAt: new Date(),
          Client: {
            clientId: `c${i + 300}`,
            firstName: `FirstName${i + 300}`,
            lastName: `LastName${i + 300}`,
            dateOfBirth: new Date(),
            gender: i % 2 === 0 ? 'Male' : 'Female',
            phone: `+${Math.floor(1000000000 + Math.random() * 9000000000)}`,
            email: `client${i + 300}@example.com`,
            isDeleted: false,
            isWelcomed: true,
            createdAt: new Date(),
            Enrollments: []
          },
          Program: {
            programId: '4',
            name: 'Diabetes Management',
            description: 'Support for patients with diabetes, focusing on blood sugar monitoring, nutrition, and lifestyle modifications.',
            createdAt: new Date('2024-03-15'),
            Enrollments: []
          }
        }))
      }
    ];
    
    // Fix circular references in the active programs
    activePrograms.forEach(program => {
      program.Enrollments.forEach(enrollment => {
        enrollment.Program = program;
      });
    });
    
    this.activePrograms$ = of(activePrograms);
  }
}
