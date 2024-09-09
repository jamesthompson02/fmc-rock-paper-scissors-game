import {
  byTestId,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';

import { HeaderComponent } from './header.component';
describe('Header Component', () => {
  let spectator: Spectator<HeaderComponent>;

  const createHeaderComponent = createComponentFactory({
    component: HeaderComponent,
  });

  beforeEach(() => {
    spectator = createHeaderComponent({
      props: { text: 'Example text', size: 3, cssStyling: '' },
    });
  });

  it('renders the Header component', () => {
    expect(spectator).toBeTruthy();
  });

  it('renders the text fed to it via the text input', () => {
    const header = spectator.query(byTestId('app-header'));

    expect(header).toHaveText('Example text');
  });

  it('applies the header CSS class when cssStyling input is falsy', () => {
    const header = spectator.query(byTestId('app-header'));

    expect(header?.classList).toContain('header');
  });

  it('correctly renders the correct header html element based on the size input that is specified', () => {
    const header = spectator.query('h3');

    expect(header).toBeTruthy();
  });
});
