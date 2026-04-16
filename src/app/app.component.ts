import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToastsComponent } from './shared/toasts-component/toasts-component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [
        RouterLink,
        RouterLinkActive,
        RouterOutlet,
        ToastsComponent,
        TranslateModule,
    ],
})
export class AppComponent {
  title = 'tasksboard';
  enActive = signal<boolean>(false);
  ruActive = signal<boolean>(true);
  private translate = inject(TranslateService);

  constructor() {
    this.translate.setDefaultLang('ru');
  }

  switchLanguage(lang: string) {
    if (lang === 'en') {
        this.enActive.set(true);
        this.ruActive.set(false);
    } else {
        this.enActive.set(false);
        this.ruActive.set(true);
    }
    this.translate.use(lang);
  }
}