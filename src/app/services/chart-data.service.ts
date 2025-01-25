import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  private apiUrl = 'http://localhost:3000/employees';

 constructor(private http: HttpClient) {}

 getEmployeeData(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl);
}
}
