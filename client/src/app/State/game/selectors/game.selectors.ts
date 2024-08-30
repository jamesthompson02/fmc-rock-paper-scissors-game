import { createSelector } from '@ngrx/store';
import { GameState } from '../reducer/game.reducer';

export interface AppState {
  game: GameState;
}

export const selectGame = (state: AppState) => state.game;

export const selectPlayerScore = createSelector(
  selectGame,
  (state: GameState) => state.playerScore
);
