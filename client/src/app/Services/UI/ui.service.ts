import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  private _UIComponent$: BehaviorSubject<'pickAnOption' | 'result'> =
    new BehaviorSubject<'pickAnOption' | 'result'>('pickAnOption');

  private _showRulesModal$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  UIComponent$: Observable<'pickAnOption' | 'result'> =
    this._UIComponent$.asObservable();

  showRulesModal$: Observable<boolean> = this._showRulesModal$.asObservable();

  dispatch(componentName: 'pickAnOption' | 'result') {
    this._UIComponent$.next(componentName);
  }

  dispatchModalDisplayStatus(shouldDisplayModal: boolean) {
    this._showRulesModal$.next(shouldDisplayModal);
  }
}
