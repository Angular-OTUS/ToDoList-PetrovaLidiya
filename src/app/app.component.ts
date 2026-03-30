import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToastsComponent } from './shared/toasts-component/toasts-component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [
        RouterLink,
        RouterLinkActive,
        RouterOutlet,
        ToastsComponent,
    ],
})
export class AppComponent {
  title = 'tasksboard';
}