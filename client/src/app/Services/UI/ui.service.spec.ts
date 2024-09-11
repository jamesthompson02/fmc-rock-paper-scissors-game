import { TestBed } from '@angular/core/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { UIService } from './ui.service';

describe('UIService', () => {
  let spectator: SpectatorService<UIService>;

  let createService = createServiceFactory({
    service: UIService,
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should be created', () => {
    expect(spectator).toBeTruthy();
  });

  it('should successfully update the state of the uiComponent', () => {
    spectator.service.dispatch('result');

    let uiComponent: 'pickAnOption' | 'result' | undefined;

    spectator.service.UIComponent$.subscribe((val) => (uiComponent = val));

    expect(uiComponent).toBe('result');
  });

  it('should successfully update the showRulesModal property', () => {
    spectator.service.dispatchModalDisplayStatus(true);

    let modalDisplayStatus: true | false | undefined;

    spectator.service.showRulesModal$.subscribe(
      (val) => (modalDisplayStatus = val)
    );

    expect(modalDisplayStatus).toBe(true);
  });
});
