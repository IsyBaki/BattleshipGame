import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreBoard } from './score-board';

describe('ScoreBoard', () => {
  let component: ScoreBoard;
  let fixture: ComponentFixture<ScoreBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test casse 1: Component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test case 2: Stats Object
  it('should have stats object', () => {
    expect(component.stats).toBeTruthy();
    expect(component.stats.total).toBeDefined();
    expect(component.stats.wins).toBeDefined();
    expect(component.stats.losses).toBeDefined();
  });

  // Test case 3: Games Array
  it('should have games array', () => {
    expect(component.games).toBeTruthy();
    expect(Array.isArray(component.games)).toBeTrue();
  });

  // Test case 4: Game Entries
  it('should contain game entries with required properties', () => {
    expect(component.games.length).toBeGreaterThan(0);

    const game = component.games[0];

    expect(game.date).toBeDefined();
    expect(game.mode).toBeDefined();
    expect(game.result).toBeDefined();
    expect(game.moves).toBeDefined();
    expect(game.time).toBeDefined();
  });

  // Test case 5: Numeric Values in Stats
  it('should have numeric values in stats', () => {
    expect(typeof component.stats.total).toBe('number');
    expect(typeof component.stats.wins).toBe('number');
    expect(typeof component.stats.losses).toBe('number');
  });

  // Test case 6: Valid Game Value Types
  it('should have valid game value types', () => {
    const game = component.games[0];

    expect(typeof game.date).toBe('string');
    expect(typeof game.mode).toBe('string');
    expect(typeof game.result).toBe('string');
    expect(typeof game.moves).toBe('number');
    expect(typeof game.time).toBe('string');
  });


//============================== Die anderen test cases hier hinzufügen ==============================



});