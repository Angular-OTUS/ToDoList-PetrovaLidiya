import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '../shared/button-component/button-component';
import { TooltipDirective } from '../../directives/tooltip';
import { ToDoListService } from '../../services/ToDoListService.service';
import { ToastService } from '../../services/ToastService.service';

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

  public task = { name: '', description: ''};
  
  private _toDoListService = inject(ToDoListService);

  private _toastService = inject(ToastService);

  public onSubmit(form: any): void {
    if (form.valid) {
      console.log(this.task);
      const added = this._toDoListService.add(this.task.name, this.task.description);
      if (added) {
        this._toastService.show('Задача добавлена', 'success');
        form.resetForm();
      }
    }
  }

}
