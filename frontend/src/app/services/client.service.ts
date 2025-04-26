import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../interfaces/medic.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  API_URL: string = 'http://localhost:3000/api/clients';

  constructor(private http: HttpClient) { }

  createClient(client: Client): Observable<{ message: string, data?: { client: Client } } | { error: string }> {
    return this.http.post<{ message: string, data?: { client: Client } } | { error: string }>(`${this.API_URL}/`, client, { headers: getAuthHeaders() });
  }

  updateClient(clientId: string, client: Partial<Client>): Observable<{ message: string, data?: { client: Client } } | { error: string }> {
    return this.http.put<{ message: string, data?: { client: Client } } | { error: string }>(`${this.API_URL}/${clientId}`, client, { headers: getAuthHeaders() });
  }

  fetchClient(clientId: string): Observable<{ message: string, data?: { client: Client } } | { error: string }> {
    return this.http.get<{ message: string, data?: { client: Client } } | { error: string }>(`${this.API_URL}/${clientId}`, { headers: getAuthHeaders() });
  }

  fetchClients(): Observable<{ message: string, clients?: Client[] } | { error: string }> {
    return this.http.get<{ message: string, clients?: Client[] } | { error: string }>(`${this.API_URL}/`, { headers: getAuthHeaders() });
  }

  searchClients(query: string): Observable<{ message: string, clients?: Client[] } | { error: string }> {
    return this.http.get<{ message: string, clients?: Client[] } | { error: string }>(`${this.API_URL}/search?query=${query}`, { headers: getAuthHeaders() });
  }

  softDeleteClient(clientId: string): Observable<{ message: string } | { error: string }> {
    return this.http.delete<{ message: string } | { error: string }>(`${this.API_URL}/${clientId}`, { headers: getAuthHeaders() });
  }

  restoreDeletedClient(clientId: string): Observable<{ message: string, data?: { client: Client } } | { error: string }> {
    return this.http.patch<{ message: string, data?: { client: Client } } | { error: string }>(`${this.API_URL}/${clientId}/restore`, {}, { headers: getAuthHeaders() });
  }

  fetchDeletedClients(): Observable<{ message: string, clients?: Client[] } | { error: string }> {
    return this.http.get<{ message: string, clients?: Client[] } | { error: string }>(`${this.API_URL}/deleted`, { headers: getAuthHeaders() });
  }
}

export const getAuthHeaders = (): HttpHeaders => {
  let token = localStorage.getItem('authToken') as string;
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
}
