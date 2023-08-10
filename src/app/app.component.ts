import { Component, computed, effect, signal } from '@angular/core';
import { TodoItem } from './todo-item/todo-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  message = 'signals-lessons';
  todoList = signal<TodoItem[]>([]);
  todoListLength = computed(() => this.todoList().length);

  constructor() {
    effect(() => console.log(this.todoList()));
    effect(() =>
      console.log(this.todoList().length + ' length: ' + this.todoListLength())
    );
    effect(() => console.log('Tylko raz na start'));
  }

  handleNewTodo(message: string): void {
    const newTodo: TodoItem = {
      id: new Date().getTime(),
      message: message,
      time: new Date().getTime(),
      done: false,
    };

    // this.todoList.set([newTodo, ...this.todoList()]);
    this.todoList.update((todos) => [newTodo, ...todos]);

    this.message = '';
  }
}
