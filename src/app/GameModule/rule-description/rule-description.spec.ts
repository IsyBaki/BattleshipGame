import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleDescription } from './rule-description';

describe('RuleDescription', () => {
  let component: RuleDescription;
  let fixture: ComponentFixture<RuleDescription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RuleDescription]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuleDescription);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
