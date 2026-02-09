import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { ButtonComponent } from '../shared/button-component/button-component';
import { ToDoListType } from '../../interfaces';
import { TooltipDirective } from '../../directives/tooltip';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-to-do-list-item',
  imports: [
    MatInputModule,
    FormsModule,
    ButtonComponent,
    TooltipDirective,
],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItemComponent {
  public readonly item = input.required<ToDoListType>();
  public selectedId = input<number | null>();
  public readonly selectItem = output<number>();
  public readonly delete = output<void>();
  public readonly save = output<string>();

  public editingTitle = '';
  public isEditing = signal<boolean>(false);

  public saveNewTitle(): void {
    this.save.emit(this.editingTitle);
    this.isEditing.set(false);
  }

  public cancelEdit(): void {
    this.editingTitle = '';
    this.isEditing.set(false);
  }

  public setEditingMode(): void {
    this.isEditing.set(true);
    this.editingTitle = this.item().title;
  }
  
}
