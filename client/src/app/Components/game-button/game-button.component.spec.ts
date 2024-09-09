import {
  byTestId,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { GamePageActions } from '../../State/game/actions/game.actions';

import { MockComponents } from 'ng-mocks';

import { GameButtonComponent } from './game-button.component';
import { IconImgComponent } from '../icon-img/icon-img.component';
import { AppState } from '../../State/game/selectors/game.selectors';
import { TestBed } from '@angular/core/testing';
import { GameState } from '../../State/game/reducer/game.reducer';

describe('GameButton Component', () => {
  let spectator: Spectator<GameButtonComponent>;

  let store: MockStore<AppState>;

  let iconImg: IconImgComponent | null;

  const mockInitialGameState: GameState = {
    playerScore: 0,
  };

  const mockAppState: AppState = {
    game: mockInitialGameState,
  };

  const createGameButtonComponent = createComponentFactory({
    component: GameButtonComponent,
    shallow: true,
    declarations: [MockComponents(IconImgComponent)],
    providers: [provideMockStore({ initialState: mockAppState })],
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore<AppState>);
    jest.spyOn(store, 'dispatch');

    spectator = createGameButtonComponent({
      props: {
        iconImg: 'assets/iconPaper.svg',
        iconImgAlt: 'Picture of paper icon.',
        cssStyle: 'game-button-paper',
        playerChoice: 'paper',
      },
    });

    iconImg = spectator.query(IconImgComponent);
  });

  it('renders the GameButton', () => {
    expect(spectator).toBeTruthy();
  });

  it('properly renders the IconImg component inside the GameButton', () => {
    expect(iconImg).toHaveAttribute('src', 'assets/iconPaper.svg');
    expect(iconImg).toHaveAttribute('alt', 'Picture of paper icon.');
    expect(iconImg).toBeTruthy();
  });

  it('attaches the right CSS class names via the cssStyling input', () => {
    const gameButton = spectator.query(byTestId('app-game-button'));
    expect(gameButton?.classList).toContain('game-button-paper');
  });

  it('calls the gameButtonClicked method when clicked', () => {
    const gameButtonClickedFn = jest.spyOn(
      spectator.component,
      'gameButtonClicked'
    );

    spectator.click(byTestId('app-game-button'));

    expect(gameButtonClickedFn).toHaveBeenCalled();
  });

  it('dispatches the playerChoice input value with the playerChoiceMade NgRx action when clicked', () => {
    spectator.click(byTestId('app-game-button'));

    expect(store.dispatch).toHaveBeenCalledWith(
      GamePageActions.playerChoiceMade({ choice: 'paper' })
    );
  });
});
