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
  closeButtonText: string = '';
  closeButtonStyling: string = 'no-button';
  iconImgSrc: string = '/iconClose.svg';
  iconImgAlt: string = 'A close icon which resembles the letter X.';
  iconImgStyling: string = 'close-icon';

  constructor(private uiService: UIService) {
    this.showModal$ = this.uiService.showRulesModal$;
  }

  closeModal() {
    this.uiService.dispatchModalDisplayStatus(false);
  }
}
