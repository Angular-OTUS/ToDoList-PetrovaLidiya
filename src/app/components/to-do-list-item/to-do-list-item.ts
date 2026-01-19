import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-to-do-list-item',
  imports: [],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss',
})
export class ToDoListItemComponent {
  @Input() public item: any;
  @Output() public onDelete: EventEmitter<void> = new EventEmitter<void>();
}
