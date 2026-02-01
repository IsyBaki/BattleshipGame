import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveLoadDialog } from './save-load-dialog';

describe('SaveLoadDialog', () => {
  let component: SaveLoadDialog;
  let fixture: ComponentFixture<SaveLoadDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveLoadDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveLoadDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
