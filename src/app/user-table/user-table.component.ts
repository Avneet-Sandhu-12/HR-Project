import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LoadingService } from '../services/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit {
  users: any[] = [];
  paginatedEmployees: any[] = [];
  searchName: string = '';
  selectedAge: string = '';
  ageOptions: number[] = [];
  error: string = '';
  sortColumn: string = '';
  sortDirection: string = 'asc';
  currentPage = 0;
  pageSize = 10;
  loading$ = this.loadingService.loading$; 

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'age', 'contactNumber', 'dob', 'actions'];

  constructor(
    private apiService: ApiService,
    public loadingService: LoadingService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadingService.show(); 
    this.apiService.getEmployees()
      .pipe(finalize(() => this.loadingService.hide()))  
      .subscribe(
        (response: any[]) => {
          this.users = response;
          this.ageOptions = [...new Set(this.users.map((user) => user.age))].sort((a, b) => a - b);
          this.updatePaginatedEmployees();
        },
        (error) => {
          this.error = error?.message ||
          this.loadingService.hide();
        }
      );
  }

  sortedFilteredUsers(): any[] {
    let filtered = this.users.filter((user) => {
      const matchesName = this.searchName
        ? user.firstName.toLowerCase().includes(this.searchName.toLowerCase()) ||
          user.lastName.toLowerCase().includes(this.searchName.toLowerCase())
        : true;

      const matchesAge = this.selectedAge ? user.age === parseInt(this.selectedAge, 10) : true;
      return matchesName && matchesAge;
    });

    if (this.sortColumn) {
      filtered = filtered.sort((a, b) => {
        const valueA = (a[this.sortColumn] || '').toString().toLowerCase();
        const valueB = (b[this.sortColumn] || '').toString().toLowerCase();

        return this.sortDirection === 'asc' ? (valueA > valueB ? 1 : -1) : (valueA < valueB ? 1 : -1);
      });
    }

    return filtered;
  }

  sortData(column: string): void {
    this.sortDirection = this.sortColumn === column ? (this.sortDirection === 'asc' ? 'desc' : 'asc') : 'asc';
    this.sortColumn = column;
    this.updatePaginatedEmployees();
  }

  paginate(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedEmployees();
  }

  updatePaginatedEmployees(): void {
    const filteredSortedUsers = this.sortedFilteredUsers();
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEmployees = filteredSortedUsers.slice(startIndex, endIndex);
  }

  editUser(user: any): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '600px',
      data: { user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.users.findIndex(u => u.id === result.id);
        if (index !== -1) {
          this.users[index] = result;
        } else {
          this.users.push(result);
        }
        this.updatePaginatedEmployees();
        this.showNotification('User updated successfully!');
      }
    });
  }

  addUser(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '600px',
      data: { user: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.users.push(result);
        this.showNotification('User added successfully');
        this.updatePaginatedEmployees();
      }
    });
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users = this.users.filter((user) => user.id !== userId);
      this.showNotification('User deleted successfully');
      this.updatePaginatedEmployees();
    }
  }

  updateUserData(updatedUser: any): void {
    const index = this.users.findIndex((user) => user.id === updatedUser.id);
    if (index > -1) {
      this.users[index] = updatedUser;
      this.updatePaginatedEmployees();
    }
  }

  resetFilters(): void {
    this.searchName = '';
    this.selectedAge = '';
    this.sortColumn = '';
    this.sortDirection = 'asc';
    this.updatePaginatedEmployees();
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000, verticalPosition: 'top' });
  }
}
