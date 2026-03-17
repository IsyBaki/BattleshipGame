import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { GameRoom } from './game-room';

describe('GameRoom', () => {
  let component: GameRoom;
  let fixture: ComponentFixture<GameRoom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameRoom],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameRoom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  // Test cases 1: component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test cases 2: initial state of canStartGame
  it('should initialize canStartGame with false', () => {
    expect(component.canStartGame).toBeFalse();
  });

  // Test cases 3: onSecondPlayerJoined method
  it('should set canStartGame to true when second player joins', () => {
    component.onSecondPlayerJoined();

    expect(component.canStartGame).toBeTrue();
  });
});