import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { GamePageActions } from '../actions/game.actions';
import { debounceTime, merge, switchMap, tap } from 'rxjs';
import { UIService } from '../../../Services/UI/ui.service';
import { GameService } from '../../../Services/Game/game.service';
import { Store } from '@ngrx/store';

@Injectable()
export class GameEffects {
  constructor(
    private actions$: Actions,
    private uiService: UIService,
    private gameService: GameService
  ) {}

  playerChoiceMade$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GamePageActions.playerChoiceMade),
      tap(({ choice }) => {
        this.gameService.dispatchPlayerChoice(choice);
        this.uiService.dispatch('result');
      }),
      debounceTime(2000),
      tap(() => this.gameService.generateComputerChoice()),
      debounceTime(750)
    )
  );
}
