import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { MockComponents } from 'ng-mocks';

import { IconImgComponent } from '../icon-img/icon-img.component';
import { PickAnOptionComponent } from './pick-an-option.component';
import { GameButtonComponent } from '../game-button/game-button.component';

describe('PickAnOption Component', () => {
  let spectator: Spectator<PickAnOptionComponent>;

  let iconImg: IconImgComponent | null;

  let gameButtons: GameButtonComponent[] | null;

  const createPickAnOptionComponent = createComponentFactory({
    component: PickAnOptionComponent,
    shallow: true,
    declarations: [MockComponents(IconImgComponent, GameButtonComponent)],
  });

  beforeEach(() => {
    spectator = createPickAnOptionComponent();
    iconImg = spectator.query(IconImgComponent);
    gameButtons = spectator.queryAll(GameButtonComponent);
  });

  it('renders the PickAnOption Component', () => {
    expect(spectator).toBeTruthy();
  });

  it('renders the descendant components too', () => {
    expect(iconImg).toBeTruthy();
    expect(iconImg).toHaveAttribute('src', '/bgTriangle.svg');
    expect(iconImg).toHaveAttribute(
      'alt',
      'Triangular container for rock, paper and scissors options.'
    );
    expect(gameButtons).toHaveLength(3);
  });
});
