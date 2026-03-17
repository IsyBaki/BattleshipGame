import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsPage } from './tips-page';

describe('TipsPage', () => {
  let component: TipsPage;
  let fixture: ComponentFixture<TipsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test case 1: create the component
  it('should create', () => {
    expect(component).toBeTruthy();
  });


  
});
