import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../shared/models/task.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css'],
  imports: [ CommonModule, FormsModule ],
})
export class BacklogComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  selectedTask: Task | null = null;
  isLoading = false;

  private taskService = inject(TaskService);

  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(
      this.taskService.tasks$.subscribe(tasks => {
        this.tasks = tasks;
      }),
    );

    this.subscriptions.add(
      this.taskService.selectedTaskId$.subscribe(() => {
        this.selectedTask = this.taskService.selectedTask;
      }),
    );

    this.subscriptions.add(
      this.taskService.loading$.subscribe(loading => {
        this.isLoading = loading;
      }),
    );

    this.taskService.getTasks().subscribe();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  selectTask(task: Task): void {
    this.taskService.selectTask(task.id);
  }

  updateTaskStatus(status: 'InProgress' | 'Completed'): void {
    if (this.selectedTask) {
      this.taskService.updateTaskStatus(this.selectedTask.id, status).subscribe();
    }
  }

  saveTask(): void {
    if (this.selectedTask) {
      this.taskService.updateTask(this.selectedTask.id, {
        title: this.selectedTask.title,
        description: this.selectedTask.description,
      }).subscribe();
    }
  }
}
