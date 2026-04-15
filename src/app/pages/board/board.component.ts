import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../shared/models/task.model';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  imports: [ CommonModule ],
})
export class BoardComponent {
  private taskService = inject(TaskService);
  loading$ = this.taskService.loading$;
  tasks$ = this.taskService.tasks$;

  inProgressTasks$ = this.taskService.tasks$.pipe(                                                                                                             
    map(tasks => tasks.filter(t => t.status === 'InProgress'))
  );                                                                                                                                                           
  completedTasks$ = this.taskService.tasks$.pipe(                                                                            
    map(tasks => tasks.filter(t => t.status === 'Completed'))                                                                                                  
  );

  moveTask(taskId: string, newStatus: 'InProgress' | 'Completed'): void {
    this.taskService.updateTaskStatus(taskId, newStatus).subscribe();
  }
}