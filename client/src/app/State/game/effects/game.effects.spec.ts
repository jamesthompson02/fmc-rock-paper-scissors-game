import { TestBed } from '@angular/core/testing';
import { GameEffects } from './game.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Action } from '@ngrx/store';
import { GamePageActions } from '../actions/game.actions';
import { AppState, selectPlayerScore } from '../selectors/game.selectors';
import { UIService } from '../../../Services/UI/ui.service';
import { GameService } from '../../../Services/Game/game.service';
import { LocalStorageService } from '../../../Services/LocalStorage/local-storage.service';
import { mockProvider } from '@ngneat/spectator/jest';

describe('GameEffects', () => {
  let actions$: Observable<Action>;
  let effects: GameEffects;
  let store: MockStore<AppState>;
  let uiService: UIService;
  let gameService: GameService;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: { game: { playerScore: 0 } } }),
        mockProvider(GameService, {
          computerChoice$: of('paper'),
          playerChoice$: of('rock'),
        }),
      ],
    });
    effects = TestBed.inject(GameEffects);
    gameService = TestBed.inject(GameService);
    uiService = TestBed.inject(UIService);
    localStorageService = TestBed.inject(LocalStorageService);
    store = TestBed.inject(MockStore<AppState>);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should call a bunch of services when player makes a choice', () => {
    const dispatchPlayerChoiceFn = jest.spyOn(
      gameService,
      'dispatchPlayerChoice'
    );
    const dispatchFn = jest.spyOn(uiService, 'dispatch');
    const generateComputerChoiceFn = jest.spyOn(
      gameService,
      'generateComputerChoice'
    );

    actions$ = of(GamePageActions.playerChoiceMade({ choice: 'rock' }));
    effects.playerChoiceMade$.subscribe();

    expect(dispatchPlayerChoiceFn).toHaveBeenCalledWith('rock');
    expect(dispatchFn).toHaveBeenCalledWith('result');
    expect(generateComputerChoiceFn).toHaveBeenCalled();
    expect(gameService.evaluateResult).toHaveBeenCalledWith('rock', 'paper');
  });

  it('should call localStorageService to update playerScore value after a result is determined', () => {
    const setItemFn = jest.spyOn(localStorageService, 'setItem');
    const localStorageSetItemFn = jest.spyOn(Storage.prototype, 'setItem');

    actions$ = of(GamePageActions.updateScore({ result: 'win' }));
    store.overrideSelector(selectPlayerScore, 1);
    effects.updateScore$.subscribe();

    expect(setItemFn).toHaveBeenCalledWith('rockPaperScissorsScore', '1');
    expect(localStorageSetItemFn).toHaveBeenCalledWith(
      'rockPaperScissorsScore',
      '1'
    );
  });

  it('should restore all relevant states (except playerScore) back to initialstate when player replays game ', () => {
    const uiServiceDispatchFn = jest.spyOn(uiService, 'dispatch');
    const dispatchPlayerChoiceFn = jest.spyOn(
      gameService,
      'dispatchPlayerChoice'
    );
    const dispatchComputerChoiceFn = jest.spyOn(
      gameService,
      'dispatchComputerChoice'
    );
    const dispatchResultFn = jest.spyOn(gameService, 'dispatchResult');

    actions$ = of(GamePageActions.replayGame());
    effects.replayGame$.subscribe();

    expect(uiServiceDispatchFn).toHaveBeenCalledWith('pickAnOption');
    expect(dispatchPlayerChoiceFn).toHaveBeenCalledWith('');
    expect(dispatchComputerChoiceFn).toHaveBeenCalledWith('');
    expect(dispatchResultFn).toHaveBeenCalledWith('');
  });

  it('should set the playerScore in localStorage to 0 when the user clicks to reset score', () => {
    const localStorageServiceSetItemFn = jest.spyOn(
      localStorageService,
      'setItem'
    );
    const localStorageSetItemFn = jest.spyOn(Storage.prototype, 'setItem');

    actions$ = of(GamePageActions.resetScore());
    effects.resetPlayerScore$.subscribe();

    expect(localStorageServiceSetItemFn).toHaveBeenCalledWith(
      'rockPaperScissorsScore',
      '0'
    );
    expect(localStorageSetItemFn).toHaveBeenCalledWith(
      'rockPaperScissorsScore',
      '0'
    );
  });
});
