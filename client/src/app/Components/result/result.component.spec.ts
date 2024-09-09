import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { MockComponents } from 'ng-mocks';

import { AppState } from '../../State/game/selectors/game.selectors';
import { TestBed } from '@angular/core/testing';
import { GameState } from '../../State/game/reducer/game.reducer';
import { ResultComponent } from './result.component';
import { HeaderComponent } from '../header/header.component';
import { GameChoiceComponent } from '../game-choice/game-choice.component';
import { ButtonComponent } from '../button/button.component';
import { mockProvider } from '@ngneat/spectator/jest';
import { GameService } from '../../Services/Game/game.service';
import { EMPTY, map, of } from 'rxjs';
import { GamePageActions } from '../../State/game/actions/game.actions';

describe('Result Component', () => {
  let spectator: Spectator<ResultComponent>;

  let headers: HeaderComponent[] | null;

  let gameChoices: GameChoiceComponent[] | null;

  let button: ButtonComponent | null;

  let store: MockStore<AppState>;

  const mockInitialGameState: GameState = {
    playerScore: 0,
  };

  const mockAppState: AppState = {
    game: mockInitialGameState,
  };

  const createResultComponent = createComponentFactory({
    component: ResultComponent,
    shallow: true,
    declarations: [
      MockComponents(HeaderComponent, GameChoiceComponent, ButtonComponent),
    ],
    providers: [
      provideMockStore({ initialState: mockAppState }),
      mockProvider(GameService, {
        computerChoice$: of('paper'),
        playerChoice$: of('scissors'),
        result$: of('win'),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createResultComponent();
    store = TestBed.inject(MockStore<AppState>);

    spectator.inject(GameService);

    jest.spyOn(store, 'dispatch');

    headers = spectator.queryAll(HeaderComponent);

    gameChoices = spectator.queryAll(GameChoiceComponent);

    button = spectator.query(ButtonComponent);
  });

  it('renders the Result component', () => {
    spectator.component.ngOnInit();
    spectator.detectChanges();
    expect(spectator).toBeTruthy();
  });

  it('renders all descendant components too', () => {
    expect(headers).toHaveLength(3);
    expect(gameChoices).toHaveLength(2);
    expect(button).toBeTruthy();
  });

  it('unsubscribes from any subscriptions when destroyed', () => {
    const unsubscribe = jest.spyOn(spectator.component.subs, 'unsubscribe');
    spectator.component.ngOnDestroy();
    spectator.detectChanges();

    expect(unsubscribe).toHaveBeenCalled();
  });

  it('should start a new game if the user clicks the play again button', () => {
    const playAgainFn = jest.spyOn(spectator.component, 'playAgain');
    button?.onClick.emit({ type: 'click' });
    spectator.detectChanges();

    expect(playAgainFn).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(GamePageActions.replayGame());
  });

  it('should update the state in the ngrx store when a result is determined', () => {
    const updateScoreFn = jest.spyOn(spectator.component, 'updateScore');

    spectator.component.ngOnInit();
    spectator.detectChanges();

    expect(updateScoreFn).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      GamePageActions.updateScore({ result: 'win' })
    );
  });
});
