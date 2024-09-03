import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-img',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-img.component.html',
  styleUrl: './icon-img.component.scss',
})
export class IconImgComponent {
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() cssStyling: string = '';
}
