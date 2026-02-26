import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToDoListService } from '../../services/ToDoListService.service';

@Component({
  selector: 'app-to-do-item-view',
  imports: [],
  templateUrl: './to-do-item-view.html',
  styleUrl: './to-do-item-view.scss',
})
export class ToDoItemViewComponent implements OnInit{
  public description = signal<string>('');
  public selectedTaskId = signal<string>('');
  private readonly _toDoListService = inject(ToDoListService);
  private readonly _ar = inject(ActivatedRoute);

  public ngOnInit(): void {
    this._ar.paramMap.subscribe(params => {
      this.selectedTaskId.set(params.get('id')!);
      if (this.selectedTaskId()) {
        this._toDoListService.getById(this.selectedTaskId()!).subscribe(x => {
          this.description.set(x.description ? x.description : '');
        });
      }
    });
  }
}
