import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginComponent } from './login-component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    const existingContainer = document.getElementById('container');
    if (existingContainer) {
      existingContainer.remove();
    }
  });


  //=============================Test Cases==========================
  // Test case 1: Component Creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test case 2: Initial Form Values
  it('should initialize form fields with default values', () => {
    expect(component.email).toBe('');
    expect(component.password).toBe('');
    expect(component.loginError).toBeNull();
  });

  // Test case 3: Sign In Navigation
  it('should navigate to /profile on sign in', () => {
    component.onSignIn();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/profile']);
  });

  // Test case 4: Sign Up Navigation
  it('should not throw when container does not exist in switchToSignUp', () => {
    expect(() => component.switchToSignUp()).not.toThrow();
  });

  // Test case 5: Sign In Navigation
  it('should not throw when container does not exist in switchToSignIn', () => {
    expect(() => component.switchToSignIn()).not.toThrow();
  });


// =========== Die anderen test cases können hier hinzugefügt werden======

});