import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameButtonComponent } from './game-button.component';

describe('GameButtonComponent', () => {
  let component: GameButtonComponent;
  let fixture: ComponentFixture<GameButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
