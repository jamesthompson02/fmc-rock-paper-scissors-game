import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  private _UIComponent$: BehaviorSubject<'pickAnOption' | 'result'> =
    new BehaviorSubject<'pickAnOption' | 'result'>('pickAnOption');

  UIComponent$: Observable<'pickAnOption' | 'result'> =
    this._UIComponent$.asObservable();

  dispatch(componentName: 'pickAnOption' | 'result') {
    this._UIComponent$.next(componentName);
  }
}
