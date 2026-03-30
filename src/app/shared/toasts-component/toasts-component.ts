import { Component, inject } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toasts-component.html',
  styleUrl: './toasts-component.scss',
})
export class ToastsComponent {
  toastService = inject(ToastService);
}
