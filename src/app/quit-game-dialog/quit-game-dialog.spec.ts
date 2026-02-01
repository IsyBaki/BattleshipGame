import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitGameDialog } from './quit-game-dialog';

describe('QuitGameDialog', () => {
  let component: QuitGameDialog;
  let fixture: ComponentFixture<QuitGameDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuitGameDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuitGameDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
