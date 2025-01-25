import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Define a proper interface for user data
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  contactNumber: string;
  dob: string;
}

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user?: User },
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    if (this.data?.user) {
      this.isEditMode = true;
      console.log('Received user data:', this.data.user);
      this.employeeForm.patchValue(this.data.user);
      this.cdr.detectChanges();  // Force change detection if needed
    }
  }

  initializeForm(): void {
    
    this.employeeForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18)]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      dob: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      console.log('Form submitted:', this.employeeForm.value);
      this.dialogRef.close(this.employeeForm.value);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
