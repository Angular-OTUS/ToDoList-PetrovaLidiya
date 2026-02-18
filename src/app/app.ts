import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToDoListComponent } from './components/to-do-list/to-do-list';
import { ToastsComponent } from './components/toasts-component/toasts-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToDoListComponent, ToastsComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('todolist');
}
