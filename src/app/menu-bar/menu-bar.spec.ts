import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MenuBar } from './menu-bar';

describe('MenuBar', () => {
  let component: MenuBar;
  let fixture: ComponentFixture<MenuBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuBar],
      providers: [provideRouter([])], // für Router-Abhängigkeiten
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
