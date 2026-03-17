import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HotSeatModule } from './hot-seat-module';

describe('HotSeatModule', () => {
  let component: HotSeatModule;
  let fixture: ComponentFixture<HotSeatModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotSeatModule],
      providers: [provideRouter([])], // für ActivatedRoute
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotSeatModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test case 1: creation of the component
  it('should create', () => {
    expect(component).toBeTruthy();
  });

// Test case 2: check if the component initializes correctly
  it('should initialize correctly', () => {
    expect(component).toBeDefined();
  });





});
