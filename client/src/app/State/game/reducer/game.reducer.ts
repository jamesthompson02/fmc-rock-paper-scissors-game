import { createReducer, on } from '@ngrx/store';
import { GamePageActions } from '../actions/game.actions';

export interface GameState {
  playerScore: number;
}

export const initialGameState: GameState = {
  playerScore: 0,
};

export const gameReducer = createReducer(
  initialGameState,
  on(GamePageActions.resetScore, (state) => {
    return { ...state, playerScore: 0 };
  }),
  on(GamePageActions.updateScore, (state, { result }) => {
    if (result === 'win') {
      return { ...state, playerScore: state.playerScore + 1 };
    }
    if (result === 'loss') {
      return { ...state, playerScore: state.playerScore - 1 };
    }
    if (result === 'draw') {
      return { ...state };
    }
    return { ...state };
  }),
  on(GamePageActions.applyScoreFromLocalStorage, (state, { playerScore }) => {
    return { ...state, playerScore };
  })
);
