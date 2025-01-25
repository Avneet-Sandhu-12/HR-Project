import { Component, Inject, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-medical-details-modal',
  templateUrl: './medical-details-modal.component.html',
  styleUrls: ['./medical-details-modal.component.css']
})
export class MedicalDetailsModalComponent {
 policyForm: FormGroup;

 constructor(
  private fb: FormBuilder,
  public dialogRef: MatDialogRef<MedicalDetailsModalComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
 ) {
  this.policyForm = this.fb.group({
    id: [data.id,[Validators.required]],
    dependents: [data.dependents, [Validators.required, Validators.min(0)]],
    policyName: [data.policyName, Validators.required],
    claimedAmount: [data.claimedAmount, [Validators.required, Validators.min(0)]],
    salary: [data.salary, [Validators.required, Validators.min(0)]]
  });
 }
 calculatePolicyMaxAmount(): number {
  return this.policyForm.value.salary <= 500000 ? 1000000 : this.policyForm.value.salary * 2.5;
 }

 save(): void {
  if(this.policyForm.valid) {
    const policyMaxAmount = this.calculatePolicyMaxAmount();
    this.dialogRef.close({...this.policyForm.value, policyMaxAmount });
  }
 }
 
 close(): void {
  this.dialogRef.close();
 }
}
