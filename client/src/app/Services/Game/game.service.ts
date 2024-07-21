import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private _computerChoice$: Subject<'' | 'rock' | 'paper' | 'scissors'> =
    new Subject<'' | 'rock' | 'paper' | 'scissors'>();
  private _result$: Subject<'' | 'win' | 'draw' | 'loss'> = new Subject<
    '' | 'win' | 'draw' | 'loss'
  >();

  computerChoice$: Observable<'' | 'rock' | 'paper' | 'scissors'> =
    this._computerChoice$.asObservable();
  result$: Observable<'' | 'win' | 'draw' | 'loss'> =
    this._result$.asObservable();

  dispatchComputerChoice(choice: '' | 'rock' | 'paper' | 'scissors') {
    this._computerChoice$.next(choice);
  }

  dispatchResult(result: '' | 'win' | 'draw' | 'loss') {
    this._result$.next(result);
  }

  generateComputerChoice() {
    const options: ['rock', 'paper', 'scissors'] = [
      'rock',
      'paper',
      'scissors',
    ];
    this.dispatchComputerChoice(
      options[Math.floor(Math.random() * options.length)]
    );
  }
}
