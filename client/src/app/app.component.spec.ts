import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { MockComponents } from 'ng-mocks';

import { TestBed } from '@angular/core/testing';

import { AppState } from './State/game/selectors/game.selectors';
import { GameState } from './State/game/reducer/game.reducer';
import { GamePageComponent } from './Pages/game-page/game-page.component';
import { AppComponent } from './app.component';

describe('AppComponent Component', () => {
  let spectator: Spectator<AppComponent>;

  let gamePage: GamePageComponent | null;

  let store: MockStore<AppState>;

  const mockInitialGameState: GameState = {
    playerScore: 0,
  };

  const mockAppState: AppState = {
    game: mockInitialGameState,
  };

  const createAppComponent = createComponentFactory({
    component: AppComponent,
    shallow: true,
    declarations: [MockComponents(GamePageComponent)],
    providers: [provideMockStore({ initialState: mockAppState })],
  });

  beforeEach(() => {
    spectator = createAppComponent();

    store = TestBed.inject(MockStore<AppState>);

    gamePage = spectator.query(GamePageComponent);
  });

  it('renders the App', () => {
    expect(spectator).toBeTruthy();
  });

  it('renders the GamePageComponent too', () => {
    expect(gamePage).toBeTruthy();
  });
});
