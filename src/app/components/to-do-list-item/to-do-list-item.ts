import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-to-do-list-item',
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItemComponent {
  public readonly item = input.required<ToDoListType>();
  public onDelete = output<void>();
}
