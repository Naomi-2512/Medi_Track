import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from '../../interfaces/medic.interface';
import { getAuthHeaders } from './client.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  API_URL: string = 'http://localhost:3000/programs';

  constructor(private http: HttpClient) { }

  createProgram(program: Partial<Program>): Observable<{ message?: string,  error?: string }> {
    return this.http.post<{ message?: string,  error?: string }>(`${this.API_URL}/create`, program, { headers: getAuthHeaders() });
  }

  updateProgram(programId: string, program: Partial<Program>): Observable<{ message?: string,  error?: string }> {
    return this.http.put<{ message?: string,  error?: string }>(`${this.API_URL}/update/${programId}`, program, { headers: getAuthHeaders() });
  }

  fetchProgram(programId: string): Observable<{ message?: string, program?: Program, error?: string }> {
    return this.http.get<{ message?: string, program?: Program, error?: string }>(`${this.API_URL}/fetchOne/${programId}`, { headers: getAuthHeaders() });
  }

  fetchPrograms(): Observable<{ message?: string, programs?: Program[] ,error?: string }> {
    return this.http.get<{ message?: string, programs?: Program[] ,error?: string }>(`${this.API_URL}/fetchAll`, { headers: getAuthHeaders() });
  }
}
