import { ChangeDetectionStrategy, Component, computed, OnInit, signal } from '@angular/core';
import { ToDoListItemComponent } from '../to-do-list-item/to-do-list-item';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../shared/button-component/button-component';
import { ToDoListType } from '../../interfaces';
import { TooltipDirective } from '../../directives/tooltip';

@Component({
  selector: 'app-to-do-list',
  imports: [
    MatInputModule,
    FormsModule,
    ToDoListItemComponent,
    ButtonComponent,
    TooltipDirective,
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListComponent implements OnInit{

  public instanceCounter = 0;
  
  public toDoList = [
      {
        id: this.instanceCounter++,
        title: 'Приготовить обед',
        description: 'Сытное и вкусное блюдо "с изюминкой", которое можно приготовить всего из 3 ингредиентов, - аппетитные, нежные и румяные яичные конвертики',
      },
      {
        id: this.instanceCounter++,
        title: 'Помыть окна',
        description: 'В процессе оказания услуги происходит очистка москитных сеток, карнизов, жалюзи, удаление грязи между рам, а также полировка стекол специальными средствами.',
      },
      {
        id: this.instanceCounter++,
        title: 'Пропылесосить в квартире',
        description: 'Если в доме нет моющего пылесоса, а тяжелые покрывала не помещаются в стиральную машинку, имеет смысл обратиться за услугами профессионалов. ',
      },
      {
        id: this.instanceCounter++,
        title: 'Сходить в магазин за продуктами',
        description: 'Для экономного и эффективного похода в магазин за продуктами составьте список покупок, спланируйте меню, идите на сытый желудок и заглядывайте на верхние полки, избегая импульсивных трат.',
      },
    ];

  public taskTitle = '';

  public taskDescr = '';

  public disabled = signal<boolean>(true);

  public isLoading = signal<boolean>(true);

  public selectedItemId = signal<number | null>(null);

  public selectedItemDescr = computed(() => this.toDoList.find(x => x.id === this.selectedItemId())?.description);

  public ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }

  public delete(id: number): void {
    const indexToRemove = this.toDoList.findIndex(i => i.id === id);
    if (indexToRemove !== -1) {
      this.toDoList.splice(indexToRemove, 1);
      this.selectedItemId.set(null);
    }
    this.toDoList = this.toDoList.slice();
  }

  public add(): void {
    if (this.taskTitle !== '') {
      const newItem = {
        id: this.instanceCounter++,
        title: this.taskTitle,
        description: this.taskDescr,
      }
      this.toDoList.push(newItem);
      this.taskTitle = '';
      this.taskDescr = '';
      this.disabled.set(true);
    }
  }

  public onInput(): void {
    this.disabled.set(this.taskTitle === '');
  }

  public selectItem(e: number): void {
    this.selectedItemId.set(e);
  }

}

