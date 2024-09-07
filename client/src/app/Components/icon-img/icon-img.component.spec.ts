import {
  byTestId,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import { IconImgComponent } from './icon-img.component';

describe('IconImg Component', () => {
  let spectator: Spectator<IconImgComponent>;

  const createIconImgComponent = createComponentFactory({
    component: IconImgComponent,
  });

  beforeEach(() => {
    spectator = createIconImgComponent({
      props: { src: 'assets/iconRock.svg', alt: 'Picture of a rock icon.' },
    });
  });

  it('renders the image and all of its attributes correctly', () => {
    expect(spectator).toBeTruthy();

    const img = spectator.query(byTestId('iconImgComponent'));

    expect(img).toHaveAttribute('src', 'assets/iconRock.svg');
    expect(img).toHaveAttribute('alt', 'Picture of a rock icon.');
  });
});
