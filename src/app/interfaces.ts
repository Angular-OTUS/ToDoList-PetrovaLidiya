export interface ToDoListType {
  id: number;
  title: string;
  description?: string;
  status: 'InProgress' | 'Completed';
}

export type NButtonType = 'accent' | 'basic' | 'danger';

export type NButtonSize = 'small' | 'default';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}
