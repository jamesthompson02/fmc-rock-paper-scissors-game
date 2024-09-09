import { ScoreComponent } from './score.component';
import {
  Spectator,
  createComponentFactory,
  mockProvider,
} from '@ngneat/spectator/jest';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { GamePageActions } from '../../State/game/actions/game.actions';
import { GameState } from '../../State/game/reducer/game.reducer';
import { AppState } from '../../State/game/selectors/game.selectors';

import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from '../../Services/LocalStorage/local-storage.service';

describe('ScoreComponent', () => {
  let spectator: Spectator<ScoreComponent>;

  let store: MockStore<AppState>;

  const mockInitialGameState: GameState = {
    playerScore: 0,
  };

  const mockAppState: AppState = {
    game: mockInitialGameState,
  };

  const createScoreComponent = createComponentFactory({
    component: ScoreComponent,
    shallow: true,
    providers: [
      provideMockStore({ initialState: mockAppState }),
      mockProvider(LocalStorageService),
    ],
  });

  beforeEach(() => {
    spectator = createScoreComponent();
    store = TestBed.inject(MockStore<AppState>);
    spectator.inject(LocalStorageService).getItem.mockReturnValue('7');
    jest.spyOn(store, 'dispatch');
    jest.spyOn(store, 'pipe');
  });

  it('renders the ScoreComponent', () => {
    expect(spectator).toBeTruthy();
  });

  it('dispatches the applyScoreFromLocalStorage NgRx action when it finds a score in localStorage', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    spectator.component.ngOnInit();

    expect(dispatchSpy).toHaveBeenCalledWith(
      GamePageActions.applyScoreFromLocalStorage({ playerScore: 7 })
    );
  });
});
