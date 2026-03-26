import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';
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
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.isLoading = false;
      },
    });
  }

  moveTask(task: Task, newStatus: 'InProgress' | 'Completed'): void {
    this.taskService.updateTask(task.id, { status: newStatus }).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (error) => console.error('Error moving task:', error),
    });
  }
}