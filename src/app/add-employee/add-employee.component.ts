import { Component, EventEmitter, Inject, OnInit, Output,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { EmployeeService } from '../services/employee.service';
import { Employee } from './employee.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  @Output() employeeAdded = new EventEmitter<Employee>();

  employeeForm!: FormGroup;
  professions$: Observable<string[]>; 
  showAdditionalFields = false;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService,public dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public employeeData: Employee | null) {

    this.professions$ = this.getProfessions();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.employeeForm = this.fb.group({
      id: [this.employeeData?.id ||  this.employeeService.getGeneratedId(),''],
      firstName: [this.employeeData?.firstName || '', Validators.required],
      lastName: [this.employeeData?.lastName || '', Validators.required],
      email: [this.employeeData?.email || '', [Validators.required, Validators.email]],
      age: [this.employeeData?.age || '', [Validators.required, Validators.min(18)]],
      contactNumber: [this.employeeData?.contactNumber || '', Validators.required],
      profession: [this.employeeData?.profession || '', Validators.required],
      hobbies: this.fb.array((this.employeeData?.hobbies || []).map(hobby => this.fb.control(hobby))),
      additionalContacts: this.fb.array((this.employeeData?.additionalContacts || []).map(contact => this.fb.control(contact))),
      showAdditional: [false]
    });
  }

  
  get hobbiesControls() {
    return (this.employeeForm.get('hobbies') as FormArray).controls;
  }

  get additionalContactsControls() {
    return (this.employeeForm.get('additionalContacts') as FormArray).controls;
  }

  addHobby(value: string = ''): void {
    this.hobbiesControls.push(this.fb.control(value));
  }

  addContact(value: string = ''): void {
    this.additionalContactsControls.push(this.fb.control(value));
  }

  toggleAdditionalFields(event: any): void {
    this.showAdditionalFields = event.checked;
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const formValue = this.employeeForm.value;

    if (this.employeeData) {
      this.employeeService.updateEmployee(formValue);
    } else {
      this.employeeService.addEmployee(formValue);
      this.employeeAdded.emit(formValue);
    }

    this.dialogRef.close(this.employeeForm.value);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  isFieldInvalid(field: string): boolean {
    return this.employeeForm?.get(field)?.invalid && this.employeeForm?.get(field)?.touched || false;
  }
  

  getProfessions(): Observable<string[]> {
   
    return of(['Engineer', 'Doctor', 'Teacher', 'Artist', 'Lawyer']);
  }

  trackByIndex(index: number): number {
    return index;
  }
  checkFormValidity(): void {
    console.log('Form Valid:', this.employeeForm.valid);
    console.log('Form Value:', this.employeeForm.value);
    this.employeeForm.markAllAsTouched();
  }
  
}
