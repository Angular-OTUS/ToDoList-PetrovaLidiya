import { Component, DestroyRef, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '../shared/button-component/button-component';
import { TooltipDirective } from '../../directives/tooltip';
import { ToDoListService } from '../../services/ToDoListService.service';
import { ToastService } from '../../services/ToastService.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-to-do-create-item',
  imports: [
    MatInputModule,
    FormsModule,
    ButtonComponent,
    TooltipDirective,
  ],
  templateUrl: './to-do-create-item.html',
  styleUrl: './to-do-create-item.scss',
})
export class ToDoCreateItemComponent {

  public readonly addedSuccess = output<boolean>();

  public task = { name: '', description: ''};
  
  private _toDoListService = inject(ToDoListService);

  private _toastService = inject(ToastService);

  private _destroyRef = inject(DestroyRef);

  public onSubmit(form: any): void {
    if (form.valid) {
      this._toDoListService.add(this.task.name, this.task.description)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe(x => {
          if (x) {
            this._toastService.show('Задача добавлена', 'success');
            this.addedSuccess.emit(true);
            form.resetForm();
          }
        });
    }
  }

}
