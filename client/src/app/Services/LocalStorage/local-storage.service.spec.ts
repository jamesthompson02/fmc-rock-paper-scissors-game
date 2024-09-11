import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let spectator: SpectatorService<LocalStorageService>;

  let createService = createServiceFactory({
    service: LocalStorageService,
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should be created', () => {
    expect(spectator).toBeTruthy();
  });

  it('should set an item in localStorage', () => {
    const setItemFn = jest.spyOn(Storage.prototype, 'setItem');

    spectator.service.setItem('rockPaperScissorsGame', '1');

    expect(setItemFn).toHaveBeenCalled();
    expect(setItemFn).toHaveBeenCalledWith('rockPaperScissorsGame', '1');
  });

  it('should get an item in localStorage', () => {
    const getItemFn = jest.spyOn(Storage.prototype, 'getItem');

    spectator.service.setItem('rockPaperScissorsGame', '1');
    const playerScore = spectator.service.getItem('rockPaperScissorsGame');

    expect(getItemFn).toHaveBeenCalled();
    expect(playerScore).toBe('1');
  });

  it('should clear localStorage', () => {
    const clearStorageFn = jest.spyOn(Storage.prototype, 'clear');

    spectator.service.setItem('rockPaperScissorsGame', '1');
    spectator.service.clearStorage();
    const playerScore = spectator.service.getItem('rockPaperScissorsGame');

    expect(clearStorageFn).toHaveBeenCalled();
    expect(playerScore).toBeNull();
  });
});
