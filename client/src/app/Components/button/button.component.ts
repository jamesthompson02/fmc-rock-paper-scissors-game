import { Component, Input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() text: string = '';

  onClick = output<any>();

  buttonClicked(event: any) {
    this.onClick.emit(event);
  }
}
