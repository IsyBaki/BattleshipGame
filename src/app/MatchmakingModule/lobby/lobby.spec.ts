import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Lobby } from './lobby';

describe('Lobby', () => {
  let component: Lobby;
  let fixture: ComponentFixture<Lobby>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lobby],
      providers: [provideRouter([])], 
    }).compileComponents();

    fixture = TestBed.createComponent(Lobby);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test case 1: creation of the component
  it('should create', () => {
    expect(component).toBeTruthy();
  });

// Test case 2: initialization of the component
  it('should initialize the component', () => {
    expect(component).toBeDefined();
    
  });







});
