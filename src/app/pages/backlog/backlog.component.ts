import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../core/services/task.service';
import { ToastService } from '../../core/services/toast.service';
import { Task } from '../../shared/models/task.model';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css'],
  imports: [ CommonModule, FormsModule ],
})
export class BacklogComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task | null = null;
  isLoading = false;

  private taskService = inject(TaskService);

  private toastService = inject(ToastService);

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (error) => {
        this.toastService.show('Ошибка при загрузке списка задач', 'error');
        this.isLoading = false;
      },
    });
  }

  selectTask(task: Task): void {
    this.selectedTask = { ...task };
  }

  updateTaskStatus(status: 'InProgress' | 'Completed'): void {
    if (this.selectedTask) {
      const updatedTask = { ...this.selectedTask, status };
      this.taskService.updateTask(this.selectedTask.id, { status }).subscribe({
        next: () => {
          this.selectedTask = updatedTask;
          this.toastService.show('Статус задачи изменен', 'success');
          this.loadTasks();
        },
        error: (error) => this.toastService.show('Ошибка при обновлении задачи', 'error'),
      });
    }
  }

  saveTask(): void {
    if (this.selectedTask) {
      this.taskService.updateTask(this.selectedTask.id, {
        title: this.selectedTask.title,
        description: this.selectedTask.description,
      }).subscribe({
        next: () => {
          this.loadTasks();
          this.toastService.show('Задача успешно изменена', 'success');
        },
        error: (error) => this.toastService.show('Ошибка при сохранении задачи', 'error'),
      });
    }
  }
}
