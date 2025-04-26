export interface Program {
    programId: string;
    name: string;
    description: string;
    createdAt: Date;
    Enrollments: Enrollment[];
  }
  
  export interface Client {
    clientId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    phone: string;
    email: string;
    isDeleted: boolean;
    isWelcomed: boolean;
    createdAt: Date;
    Enrollments: Enrollment[];
  }

  export interface ClientDetails {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    phone: string;
    email: string;
  }
  export interface Enrollment {
    enrollmentId: string;
    clientId: string;
    programId: string;
    enrollmentDate: Date;
    status: string;
    createdAt: Date;
    Client: Client;
    Program: Program;
  }
  
  export interface Doctor {
    doctorId: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
  }
  
  export interface TokenDetails {
    doctorId: string;
    email: string;
  }

  export interface LoginDetails {
    email: string,
    password: string
  }