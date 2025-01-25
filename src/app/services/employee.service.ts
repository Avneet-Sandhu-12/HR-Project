import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../add-employee/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeeListSubject = new BehaviorSubject<Employee[]>([]);
  employees$: Observable<Employee[]> = this.employeeListSubject.asObservable();

  constructor() {
  
    this.employeeListSubject.next([
      { id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', age: 30, contactNumber: '1234567890', dob: '1992-05-15', profession: 'Engineer' }
    ]);
  }

  addEmployee(employee: Employee): void {
    const currentEmployees = this.employeeListSubject.getValue();
    this.employeeListSubject.next([...currentEmployees, { ...employee, id: this.generateId() }]);
  }

  updateEmployee(updatedEmployee: Employee): void {
    const currentEmployees = this.employeeListSubject.getValue().map(emp =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
    this.employeeListSubject.next(currentEmployees);
  }

  deleteEmployee(id: string): void {
    const filteredEmployees = this.employeeListSubject.getValue().filter(emp => emp.id !== id);
    this.employeeListSubject.next(filteredEmployees);
  }

  getEmployeeById(id: string): Employee | undefined {
    return this.employeeListSubject.getValue().find(emp => emp.id === id);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
  public getGeneratedId(): string {
    return this.generateId();
  }
}
