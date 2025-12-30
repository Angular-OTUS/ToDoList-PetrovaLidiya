import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToDoListComponent } from './components/to-do-list/to-do-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToDoListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('todolist');
}
