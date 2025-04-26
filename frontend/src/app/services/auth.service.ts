import { Injectable } from '@angular/core';
import { LoginDetails } from '../../interfaces/medic.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL: string = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) { }

  loginDoctor(credentials: LoginDetails): Observable<{ message?: string, token?: string,error?: string }> {
    return this.http.post<{ message?: string, token?: string,error?: string }>(`${this.API_URL}/login`, credentials);
  }
}
