import { Component } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { PickAnOptionComponent } from '../../Components/pick-an-option/pick-an-option.component';
import { ButtonComponent } from '../../Components/button/button.component';
import { RulesModalComponent } from '../../Components/rules-modal/rules-modal.component';
import { UIService } from '../../Services/UI/ui.service';
import { Store } from '@ngrx/store';
import { GamePageActions } from '../../State/game/actions/game.actions';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ResultComponent } from '../../Components/result/result.component';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [
    NavbarComponent,
    PickAnOptionComponent,
    ButtonComponent,
    RulesModalComponent,
    CommonModule,
    ResultComponent,
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
})
export class GamePageComponent {
  uiComponent$: Observable<'pickAnOption' | 'result'>;

  constructor(private uiService: UIService, private store: Store) {
    this.uiComponent$ = this.uiService.UIComponent$;
  }

  showModal() {
    this.uiService.dispatchModalDisplayStatus(true);
  }

  resetScore() {
    this.store.dispatch(GamePageActions.resetScore());
  }
}
