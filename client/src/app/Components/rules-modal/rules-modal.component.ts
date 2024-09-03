import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UIService } from '../../Services/UI/ui.service';
import { HeaderComponent } from '../header/header.component';
import { IconImgComponent } from '../icon-img/icon-img.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-rules-modal',
  standalone: true,
  imports: [CommonModule, HeaderComponent, IconImgComponent, ButtonComponent],
  templateUrl: './rules-modal.component.html',
  styleUrl: './rules-modal.component.scss',
})
export class RulesModalComponent {
  showModal$: Observable<boolean>;

  constructor(private uiService: UIService) {
    this.showModal$ = this.uiService.showRulesModal$;
  }

  closeModal() {
    this.uiService.dispatchModalDisplayStatus(false);
  }
}
