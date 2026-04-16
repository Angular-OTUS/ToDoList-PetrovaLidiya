import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';
import { map } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  imports: [ CommonModule, TranslatePipe ],
})
export class BoardComponent {
  private taskService = inject(TaskService);
  loading$ = this.taskService.loading$;
  tasks$ = this.taskService.tasks$;

  inProgressTasks$ = this.taskService.tasks$.pipe(                                                                                                             
    map(tasks => tasks.filter(t => t.status === 'InProgress')),
  );                                                                                                                                                           
  completedTasks$ = this.taskService.tasks$.pipe(                                                                            
    map(tasks => tasks.filter(t => t.status === 'Completed')),                                                                                                 
  );

  moveTask(taskId: string, newStatus: 'InProgress' | 'Completed'): void {
    this.taskService.updateTaskStatus(taskId, newStatus).subscribe();
  }
}