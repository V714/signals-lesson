import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from './todo-item.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.sass'],
})
export class TodoItemComponent {
  @Input() todoItem: TodoItem;
  @Output() done: EventEmitter<TodoItem> = new EventEmitter();
  @Output() edit: EventEmitter<TodoItem> = new EventEmitter();
  @Output() delete: EventEmitter<TodoItem> = new EventEmitter();

  emitDone(): void {
    this.done.emit(this.todoItem);
  }

  handleEdit(): void {}

  emitEdit(item: TodoItem): void {
    this.edit.emit(item);
  }

  emitDelete(): void {
    this.delete.emit(this.todoItem);
  }
}
