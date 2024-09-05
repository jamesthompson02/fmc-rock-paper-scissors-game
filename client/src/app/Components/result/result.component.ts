import { Component, OnDestroy } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { GameChoiceComponent } from '../game-choice/game-choice.component';
import { Subscription } from 'rxjs';
import { GameService } from '../../Services/Game/game.service';
import { ButtonComponent } from '../button/button.component';
import { Store } from '@ngrx/store';
import { GamePageActions } from '../../State/game/actions/game.actions';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [HeaderComponent, GameChoiceComponent, ButtonComponent],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent implements OnDestroy {
  subs!: Subscription;
  playerChoice!: '' | 'rock' | 'paper' | 'scissors';
  computerChoice!: '' | 'rock' | 'paper' | 'scissors';
  result!: '' | 'win' | 'draw' | 'loss';

  constructor(private gameService: GameService, private store: Store) {
    this.subs = this.gameService.playerChoice$.subscribe(
      (playerChoice) => (this.playerChoice = playerChoice)
    );
    this.subs.add(
      this.gameService.computerChoice$.subscribe(
        (computerChoice) => (this.computerChoice = computerChoice)
      )
    );
    this.subs.add(
      this.gameService.result$.subscribe((result) => {
        this.result = result;
        this.updateScore(result);
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  playAgain() {
    this.store.dispatch(GamePageActions.replayGame());
  }

  updateScore(result: '' | 'win' | 'draw' | 'loss') {
    if (!result) return;
    this.store.dispatch(GamePageActions.updateScore({ result }));
  }
}
