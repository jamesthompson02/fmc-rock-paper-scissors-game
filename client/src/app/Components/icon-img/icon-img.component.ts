import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-img',
  standalone: true,
  imports: [],
  templateUrl: './icon-img.component.html',
  styleUrl: './icon-img.component.scss',
})
export class IconImgComponent {
  @Input() src: string = '';
  @Input() alt: string = '';
}
