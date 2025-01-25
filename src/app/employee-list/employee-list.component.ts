import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../add-employee/employee.model';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {


  showForm: boolean = false;
  selectedEmployee: any = null;
  employees: any[]= [];
  paginatedEmployees: any[] = [];
  currentPage = 0;
  pageSize = 10;

  constructor(private apiService: ApiService, private employeeService: EmployeeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchEmployees();
    this.employeeService.employees$.subscribe(data => {
      this.employees = data;
    });
  }

  fetchEmployees(): void {
    this.apiService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.paginate({ pageIndex: 0, pageSize: this.pageSize });
        console.log('Employees:', this.employees);
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
      }
    });
  }
  
  paginate(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedEmployees = this.employees.slice(startIndex, endIndex);
  }

  // form 
  onCloseForm() {
    this.showForm = false;
    this.selectedEmployee = null;
  }
  openForm(employee: any = null) {
    this.selectedEmployee = employee;
    this.showForm = true;
  }
  onSaveEmployee(employee: any) {
    if (this.selectedEmployee) {
      const index = this.employees.findIndex(e => e.id === this.selectedEmployee.id);
      this.employees[index] = { ...employee, id: this.selectedEmployee.id };
    } else {
      this.employees.push({ ...employee, id: Date.now() });
    }
  }





}

