import { Injectable, signal } from '@angular/core';
import { Toast } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts = signal<Toast[]>([]);

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const id = Date.now();
    this.toasts.update((toasts) => [...toasts, { id, message, type }]);
    
    setTimeout(() => this.remove(id), 3000);
  }

  remove(id: number) {
    this.toasts.update((toasts) => toasts.filter((t) => t.id !== id));
  }
}