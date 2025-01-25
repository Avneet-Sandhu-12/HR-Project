import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'signup']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with login mode enabled', () => {
    expect(component.isLoginMode).toBeTrue();
  });

  it('should toggle login mode on onSwitchMode()', () => {
    component.isLoginMode = true;
    component.onSwitchMode();
    expect(component.isLoginMode).toBeFalse();

    component.onSwitchMode();
    expect(component.isLoginMode).toBeTrue();
  });

  it('should call AuthService login method when submitting in login mode', () => {
    component.isLoginMode = true;
    component.username = 'testuser';
    component.password = 'password123';

    authServiceSpy.login.and.returnValue(of({ success: true, token: 'mock-token' }));
    component.onSubmit();
    
    expect(authServiceSpy.login).toHaveBeenCalledWith('testuser', 'password123');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call AuthService signup method when submitting in signup mode', () => {
    component.isLoginMode = false;
    component.username = 'newuser';
    component.password = 'password123';

    authServiceSpy.signup.and.returnValue(of({ success: true }));
    component.onSubmit();

    expect(authServiceSpy.signup).toHaveBeenCalledWith('newuser', 'password123');
    expect(component.isLoginMode).toBeTrue();  // It should switch to login mode after signup
  });

  it('should show error message when login fails', () => {
    component.isLoginMode = true;
    component.username = 'wronguser';
    component.password = 'wrongpass';

    authServiceSpy.login.and.returnValue(of({ success: false, message: 'Invalid credentials' }));
    component.onSubmit();

    expect(component.errorMessage).toBe('Invalid credentials');
  });

  it('should show error message when signup fails', () => {
    component.isLoginMode = false;
    component.username = 'newuser';
    component.password = 'password123';

    authServiceSpy.signup.and.returnValue(of({ success: false, message: 'Signup failed' }));
    component.onSubmit();

    expect(component.errorMessage).toBe('Signup failed');
  });

  it('should display the correct button text for login mode', () => {
    component.isLoginMode = true;
    fixture.detectChanges();
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('.app-login-button');
    expect(buttonElement.textContent?.trim()).toBe('Login');
  });

  it('should display the correct button text for signup mode', () => {
    component.isLoginMode = false;
    fixture.detectChanges();
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('.app-login-button');
    expect(buttonElement.textContent?.trim()).toBe('Signup');
  });
});
