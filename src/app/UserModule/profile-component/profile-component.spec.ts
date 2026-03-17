import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProfileComponent } from './profile-component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  // Test cases 1: Component Creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test cases 2: Initialization
  it('should load a profile on init', () => {
    expect(component.profile).toBeDefined();
    expect(component.profile.stats).toBeDefined();
    expect(component.loading).toBeFalse();
    expect(component.newUsername).toBe(component.profile.username);
  });

  // Test cases 3: Editing Username
  it('should call loadProfile on ngOnInit', () => {
    const loadProfileSpy = spyOn(component, 'loadProfile');

    component.ngOnInit();

    expect(loadProfileSpy).toHaveBeenCalled();
  });

  // Test cases 4: Editing Username - startEditName, cancelEditName, saveName
  it('should set editingName to true when startEditName is called', () => {
    component.editingName = false;

    component.startEditName();

    expect(component.editingName).toBeTrue();
  });

  // Test cases 5: Editing Username - cancelEditName
  it('should reset newUsername and stop editing when cancelEditName is called', () => {
    component.editingName = true;
    component.newUsername = 'andererName';

    component.cancelEditName();

    expect(component.newUsername).toBe(component.profile.username);
    expect(component.editingName).toBeFalse();
  });

  // Test cases 6: Editing Username - saveName
  it('should set an error and not save when username is too short', () => {
    const originalUsername = component.profile.username;
    component.newUsername = 'ab';
    component.editingName = true;
    component.error = null;

    component.saveName();

    expect(component.error).toBeTruthy();
    expect(component.profile.username).toBe(originalUsername);
    expect(component.editingName).toBeTrue();
  });

  // Test cases 7: Editing Username - saveName
  it('should trim and save username when username is valid', () => {
    component.newUsername = '   neuerName   ';
    component.editingName = true;
    component.error = 'some previous error';

    component.saveName();

    expect(component.profile.username).toBe('neuerName');
    expect(component.editingName).toBeFalse();
    expect(component.error).toBeNull();
  });


  // Test cases 8: Win Rate Calculation
  it('should return 0 as winRate when games is 0', () => {
    component.profile.stats.games = 0;
    component.profile.stats.wins = 0;

    expect(component.winRate).toBe(0);
  });


  // Test cases 9: Win Rate Calculation
  it('should calculate winRate correctly when games are greater than 0', () => {
    component.profile.stats.games = 8;
    component.profile.stats.wins = 3;

    expect(component.winRate).toBe(38);
  });

  // Test cases 10: Logout Functionality
  it('should navigate to /login on logout', () => {
    component.logout();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });


  
  // ========================Die anderen Test cases hier========================


});