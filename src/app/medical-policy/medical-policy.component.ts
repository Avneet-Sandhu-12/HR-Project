import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MedicalDetailsModalComponent } from '../medical-details-modal/medical-details-modal.component';
import { MedicalPolicyService, MedicalPolicy } from '../services/medical-policy.service';


@Component({
  selector: 'app-medical-policy',
  templateUrl: './medical-policy.component.html',
  styleUrls: ['./medical-policy.component.css'],
})
export class MedicalPolicyComponent implements OnInit {
  medicalPolicies: MedicalPolicy[] = [];

  constructor(private policyService: MedicalPolicyService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.policyService.getPolicies().subscribe((data) => {
      this.medicalPolicies = data;
    });
  }

  deletePolicy(id: number): void {
    this.policyService.deletePolicy(id).subscribe(() => {
      this.medicalPolicies = this.medicalPolicies.filter(p => p.id !== id);
    });
  }


  getTotalDependents(): number {
    return this.medicalPolicies.reduce((total, policy) => total + policy.dependents, 0);
  }
  
  openFormDialog(policy?: MedicalPolicy): void {
    const dialogRef = this.dialog.open(MedicalDetailsModalComponent, {
      width: '500px',
      data: policy ? { ...policy } : { id: '', dependents: 0, policyName: '', claimedAmount: 0, salary: 0, numberOfDependents: 0 },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (policy) {
          this.policyService.updatePolicy(policy.id!, result).subscribe(() => this.loadPolicies());
        } else {
          this.policyService.addPolicy(result).subscribe(() => this.loadPolicies());
        }
      }
    });
  }

  calculatePolicyMaxAmount(salary: number): number {
    return salary <= 500000 ? 1000000 : salary * 2.5;
  }
  
  getBalanceLeft(policy: MedicalPolicy): number {
    return this.calculatePolicyMaxAmount(policy.salary) - policy.claimedAmount;
  }
  
}
