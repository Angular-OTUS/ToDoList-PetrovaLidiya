import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
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
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-to-do-list',
  imports: [
    FormsModule,
    ToDoListItemComponent,
    LoadingSpinnerComponent,
    ToDoCreateItemComponent,
    MatFormFieldModule, 
    MatSelectModule,
    RouterOutlet,
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListComponent implements OnInit{

  public toDoList: ToDoListType[] = [];

  public isLoading = signal<boolean>(true);

  public selectedStatusFilter = signal<'InProgress' | 'Completed' | null>(null);

  private _toDoListService = inject(ToDoListService);

  private _toastService = inject(ToastService);

  private _destroyRef = inject(DestroyRef);

  private _cdr = inject(ChangeDetectorRef);

  private readonly _router = inject(Router);
  
  public ngOnInit(): void {
    this._toDoListService.getAll()
    .pipe(
      catchError((error: HttpErrorResponse) => { 
        this._toastService.show('Сервис временно недоступен. Попробуйте позже.', 'error'); 
        return throwError(error);
      }),
      takeUntilDestroyed(this._destroyRef),
    )
    .subscribe(x => {
      this.toDoList = x;
      this.isLoading.set(false);
    });
  }

  public selectItem(e: string): void {
    this._router.navigate(['/tasks', e]);
  }

  public addedItem(x: boolean): void {
    if (x) {
      this._toDoListService.getAll()
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe(x => {
          this.toDoList = x;
          this._cdr.markForCheck();
        });
    }
  }

}

