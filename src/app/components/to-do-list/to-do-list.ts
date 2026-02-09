import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal,Signal } from '@angular/core';
import { ToDoListItemComponent } from '../to-do-list-item/to-do-list-item';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../shared/button-component/button-component';
import { ToDoListType } from '../../interfaces';
import { TooltipDirective } from '../../directives/tooltip';
import { ToDoListService } from '../../services/ToDoListService.service';

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

  public toDoList = computed(() => this._toDoListService.toDoList());

  public taskTitle = '';

  public taskDescr = '';

  public disabled = signal<boolean>(true);

  public isLoading = signal<boolean>(true);

  public selectedItemId = signal<number | null>(null);

  public selectedItemDescr = computed(() => this.toDoList().find(x => x.id === this.selectedItemId())?.description);

  private _toDoListService = inject(ToDoListService);
  
  public ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }

  public delete(id: number): void {
    this._toDoListService.delete(id);
    this.selectedItemId.set(null);
  }

  public add(): void {
    if (this.taskTitle !== '') {
      this._toDoListService.add(this.taskTitle, this.taskDescr);
      this.taskTitle = '';
      this.taskDescr = '';
      this.disabled.set(true);
    }
  }

  public updateItem(id: number, title: string) {
    this._toDoListService.update(id, {title: title});
  }

  public onInput(): void {
    this.disabled.set(this.taskTitle === '');
  }

  public selectItem(e: number): void {
    this.selectedItemId.set(e);
  }

}

