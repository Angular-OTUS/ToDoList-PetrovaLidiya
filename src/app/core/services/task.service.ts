import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { Task } from '../../shared/models/task.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  private http = inject(HttpClient);

  private toastService = inject(ToastService);

  private tasksSubject = new BehaviorSubject<Task[]>([]);

  private loading = new BehaviorSubject<boolean>(false);

  private selectedTaskIdSubject = new BehaviorSubject<string | null>(null);

  public tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  public loading$: Observable<boolean> = this.loading.asObservable();

  public selectedTaskId$: Observable<string | null> = this.selectedTaskIdSubject.asObservable();

  public get currentTasks(): Task[] {
    return this.tasksSubject.getValue();
  }

  public get selectedTaskId(): string | null {
    return this.selectedTaskIdSubject.getValue();
  }

  public get selectedTask(): Task | null {
    const selectedId = this.selectedTaskId;
    if (!selectedId) return null;
    return this.currentTasks.find(task => task.id === selectedId) || null;
  }

  getTasks(): Observable<Task[]> {
    this.loading.next(true);

    return this.http.get<Task[]>(this.apiUrl).pipe(
      tap(tasks => {
        this.tasksSubject.next(tasks);
      }),
      catchError(error => {
        const errorMessage = 'Ошибка при загрузке задач: ' + error.message;
        return throwError(() => new Error(errorMessage));
      }),
      finalize(() => {
        this.loading.next(false);
      }),
    );
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        const errorMessage = 'Ошибка при загрузке задачи: ' + error.message;
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  updateTask(id: string, task: Partial<Task>, isNeedToast = true): Observable<Task> {
    this.loading.next(true);

    return this.http.patch<Task>(`${this.apiUrl}/${id}`, task).pipe(
      tap(updatedTask => {
        const currentTasks = this.currentTasks;
        const updatedTasks = currentTasks.map(task => 
          task.id === updatedTask.id ? updatedTask : task,
        );
        this.tasksSubject.next(updatedTasks);
        if (isNeedToast)
          this.toastService.show('Задача обновлена', 'success');
      }),
      catchError(error => {
        const errorMessage = 'Ошибка при обновлении задачи: ' + error.message;
        return throwError(() => new Error(errorMessage));
      }),
      finalize(() => {
        this.loading.next(false);
      }),
    );
  }

  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    this.loading.next(true);

    return this.http.post<Task>(this.apiUrl, task).pipe(
      tap(newTask => {
        const currentTasks = this.currentTasks;
        this.tasksSubject.next([...currentTasks, newTask]);
        this.toastService.show('Задача создана', 'success');
      }),
      catchError(error => {
        const errorMessage = 'Ошибка при создании задачи: ' + error.message;
        return throwError(() => new Error(errorMessage));
      }),
      finalize(() => {
        this.loading.next(false);
      }),
    );
  }

  deleteTask(id: string): Observable<void> {
    this.loading.next(true);

    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentTasks = this.currentTasks;
        const filteredTasks = currentTasks.filter(task => task.id !== id);
        this.tasksSubject.next(filteredTasks);
        if (this.selectedTaskId === id) {
          this.clearSelectedTask();
        }
        this.toastService.show('Задача удалена', 'success');
      }),
      catchError(error => {
        const errorMessage = 'Ошибка при удалении задачи: ' + error.message;
        return throwError(() => new Error(errorMessage));
      }),
      finalize(() => {
        this.loading.next(false);
      }),
    );
  }

  selectTask(taskId: string | null): void {
    this.selectedTaskIdSubject.next(taskId);
  }

  clearSelectedTask(): void {
    this.selectedTaskIdSubject.next(null);
  }

  updateTaskStatus(id: string, status: 'InProgress' | 'Completed'): Observable<Task> {
    return this.updateTask(id, { status }, false).pipe(
      tap(() => {
        this.toastService.show('Статус изменен', 'success');
      }),
    );
  }
}
