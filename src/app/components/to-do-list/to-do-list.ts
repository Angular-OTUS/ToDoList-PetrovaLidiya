import { Component } from '@angular/core';

@Component({
  selector: 'app-to-do-list',
  imports: [],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
  standalone: true,
})
export class ToDoListComponent {

  public toDoList: ToDoListType[];

  public taskText = '';

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
    }
  }

  public onInput(event: Event): void {
    this.taskText = (event.target as HTMLInputElement).value;
  }

}

type ToDoListType = {
  id: number;
  title: string;
}