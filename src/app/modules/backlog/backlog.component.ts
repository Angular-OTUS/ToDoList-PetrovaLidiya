import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../shared/models/task.model';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css'],
  imports: [ FormsModule, ],
})
export class BacklogComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task | null = null;
  isLoading = false;

  constructor(private taskService: TaskService) {}

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
        console.error('Error loading tasks:', error);
        this.isLoading = false;
      }
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
          this.loadTasks();
        },
        error: (error) => console.error('Error updating task:', error)
      });
    }
  }

  saveTask(): void {
    if (this.selectedTask) {
      this.taskService.updateTask(this.selectedTask.id, {
        title: this.selectedTask.title,
        description: this.selectedTask.description
      }).subscribe({
        next: () => {
          this.loadTasks();
        },
        error: (error) => console.error('Error saving task:', error)
      });
    }
  }
}
