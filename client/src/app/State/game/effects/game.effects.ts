import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GamePageActions } from '../actions/game.actions';
import { debounceTime, merge, switchMap, tap } from 'rxjs';
import { UIService } from '../../../Services/UI/ui.service';
import { GameService } from '../../../Services/Game/game.service';
import { LocalStorageService } from '../../../Services/LocalStorage/local-storage.service';

@Injectable()
export class GameEffects {
  private actions$ = inject(Actions);

  constructor(
    private uiService: UIService,
    private gameService: GameService,
    private localStorageService: LocalStorageService
  ) {}

  playerChoiceMade$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GamePageActions.playerChoiceMade),
        tap(({ choice }) => {
          this.gameService.dispatchPlayerChoice(choice);
          this.uiService.dispatch('result');
        }),
        debounceTime(2000),
        tap(() => this.gameService.generateComputerChoice()),
        debounceTime(750)
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
