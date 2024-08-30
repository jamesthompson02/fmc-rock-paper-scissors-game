import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../Services/LocalStorage/local-storage.service';
import { select, Store, StoreModule } from '@ngrx/store';
import {
  AppState,
  selectPlayerScore,
} from '../../State/game/selectors/game.selectors';
import { GamePageActions } from '../../State/game/actions/game.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss',
})
export class ScoreComponent {
  playerScore$: Observable<number>;

  constructor(
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {
    const localStorageScore: string | null = this.localStorageService.getItem(
      'rockPaperScissorsScore'
    );
    if (localStorageScore) {
      this.store.dispatch(
        GamePageActions.applyScoreFromLocalStorage({
          playerScore: +localStorageScore,
        })
      );
    }
    this.playerScore$ = this.store.pipe(select(selectPlayerScore));
  }
}
