import {
  byTestId,
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest';

import { RulesModalComponent } from './rules-modal.component';

import { MockComponents } from 'ng-mocks';
import { HeaderComponent } from '../header/header.component';
import { IconImgComponent } from '../icon-img/icon-img.component';
import { ButtonComponent } from '../button/button.component';
import { UIService } from '../../Services/UI/ui.service';
import { of } from 'rxjs';
import { ɵresetCompiledComponents } from '@angular/core';

describe('RulesModalComponent', () => {
  let spectator: Spectator<RulesModalComponent>;

  let closeModalBtn: ButtonComponent | null;

  let iconImg: IconImgComponent | null;

  let header: HeaderComponent | null;

  const createRulesModalComponent = createComponentFactory({
    component: RulesModalComponent,
    shallow: true,
    declarations: [
      MockComponents(HeaderComponent, IconImgComponent, ButtonComponent),
    ],
    providers: [
      mockProvider(UIService, {
        showRulesModal$: of(true),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createRulesModalComponent();

    spectator.inject(UIService);

    closeModalBtn = spectator.query(ButtonComponent);

    iconImg = spectator.query(IconImgComponent);

    header = spectator.query(HeaderComponent);
  });

  it('should render properly and be visible', () => {
    expect(spectator).toBeTruthy();
    expect(spectator).toBeVisible();
  });

  it('should render descendant components ', () => {
    expect(closeModalBtn).toBeTruthy();
    expect(iconImg).toBeTruthy();
    expect(header).toBeTruthy();
  });

  it('should be hidden when the user clicks on the close icon button', () => {
    const closeModalFn = jest.spyOn(spectator.component, 'closeModal');
    const dispatchModalDisplayStatusMock =
      spectator.inject(UIService).dispatchModalDisplayStatus;

    closeModalBtn?.onClick.emit({ type: 'click' });
    spectator.detectChanges();

    expect(closeModalFn).toHaveBeenCalled();
    expect(dispatchModalDisplayStatusMock).toHaveBeenCalledWith(false);
  });
});
