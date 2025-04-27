import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client, ClientDetails } from '../../interfaces/medic.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  API_URL: string = 'https://medi-track-euux.onrender.com/clients';

  constructor(private http: HttpClient) { }

  createClient(client: ClientDetails): Observable<{ message?: string, error?: string}> {
    return this.http.post<{ message?: string, error?: string}>(`${this.API_URL}/create`, client, { headers: getAuthHeaders() });
  }

  updateClient(clientId: string, client: Partial<Client>): Observable<{ message?: string, error?: string}> {
    return this.http.put<{ message?: string, error?: string}>(`${this.API_URL}/update/${clientId}`, client, { headers: getAuthHeaders() });
  }

  fetchClient(clientId: string): Observable<{ message?: string, error?: string, client?: Client }> {
    return this.http.get<{ message?: string, error?: string, client: Client }>(`${this.API_URL}/fetchOne/${clientId}`, { headers: getAuthHeaders() });
  }

  fetchClients(): Observable<{ message?: string,error?: string, clients?: Client[] } > {
    return this.http.get<{ message?: string,error?: string, clients?: Client[] } >(`${this.API_URL}/fetchAll`, { headers: getAuthHeaders() });
  }

  searchClients(query: string): Observable<{ message?: string, clients?: Client[], error?: string }> {
    return this.http.get<{ message?: string, clients?: Client[], error?: string }>(`${this.API_URL}/search?query=${query}`, { headers: getAuthHeaders() });
  }

  softDeleteClient(clientId: string): Observable<{ message?: string ,error?: string }> {
    return this.http.put<{ message?: string ,error?: string }>(`${this.API_URL}/delete/${clientId}`, {}, { headers: getAuthHeaders() });
  }

  restoreDeletedClient(clientId: string): Observable<{ message?: string, error?: string }> {
    return this.http.patch<{ message?: string, error?: string }>(`${this.API_URL}/restore/${clientId}`, {}, { headers: getAuthHeaders() });
  }

  fetchDeletedClients(): Observable<{ message?: string, clients?: Client[] ,error?: string }> {
    return this.http.get<{ message?: string, clients?: Client[] ,error?: string }>(`${this.API_URL}/fetchDeleted`, { headers: getAuthHeaders() });
  }
}

export const getAuthHeaders = (): HttpHeaders => {
  let token = localStorage.getItem('authToken') as string;
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
}
