import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPage } from './start-page';

describe('StartPage', () => {
  let component: StartPage;
  let fixture: ComponentFixture<StartPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartPage],
      providers: [provideRouter([])], // für Router-Abhängigkeiten
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
     const fixture = TestBed.createComponent(StartPage);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
