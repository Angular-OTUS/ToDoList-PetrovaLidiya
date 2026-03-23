import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDoListService } from '../../services/ToDoListService.service';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../shared/button-component/button-component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from '../../services/ToastService.service';

@Component({
  selector: 'app-to-do-item-view',
  imports: [
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ButtonComponent,
  ],
  templateUrl: './to-do-item-view.html',
  styleUrl: './to-do-item-view.scss',
})
export class ToDoItemViewComponent implements OnInit{
  public title = signal<string>('');

  public description = signal<string>('');

  public taskId = signal<string>('');

  public isEditing = signal<boolean>(false);

  public isCompleted = signal<boolean>(false);

  public editingTitle = '';

  public editingDescr = '';

  private readonly _toDoListService = inject(ToDoListService);

  private readonly _ar = inject(ActivatedRoute);
  
  private readonly _toastService = inject(ToastService);

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _cdr = inject(ChangeDetectorRef);

  private readonly _router = inject(Router);

  public ngOnInit(): void {
    this._ar.paramMap.subscribe(params => {
      this.taskId.set(params.get('id')!);
      if (this.taskId()) {
        this._toDoListService.getById(this.taskId()!).subscribe(x => {
          this.title.set(x.title);
          this.description.set(x.description ? x.description : '');
          this.isCompleted.set(x.status === 'Completed');
        });
      }
    });
  }

  public delete(): void {
    this._toDoListService.delete(this.taskId())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this._toastService.show('Задача удалена', 'success');
        this._router.navigate(['/tasks']);
      });
  }

  public cancelEdit(): void {
    this.editingTitle = '';
    this.editingDescr = '';
    this.isEditing.set(false);
  }

  public setEditingMode(): void {
    this.isEditing.set(true);
    this.editingTitle = this.title();
    this.editingDescr = this.description();
  }

  public saveNewTitle(): void {
    this.editingTitle = this.editingTitle.trim();
    if (!this.editingTitle)
      return;
    this._toDoListService.update(this.taskId(), {title: this.editingTitle, description: this.editingDescr})
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(x => {
        this._toastService.show('Задача обнавлена', 'success');
        this.title.set(x.title);
        this.description.set(x.description!);
        this.isEditing.set(false);
      });    
  }

  public onChange(event: any): void {
    const status = event.checked ? 'Completed' : 'InProgress';
    this._toDoListService.update(this.taskId(), {status: status})
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(x => {
        this._toastService.show('Статус задачи изменен', 'success');
        this.isCompleted.set(x.status === 'Completed');
      });
  }
}
