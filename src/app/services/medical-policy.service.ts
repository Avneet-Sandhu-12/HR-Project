import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the medical policy interface
export interface MedicalPolicy {
  id?: number;
  dependents: number;
  policyName: string;
  salary: number;
  claimedAmount: number;
  numberOfDependents: number;
  policyMaxAmount?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MedicalPolicyService {
  private apiUrl = 'http://localhost:3000/medicalPolicies';

  constructor(private http: HttpClient) {}

  getPolicies(): Observable<MedicalPolicy[]> {
    return this.http.get<MedicalPolicy[]>(this.apiUrl);
  }

  addPolicy(policy: MedicalPolicy): Observable<MedicalPolicy> {
    return this.http.post<MedicalPolicy>(this.apiUrl, policy);
  }

  updatePolicy(id: number, policy: MedicalPolicy): Observable<MedicalPolicy> {
    return this.http.put<MedicalPolicy>(`${this.apiUrl}/${id}`, policy);
  }

  deletePolicy(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
