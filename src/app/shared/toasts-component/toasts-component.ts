import { Component, inject, } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toasts-component.html',
  styleUrl: './toasts-component.scss',
})
export class ToastsComponent {

  toasts$ = inject(ToastService).toasts$;

  toastService = inject(ToastService);

  closeToast(id: number): void {
    this.toastService.remove(id);
  }
}
