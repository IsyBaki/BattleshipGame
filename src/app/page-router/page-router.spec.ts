import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRouter } from './page-router';

describe('PageRouter', () => {
  let component: PageRouter;
  let fixture: ComponentFixture<PageRouter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageRouter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageRouter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
