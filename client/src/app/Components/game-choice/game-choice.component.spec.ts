import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { MockComponents } from 'ng-mocks';

import { IconImgComponent } from '../icon-img/icon-img.component';
import { GameChoiceComponent } from './game-choice.component';

describe('GameChoice Component', () => {
  let spectator: Spectator<GameChoiceComponent>;

  let iconImg: IconImgComponent | null;

  const createGameChoiceComponent = createComponentFactory({
    component: GameChoiceComponent,
    shallow: true,
    declarations: [MockComponents(IconImgComponent)],
  });

  beforeEach(() => {
    spectator = createGameChoiceComponent({
      props: { choice: 'rock' },
    });
    iconImg = spectator.query(IconImgComponent);
  });

  it('renders the GameChoice Component', () => {
    expect(spectator).toBeTruthy();
  });

  it('correctly renders a blank placeholder component when choice input is falsy', () => {
    spectator = createGameChoiceComponent({
      props: { choice: '' },
    });

    expect(spectator.query('.game-choice-none')).toBeTruthy();
  });

  it('renders the descendant iconImg component too when choice input is truthy', () => {
    expect(iconImg).toBeTruthy();
    expect(iconImg).toHaveAttribute('src', '/iconRock.svg');
    expect(iconImg).toHaveAttribute('alt', 'Picture of rock icon.');
  });
});
