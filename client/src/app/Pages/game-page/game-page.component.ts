import { Component } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
})
export class GamePageComponent {}
