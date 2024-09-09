import {
  byTestId,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { MockComponents } from 'ng-mocks';

import { IconImgComponent } from '../icon-img/icon-img.component';
import { AppState } from '../../State/game/selectors/game.selectors';
import { TestBed } from '@angular/core/testing';
import { GameState } from '../../State/game/reducer/game.reducer';
import { NavbarComponent } from './navbar.component';
import { ScoreComponent } from '../score/score.component';

describe('Navbar Component', () => {
  let spectator: Spectator<NavbarComponent>;

  let store: MockStore<AppState>;

  let iconImg: IconImgComponent | null;

  let score: ScoreComponent | null;

  const mockInitialGameState: GameState = {
    playerScore: 0,
  };

  const mockAppState: AppState = {
    game: mockInitialGameState,
  };

  const createNavbarComponent = createComponentFactory({
    component: NavbarComponent,
    shallow: true,
    declarations: [MockComponents(IconImgComponent, ScoreComponent)],
    providers: [provideMockStore({ initialState: mockAppState })],
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore<AppState>);
    jest.spyOn(store, 'pipe');

    spectator = createNavbarComponent();

    iconImg = spectator.query(IconImgComponent);

    score = spectator.query(ScoreComponent);
  });

  it('renders the Navbar', () => {
    expect(spectator).toBeTruthy();
  });

  it('renders both the score and iconImg components', () => {
    expect(iconImg).toBeTruthy();
    expect(iconImg).toHaveAttribute('src', '/logo.svg');
    expect(iconImg).toHaveAttribute(
      'alt',
      'Picture of Rock, Paper, Scissors logo.'
    );
    expect(score).toBeTruthy();
  });
});
