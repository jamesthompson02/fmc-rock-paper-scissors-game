import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const GamePageActions = createActionGroup({
  source: 'Game Page',
  events: {
    'Reset Score': emptyProps(),
    'Update Score': props<{ result: 'win' | 'draw' | 'loss' }>(),
    'Apply Score From LocalStorage': props<{ playerScore: number }>(),
    'Player Choice Made': props<{ choice: 'rock' | 'paper' | 'scissors' }>(),
    'Replay Game': emptyProps(),
  },
});
