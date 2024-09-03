import { Component } from '@angular/core';
import { IconImgComponent } from '../icon-img/icon-img.component';
import { GameButtonComponent } from '../game-button/game-button.component';

@Component({
  selector: 'app-pick-an-option',
  standalone: true,
  imports: [IconImgComponent, GameButtonComponent],
  templateUrl: './pick-an-option.component.html',
  styleUrl: './pick-an-option.component.scss',
})
export class PickAnOptionComponent {
  rockIconCssStyle = 'game-button-rock';
  paperIconCssStyle = 'game-button-paper';
  scissorsIconCssStyle = 'game-button-scissors';
}
