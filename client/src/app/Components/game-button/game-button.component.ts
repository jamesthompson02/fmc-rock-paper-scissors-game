import { Component, Input, output } from '@angular/core';
import { IconImgComponent } from '../icon-img/icon-img.component';
import { CommonModule } from '@angular/common';
import { UIService } from '../../Services/UI/ui.service';
import { GameService } from '../../Services/Game/game.service';
import { Store } from '@ngrx/store';
import { GamePageActions } from '../../State/game/actions/game.actions';
import { AppState } from '../../State/game/selectors/game.selectors';

@Component({
  selector: 'app-game-button',
  standalone: true,
  imports: [IconImgComponent, CommonModule],
  templateUrl: './game-button.component.html',
  styleUrl: './game-button.component.scss',
})
export class GameButtonComponent {
  @Input() iconImg: string = '';
  @Input() iconImgAlt: string = '';
  @Input() cssStyle: string = '';
  @Input() playerChoice!: 'rock' | 'paper' | 'scissors';

  constructor(private store: Store<AppState>) {}

  gameButtonClicked() {
    this.store.dispatch(
      GamePageActions.playerChoiceMade({ choice: this.playerChoice })
    );
  }

  // objectIsEmpty(obj: { [key: string]: any }) {
  //   return Object.keys(obj).length === 0;
  // }
}
