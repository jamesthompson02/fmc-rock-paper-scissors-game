import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconImgComponent } from '../icon-img/icon-img.component';

@Component({
  selector: 'app-game-choice',
  standalone: true,
  imports: [CommonModule, IconImgComponent],
  templateUrl: './game-choice.component.html',
  styleUrl: './game-choice.component.scss',
})
export class GameChoiceComponent {
  private _choice: 'rock' | 'paper' | 'scissors' | '' = '';

  @Input()
  get choice(): 'rock' | 'paper' | 'scissors' | '' {
    return this._choice;
  }
  set choice(choice: 'rock' | 'paper' | 'scissors' | '') {
    this._choice = choice;
  }
}
