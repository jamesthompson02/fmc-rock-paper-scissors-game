import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GamePageActions } from '../actions/game.actions';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs';
import { concatLatestFrom } from '@ngrx/operators';
import { UIService } from '../../../Services/UI/ui.service';
import { GameService } from '../../../Services/Game/game.service';
import { LocalStorageService } from '../../../Services/LocalStorage/local-storage.service';
import { select, Store } from '@ngrx/store';
import { AppState, selectPlayerScore } from '../selectors/game.selectors';

@Injectable()
export class GameEffects {
  private actions$ = inject(Actions);

  constructor(
    private uiService: UIService,
    private gameService: GameService,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {}

  playerChoiceMade$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GamePageActions.playerChoiceMade),
        tap(({ choice }) => {
          this.gameService.dispatchPlayerChoice(choice);
          this.uiService.dispatch('result');
        }),
        debounceTime(1000),
        tap(() => this.gameService.generateComputerChoice()),
        switchMap(() => {
          return combineLatest(
            this.gameService.playerChoice$,
            this.gameService.computerChoice$
          );
        }),
        distinctUntilChanged(
          (previousVal, currentVal) =>
            JSON.stringify(previousVal) === JSON.stringify(currentVal)
        ),
        debounceTime(750),
        tap(([playerChoice, computerChoice]) => {
          if (computerChoice && playerChoice) {
            this.gameService.evaluateResult(playerChoice, computerChoice);
          }
        })
      ),
    { dispatch: false }
  );

  updateScore$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GamePageActions.updateScore),
        concatLatestFrom(() => this.store.pipe(select(selectPlayerScore))),
        tap(([, playerScore]) =>
          this.localStorageService.setItem(
            'rockPaperScissorsScore',
            `${playerScore}`
          )
        )
      ),
    { dispatch: false }
  );

  replayGame$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GamePageActions.replayGame),
        tap(() => {
          this.uiService.dispatch('pickAnOption');
          this.gameService.dispatchPlayerChoice('');
          this.gameService.dispatchComputerChoice('');
          this.gameService.dispatchResult('');
        })
      ),
    { dispatch: false }
  );

  resetPlayerScore$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GamePageActions.resetScore),
        tap(() => {
          this.localStorageService.setItem('rockPaperScissorsScore', '0');
        })
      ),
    { dispatch: false }
  );
}
