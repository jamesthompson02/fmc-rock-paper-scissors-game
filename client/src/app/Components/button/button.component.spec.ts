import {
  byTestId,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';

import { ButtonComponent } from './button.component';

describe('Button Component', () => {
  let spectator: Spectator<ButtonComponent>;

  const createButtonComponent = createComponentFactory({
    component: ButtonComponent,
  });

  beforeEach(() => {
    spectator = createButtonComponent({
      props: { text: 'Play Again', buttonCssStyling: 'play-again-button' },
    });
  });

  it('renders the Button', () => {
    expect(spectator).toBeTruthy();
  });

  it('renders the text fed to it via the text input', () => {
    const button = spectator.query(byTestId('app-button'));

    expect(button).toHaveText('Play Again');
  });

  it('gets styled with any css class names that get fed to it via the buttonCssStyling input', () => {
    const button = spectator.query(byTestId('app-button'));

    expect(button?.classList).toContain('play-again-button');
  });

  it('calls buttonClicked method when clicked', () => {
    const buttonClickFn = jest.spyOn(spectator.component, 'buttonClicked');

    spectator.click(byTestId('app-button'));

    expect(buttonClickFn).toHaveBeenCalled();
  });

  it('emits click event after being clicked', () => {
    let output: any;

    spectator.component.onClick.subscribe((value: any) => (output = value));

    spectator.click(byTestId('app-button'));

    expect(output['type']).toEqual('click');
  });
});
