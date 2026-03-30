import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';
import { ToastService } from '../../core/services/toast.service';
import { Task } from '../../shared/models/task.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  imports: [ CommonModule ],
})
export class BoardComponent implements OnInit {
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];
  isLoading = false;

  private taskService = inject(TaskService);

  private toastService = inject(ToastService)

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.inProgressTasks = tasks.filter(t => t.status === 'InProgress');
        this.completedTasks = tasks.filter(t => t.status === 'Completed');
        this.isLoading = false;
      },
      error: () => {
        this.toastService.show('Ошибка при загрузке списка задач', 'error');
        this.isLoading = false;
      },
    });
  }

  moveTask(task: Task, newStatus: 'InProgress' | 'Completed'): void {
    this.taskService.updateTask(task.id, { status: newStatus }).subscribe({
      next: () => {
        this.toastService.show('Статус задачи изменен', 'success');
        this.loadTasks();
      },
      error: () => this.toastService.show('Ошибка при обновлении задачи', 'error'),
    });
  }
}