import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from '../../interfaces/medic.interface';
import { getAuthHeaders } from './client.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  API_URL: string = 'https://medi-track-euux.onrender.com/enrollments';
  constructor(private http: HttpClient) { }

  createEnrollment(enrollment: Partial<Enrollment>): Observable<{ message?: string, error?: string }> {
    return this.http.post<{ message?: string, error?: string }>(`${this.API_URL}/create`, enrollment, { headers: getAuthHeaders() });
  }

  updateEnrollment(enrollmentId: string, enrollment: Partial<Enrollment>): Observable<{ message?: string, error?: string }> {
    return this.http.put<{ message?: string, error?: string }>(`${this.API_URL}/update/${enrollmentId}`, enrollment, { headers: getAuthHeaders() });
  }

  fetchEnrollment(enrollmentId: string): Observable<{ message?: string, data?: { enrollment: Enrollment },error?: string }> {
    return this.http.get<{ message?: string, data?: { enrollment: Enrollment },error?: string }>(`${this.API_URL}/fetchOne/${enrollmentId}`, { headers: getAuthHeaders() });
  }

  fetchEnrollments(): Observable<{ message?: string, enrollments?: Enrollment[],error?: string }> {
    return this.http.get<{ message?: string, enrollments?: Enrollment[],error?: string }>(`${this.API_URL}/fetchAll`, { headers: getAuthHeaders() });
  }
}
