import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { GamePageActions } from '../../State/game/actions/game.actions';

import { MockComponents } from 'ng-mocks';

import { AppState } from '../../State/game/selectors/game.selectors';
import { TestBed } from '@angular/core/testing';
import { GameState } from '../../State/game/reducer/game.reducer';
import { GamePageComponent } from './game-page.component';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { PickAnOptionComponent } from '../../Components/pick-an-option/pick-an-option.component';
import { ButtonComponent } from '../../Components/button/button.component';
import { RulesModalComponent } from '../../Components/rules-modal/rules-modal.component';
import { ResultComponent } from '../../Components/result/result.component';
import { mockProvider } from '@ngneat/spectator/jest';
import { UIService } from '../../Services/UI/ui.service';
import { of } from 'rxjs';

describe('GamePage Component', () => {
  let spectator: Spectator<GamePageComponent>;

  let navbar: NavbarComponent | null;

  let pickAnOption: PickAnOptionComponent | null;

  let result: ResultComponent | null;

  let buttons: ButtonComponent[] | null;

  let rulesModal: RulesModalComponent | null;

  let store: MockStore<AppState>;

  const mockInitialGameState: GameState = {
    playerScore: 0,
  };

  const mockAppState: AppState = {
    game: mockInitialGameState,
  };

  const createGamePageComponent = createComponentFactory({
    component: GamePageComponent,
    shallow: true,
    declarations: [
      MockComponents(
        NavbarComponent,
        PickAnOptionComponent,
        ButtonComponent,
        RulesModalComponent,
        ResultComponent
      ),
    ],
    providers: [
      provideMockStore({ initialState: mockAppState }),
      mockProvider(UIService, {
        UIComponent$: of('pickAnOption'),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createGamePageComponent();

    store = TestBed.inject(MockStore<AppState>);
    jest.spyOn(store, 'dispatch');

    navbar = spectator.query(NavbarComponent);

    pickAnOption = spectator.query(PickAnOptionComponent);

    result = spectator.query(ResultComponent);

    buttons = spectator.queryAll(ButtonComponent);

    rulesModal = spectator.query(RulesModalComponent);
  });

  it('renders the GamePage', () => {
    expect(spectator).toBeTruthy();
  });

  it('renders correct descendant components too based on uiComponent$ observable', () => {
    expect(navbar).toBeTruthy();
    expect(pickAnOption).toBeTruthy();
    expect(result).toBeFalsy();
    expect(buttons).toHaveLength(2);
    expect(rulesModal).toBeTruthy();
  });

  it('resets the score when the reset score button is clicked', () => {
    let resetScoreButton;

    const resetScoreFn = jest.spyOn(spectator.component, 'resetScore');

    if (buttons) {
      resetScoreButton = buttons[0];
    } else {
      throw new Error('No button component is rendering.');
    }

    resetScoreButton?.onClick.emit({ type: 'click' });

    spectator.detectChanges();

    expect(resetScoreFn).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(GamePageActions.resetScore());
  });

  it('shows the rules modal when the rules button is clicked', () => {
    let rulesButton;

    const showModalFn = jest.spyOn(spectator.component, 'showModal');

    const dispatchModalDisplayStatusFn =
      spectator.inject(UIService).dispatchModalDisplayStatus;

    if (buttons) {
      rulesButton = buttons[1];
    } else {
      throw new Error('No button component is rendering.');
    }

    rulesButton.onClick.emit({ type: 'click' });

    spectator.detectChanges();

    expect(showModalFn).toHaveBeenCalled();
    expect(dispatchModalDisplayStatusFn).toHaveBeenCalledWith(true);
  });
});
