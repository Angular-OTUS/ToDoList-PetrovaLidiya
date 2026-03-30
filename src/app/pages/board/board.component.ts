import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../shared/models/task.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  imports: [ CommonModule ],
})
export class BoardComponent implements OnInit, OnDestroy {
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];
  isLoading = false;

  private taskService = inject(TaskService);

  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(
      this.taskService.tasks$.subscribe(tasks => {
        this.inProgressTasks = tasks.filter(t => t.status === 'InProgress');
        this.completedTasks = tasks.filter(t => t.status === 'Completed');
      }),
    );

    this.subscriptions.add(
      this.taskService.loading$.subscribe(loading => {
        this.isLoading = loading;
      }),
    );

    if (this.taskService.currentTasks.length === 0) {
      this.taskService.getTasks().subscribe();
    }
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  moveTask(taskId: string, newStatus: 'InProgress' | 'Completed'): void {
    this.taskService.updateTaskStatus(taskId, newStatus).subscribe();
  }
}