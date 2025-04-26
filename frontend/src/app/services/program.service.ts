import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from '../../interfaces/medic.interface';
import { getAuthHeaders } from './client.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  API_URL: string = 'http://localhost:3000/api/programs';

  constructor(private http: HttpClient) { }

  createProgram(program: Partial<Program>): Observable<{ message: string, data?: { program: Program } } | { error: string }> {
    return this.http.post<{ message: string, data?: { program: Program } } | { error: string }>(`${this.API_URL}/`, program, { headers: getAuthHeaders() });
  }

  updateProgram(programId: string, program: Partial<Program>): Observable<{ message: string, data?: { program: Program } } | { error: string }> {
    return this.http.put<{ message: string, data?: { program: Program } } | { error: string }>(`${this.API_URL}/${programId}`, program, { headers: getAuthHeaders() });
  }

  fetchProgram(programId: string): Observable<{ message: string, data?: { program: Program } } | { error: string }> {
    return this.http.get<{ message: string, data?: { program: Program } } | { error: string }>(`${this.API_URL}/${programId}`, { headers: getAuthHeaders() });
  }

  fetchPrograms(): Observable<{ message: string, programs?: Program[] } | { error: string }> {
    return this.http.get<{ message: string, programs?: Program[] } | { error: string }>(`${this.API_URL}/`, { headers: getAuthHeaders() });
  }
}
