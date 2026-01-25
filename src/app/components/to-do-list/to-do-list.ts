import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ToDoListItemComponent } from '../to-do-list-item/to-do-list-item';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../shared/button-component/button-component';

@Component({
  selector: 'app-to-do-list',
  imports: [
    MatInputModule,
    FormsModule,
    ToDoListItemComponent,
    ButtonComponent,
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListComponent implements OnInit{

  public toDoList: ToDoListType[];

  public taskText = '';

  public disabled = signal<boolean>(true);

  public isLoading = signal<boolean>(true);

  private instanceCounter = 0;

  constructor() {
    this.toDoList = [
      {
        id: this.instanceCounter++,
        title: 'Приготовить обед',
      },
      {
        id: this.instanceCounter++,
        title: 'Помыть окна',
      },
      {
        id: this.instanceCounter++,
        title: 'Пропылесосить в квартире',
      },
      {
        id: this.instanceCounter++,
        title: 'Сходить в магазин за продуктами',
      },
    ];
  }

  public ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }

  public delete(id: number): void {
    const indexToRemove = this.toDoList.findIndex(i => i.id === id);
    if (indexToRemove !== -1) {
      this.toDoList.splice(indexToRemove, 1);
    }
    this.toDoList = this.toDoList.slice();
  }

  public add(): void {
    if (this.taskText !== '') {
      const newItem = {
        id: this.instanceCounter++,
        title: this.taskText,
      }
      this.toDoList.push(newItem);
      this.taskText = '';
      this.disabled.set(true);
    }
  }

  public onInput(): void {
    this.disabled.set(this.taskText === '') 
  }

}

