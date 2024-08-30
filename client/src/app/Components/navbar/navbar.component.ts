import { Component } from '@angular/core';
import { IconImgComponent } from '../icon-img/icon-img.component';
import { ScoreComponent } from '../score/score.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [IconImgComponent, ScoreComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {}
