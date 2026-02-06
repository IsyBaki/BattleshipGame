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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
