import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../../interfaces/medic.interface';
import { HttpClient } from '@angular/common/http';
import { getAuthHeaders } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  API_URL: string = 'http://localhost:3000/api/doctors';
  constructor(private http: HttpClient) { }

  createDoctor(doctor: Doctor): Observable<{ message: string, data?: { doctor: Doctor } } | { error: string }> {
    return this.http.post<{ message: string, data?: { doctor: Doctor } } | { error: string }>(`${this.API_URL}/`, doctor);
  }

  updateDoctor(doctorId: string, doctor: Partial<Doctor>): Observable<{ message: string, data?: { doctor: Doctor } } | { error: string }> {
    return this.http.put<{ message: string, data?: { doctor: Doctor } } | { error: string }>(`${this.API_URL}/${doctorId}`, doctor, { headers: getAuthHeaders() });
  }

  fetchDoctor(doctorId: string): Observable<{ message: string, data?: { doctor: Doctor } } | { error: string }> {
    return this.http.get<{ message: string, data?: { doctor: Doctor } } | { error: string }>(`${this.API_URL}/${doctorId}`, { headers: getAuthHeaders() });
  }

  fetchDoctors(): Observable<{ message: string, doctors?: Doctor[] } | { error: string }> {
    return this.http.get<{ message: string, doctors?: Doctor[] } | { error: string }>(`${this.API_URL}/`, { headers: getAuthHeaders() });
  }

  changePassword(doctorId: string, passwords: { oldPassword: string, newPassword: string }): Observable<{ message: string } | { error: string }> {
    return this.http.patch<{ message: string } | { error: string }>(`${this.API_URL}/${doctorId}/password`, passwords, { headers: getAuthHeaders() });
  }
}
