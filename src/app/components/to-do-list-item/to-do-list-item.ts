import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonComponent } from '../shared/button-component/button-component';
import { ToDoListType } from '../../interfaces';
import { TooltipDirective } from '../../directives/tooltip';

@Component({
  selector: 'app-to-do-list-item',
  imports: [
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
  
}
