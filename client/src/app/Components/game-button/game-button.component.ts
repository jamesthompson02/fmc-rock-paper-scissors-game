import { Component, Input, output } from '@angular/core';
import { IconImgComponent } from '../icon-img/icon-img.component';
import { CommonModule } from '@angular/common';

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

  onGameButtonClicked = output<any>();

  gameButtonClicked(event: any) {
    this.onGameButtonClicked.emit(event);
  }

  objectIsEmpty(obj: { [key: string]: any }) {
    return Object.keys(obj).length === 0;
  }
}
