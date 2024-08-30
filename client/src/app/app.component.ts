import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GamePageComponent } from './Pages/game-page/game-page.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GamePageComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
