import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ToDoListType } from '../../interfaces';
import { TooltipDirective } from '../../directives/tooltip';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-to-do-list-item',
  imports: [
    TooltipDirective,
],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItemComponent {
  public readonly item = input.required<ToDoListType>();
  public taskId = input.required<string | null>();

  public isCompleted = computed(() => this.item().status === 'Completed');

  private readonly _router = inject(Router);

  private readonly _ar = inject(ActivatedRoute);

  public selectItem(): void {
    this._router.navigate(['/tasks', this.item().id]);
  }

}
