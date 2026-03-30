import { Injectable } from '@angular/core';
import { Toast, ToastType } from '../interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  
  public toasts$: Observable<Toast[]> = this.toastsSubject.asObservable();

  public get currentToasts(): Toast[] {
    return this.toastsSubject.getValue();
  }

  show(message: string, type: ToastType) {
    const id = Date.now();
    const toast: Toast = {
      id: id,
      type,
      message,
    };
    const currentToasts = this.currentToasts;

    this.toastsSubject.next([...currentToasts, toast]);
    
    setTimeout(() => this.remove(id), 3000);
  }

  remove(id: number) {
    const filteredToast = this.currentToasts.filter(toast => toast.id !== id);
    this.toastsSubject.next(filteredToast);
  }
}