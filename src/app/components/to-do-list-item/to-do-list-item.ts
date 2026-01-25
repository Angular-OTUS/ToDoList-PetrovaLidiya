import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonComponent } from '../shared/button-component/button-component';

@Component({
  selector: 'app-to-do-list-item',
  imports: [
    ButtonComponent,
  ],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItemComponent {
  public readonly item = input.required<ToDoListType>();
  public readonly delete = output<void>();
}
