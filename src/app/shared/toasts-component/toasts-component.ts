import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Toast } from '../../core/interfaces';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toasts-component.html',
  styleUrl: './toasts-component.scss',
})
export class ToastsComponent implements OnInit, OnDestroy{
  toastService = inject(ToastService);

  private subscriptions = new Subscription();
  
  toasts: Toast[] = [];

  ngOnInit(): void {
    this.subscriptions.add(
      this.toastService.toasts$.subscribe(toasts => {
        this.toasts = toasts;
      }),
    );
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  closeToast(id: number): void {
    this.toastService.remove(id);
  }
}
