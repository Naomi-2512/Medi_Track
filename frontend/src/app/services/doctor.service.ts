import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../../interfaces/medic.interface';
import { HttpClient } from '@angular/common/http';
import { getAuthHeaders } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  API_URL: string = 'http://localhost:3000/doctors';
  constructor(private http: HttpClient) { }

  createDoctor(doctor:Partial < Doctor>): Observable<{ message?: string, error?: string }> {
    return this.http.post<{ message?: string, error?: string }>(`${this.API_URL}/create`, doctor);
  }

  updateDoctor(doctorId: string, doctor: Partial<Doctor>): Observable<{ message?: string, error?: string }> {
    return this.http.put<{ message?: string, error?: string }>(`${this.API_URL}/update/${doctorId}`, doctor, { headers: getAuthHeaders() });
  }

  fetchDoctor(): Observable<{ message?: string,  doctor?: Doctor , error?: string }> {
    return this.http.get<{ message?: string,  doctor?: Doctor , error?: string }>(`${this.API_URL}/fetchOne`, { headers: getAuthHeaders() });
  }

  fetchDoctors(): Observable<{ message?: string, doctors?: Doctor[] ,error?: string }> {
    return this.http.get<{ message?: string, doctors?: Doctor[] ,error?: string }>(`${this.API_URL}/fetchAll`, { headers: getAuthHeaders() });
  }

  changePassword(doctorId: string, passwords: { oldPassword: string, newPassword: string }): Observable<{ message?: string ,error?: string }> {
    return this.http.patch<{ message?: string ,error?: string }>(`${this.API_URL}/changePassword/${doctorId}`, passwords, { headers: getAuthHeaders() });
  }
}
