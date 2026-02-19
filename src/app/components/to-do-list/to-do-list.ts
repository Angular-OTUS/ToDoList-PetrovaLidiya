import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ToDoListItemComponent } from '../to-do-list-item/to-do-list-item';
import { FormsModule } from '@angular/forms';
import { ToDoListService } from '../../services/ToDoListService.service';
import { ToastService } from '../../services/ToastService.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner';
import { ToDoCreateItemComponent } from '../to-do-create-item/to-do-create-item';
import { ToDoListType } from '../../interfaces';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  public toDoList: ToDoListType[] = [];

  public isLoading = signal<boolean>(true);

  public selectedItemId = signal<number | null>(null);

  public selectedItemDescr = computed(() => this.toDoList.find(x => x.id === this.selectedItemId())?.description);

  public selectedStatusFilter = signal<'InProgress' | 'Completed' | null>(null);

  private _toDoListService = inject(ToDoListService);

  private _toastService = inject(ToastService);

  private _destroyRef = inject(DestroyRef);

  private _cdr = inject(ChangeDetectorRef);
  
  public ngOnInit(): void {
    this._toDoListService.getAll().subscribe(x => {
      this.toDoList = x;
      this.isLoading.set(false);
    });
  }

  public delete(id: number): void {
    if (!id) return;

    this._toDoListService.delete(id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this._toastService.show('Задача удалена', 'success');
        this.selectedItemId.set(null);
        this.toDoList = this.toDoList.filter(t => t.id !== id);
        this._cdr.markForCheck();
      });
  }

  public updateItem(id: number, title: string): void {
    this._toDoListService.update(id, {title: title})
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(x => {
        this._toastService.show('Задача обнавлена', 'success');
        const idx = this.toDoList.findIndex(item => item.id === id);
        if (idx !== -1) {
          this.toDoList[idx] = x;
          this._cdr.markForCheck();
        }
      });
  }

  public selectItem(e: number): void {
    this.selectedItemId.set(e);
  }

  public changeItemStatus(item: ToDoListType, isCompleted: boolean): void {
    const updatedItem = item;
    updatedItem.status = isCompleted ? 'Completed' : 'InProgress';
    this._toDoListService.update(updatedItem.id, updatedItem)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(x => {
        this._toastService.show('Статус задачи изменен', 'success');
        const idx = this.toDoList.findIndex(item => item.id === updatedItem.id);
        if (idx !== -1) {
          this.toDoList[idx] = x;
          this._cdr.markForCheck();
        }
      });
  }

  public addedItem(x: boolean): void {
    if (x) {
      this._toDoListService.getAll().subscribe(x => {
        this.toDoList = x;
        this._cdr.markForCheck();
      });
    }
  }

}

