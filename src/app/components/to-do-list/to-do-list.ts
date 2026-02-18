import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { ToDoListItemComponent } from '../to-do-list-item/to-do-list-item';
import { FormsModule } from '@angular/forms';
import { ToDoListService } from '../../services/ToDoListService.service';
import { ToastService } from '../../services/ToastService.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner';
import { ToDoCreateItemComponent } from '../to-do-create-item/to-do-create-item';
import { ToDoListType } from '../../interfaces';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-to-do-list',
  imports: [
    FormsModule,
    ToDoListItemComponent,
    LoadingSpinnerComponent,
    ToDoCreateItemComponent,
    MatFormFieldModule, 
    MatSelectModule,
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListComponent implements OnInit{

  public toDoList = computed(() => this._toDoListService.toDoList());

  public isLoading = signal<boolean>(true);

  public selectedItemId = signal<number | null>(null);

  public selectedItemDescr = computed(() => this.toDoList().find(x => x.id === this.selectedItemId())?.description);

  public selectedStatusFilter = signal<'InProgress' | 'Completed' | null>(null);

  private _toDoListService = inject(ToDoListService);

  private _toastService = inject(ToastService);
  
  public ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }

  public delete(id: number): void {
    this._toDoListService.delete(id);
    this._toastService.show('Задача удалена', 'success');
    this.selectedItemId.set(null);
  }

  public updateItem(id: number, title: string) {
    this._toDoListService.update(id, {title: title});
    this._toastService.show('Задача обнавлена', 'success');
  }

  public selectItem(e: number): void {
    this.selectedItemId.set(e);
  }

  public changeItemStatus(item: ToDoListType, isCompleted: boolean): void {
    const updatedItem = item;
    updatedItem.status = isCompleted ? 'Completed' : 'InProgress';
    this._toDoListService.update(updatedItem.id, updatedItem);
  }

}

