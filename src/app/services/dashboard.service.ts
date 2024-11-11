import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardRow } from '../models/dashboard-row';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) { }

  display(): Observable<DashboardRow[]> {
    return this.httpClient.get<DashboardRow[]>(environment.endpoints.listUsers);
  }
}
