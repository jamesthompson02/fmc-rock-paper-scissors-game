import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { GameService } from './game.service';

describe('GameService', () => {
  let spectator: SpectatorService<GameService>;

  let createService = createServiceFactory({
    service: GameService,
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should be created', () => {
    expect(spectator).toBeTruthy();
  });

  it('updates the playerChoice', () => {
    spectator.service.dispatchPlayerChoice('rock');

    let playerChoice: 'rock' | 'paper' | 'scissors' | '' | undefined;

    spectator.service.playerChoice$.subscribe((playerChoiceSub) => {
      playerChoice = playerChoiceSub;
    });

    expect(playerChoice).toBe('rock');
  });

  it('updates the computerChoice', () => {
    spectator.service.dispatchComputerChoice('paper');

    let computerChoice: 'rock' | 'paper' | 'scissors' | '' | undefined;

    spectator.service.computerChoice$.subscribe(
      (computerChoiceSub) => (computerChoice = computerChoiceSub)
    );

    expect(computerChoice).toBe('paper');
  });

  it('updates the result', () => {
    spectator.service.dispatchResult('win');

    let result: 'win' | 'loss' | 'draw' | '' | undefined;

    spectator.service.result$.subscribe((resultSub) => (result = resultSub));

    expect(result).toBe('win');
  });

  it('generates a valid choice for the computer to make in the game which leads to an update in the computerChoice state', () => {
    const dispatchComputerChoiceFn = jest.spyOn(
      spectator.service,
      'dispatchComputerChoice'
    );

    spectator.service.generateComputerChoice();

    let computerChoice: 'rock' | 'paper' | 'scissors' | '' | undefined;

    spectator.service.computerChoice$.subscribe(
      (computerChoiceSub) => (computerChoice = computerChoiceSub)
    );

    expect(dispatchComputerChoiceFn).toHaveBeenCalled();
    expect(computerChoice).toBeTruthy();
  });

  it('generates a result of win when player chooses rock and computer chooses scissors', () => {
    const playerChoseRockFn = jest.spyOn(spectator.service, 'playerChoseRock');
    const dispatchResultFn = jest.spyOn(spectator.service, 'dispatchResult');

    spectator.service.evaluateResult('rock', 'scissors');

    let result: 'win' | 'loss' | 'draw' | '' | undefined;

    spectator.service.result$.subscribe((resultSub) => (result = resultSub));

    expect(playerChoseRockFn).toHaveBeenCalledWith('scissors');
    expect(dispatchResultFn).toHaveBeenCalledWith('win');
    expect(result).toBe('win');
  });

  it('generates a result of loss when player chooses paper and computer chooses scissors', () => {
    const playerChosePaperFn = jest.spyOn(
      spectator.service,
      'playerChosePaper'
    );
    const dispatchResultFn = jest.spyOn(spectator.service, 'dispatchResult');

    spectator.service.evaluateResult('paper', 'scissors');

    let result: 'win' | 'loss' | 'draw' | '' | undefined;

    spectator.service.result$.subscribe((resultSub) => (result = resultSub));

    expect(playerChosePaperFn).toHaveBeenCalledWith('scissors');
    expect(dispatchResultFn).toHaveBeenCalledWith('loss');
    expect(result).toBe('loss');
  });

  it('generates a result of draw when player chooses paper and computer chooses scissors', () => {
    const playerChoseScissorsFn = jest.spyOn(
      spectator.service,
      'playerChoseScissors'
    );
    const dispatchResultFn = jest.spyOn(spectator.service, 'dispatchResult');

    spectator.service.evaluateResult('scissors', 'scissors');

    let result: 'win' | 'loss' | 'draw' | '' | undefined;

    spectator.service.result$.subscribe((resultSub) => (result = resultSub));

    expect(playerChoseScissorsFn).toHaveBeenCalledWith('scissors');
    expect(dispatchResultFn).toHaveBeenCalledWith('draw');
    expect(result).toBe('draw');
  });
});
