import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private _playerChoice$: Subject<'rock' | 'paper' | 'scissors'> = new Subject<
    'rock' | 'paper' | 'scissors'
  >();

  private _computerChoice$: Subject<'' | 'rock' | 'paper' | 'scissors'> =
    new Subject<'' | 'rock' | 'paper' | 'scissors'>();

  private _result$: Subject<'' | 'win' | 'draw' | 'loss'> = new Subject<
    '' | 'win' | 'draw' | 'loss'
  >();

  playerChoice$: Observable<'rock' | 'paper' | 'scissors'> =
    this._playerChoice$.asObservable();

  computerChoice$: Observable<'' | 'rock' | 'paper' | 'scissors'> =
    this._computerChoice$.asObservable();

  result$: Observable<'' | 'win' | 'draw' | 'loss'> =
    this._result$.asObservable();

  dispatchPlayerChoice(choice: 'rock' | 'paper' | 'scissors') {
    this._playerChoice$.next(choice);
  }

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

  evaluateResult(
    playerChoice: 'rock' | 'paper' | 'scissors',
    computerChoice: 'rock' | 'paper' | 'scissors'
  ) {
    if (playerChoice === 'rock') {
      const result = this.playerChoseRock(computerChoice);
      this.dispatchResult(result);
    }
    if (playerChoice === 'paper') {
      const result = this.playerChosePaper(computerChoice);
      this.dispatchResult(result);
    }
    if (playerChoice === 'scissors') {
      const result = this.playerChoseScissors(computerChoice);
      this.dispatchResult(result);
    }
  }

  playerChoseRock(computerChoice: 'rock' | 'paper' | 'scissors') {
    if (computerChoice === 'paper') {
      return 'loss';
    }
    if (computerChoice === 'scissors') {
      return 'win';
    }
    return 'draw';
  }

  playerChosePaper(computerChoice: 'rock' | 'paper' | 'scissors') {
    if (computerChoice === 'rock') {
      return 'win';
    }
    if (computerChoice === 'scissors') {
      return 'loss';
    }
    return 'draw';
  }

  playerChoseScissors(computerChoice: 'rock' | 'paper' | 'scissors') {
    if (computerChoice === 'rock') {
      return 'loss';
    }
    if (computerChoice === 'paper') {
      return 'win';
    }
    return 'draw';
  }
}
