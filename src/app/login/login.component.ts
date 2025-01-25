import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoginMode: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
  }

  onSubmit() {
    if (this.isLoginMode) {
      this.authService.login(this.username, this.password).subscribe(
        (response) => {
          if (response.success && response.token) {
            this.authService.storeToken(response.token);
            this.router.navigate(['/employee-list']);
          } else {
            this.errorMessage = response.message || 'Invalid username or password';
          }
        },
        () => {
          this.errorMessage = 'Login failed! Please try again.';
        }
      );
    } else {
      this.authService.signup(this.username, this.password).subscribe(
        (response) => {
          if (response.success) {
            alert('Signup successful! Please log in.');
            this.onSwitchMode();
          } else {
            this.errorMessage = response.message || 'Signup failed!';
          }
        },
        () => {
          this.errorMessage = 'Signup failed! Please try again.';
        }
      );
    }
  }
}
