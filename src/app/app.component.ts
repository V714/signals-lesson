import { Component, OnDestroy, computed, effect, signal } from '@angular/core';
import { TodoItem } from './todo-item/todo-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnDestroy {
  message = 'signals-lessons';
  todoList = signal<TodoItem[]>([]);
  todoListLength = computed(() => this.todoList().length);
  newMessageAnimate: boolean = false;

  constructor() {
    // Rarely needed - debugging - keep data sync with localStorage - custom rendering to a <canvas> -  custom DOM behavior
    // Avoid using effects for propagation of state changes
    // Effects return an EffectRef that can be used to destroy them manually, via the .destroy() operation.
    effect(() => console.log(this.todoList()));
    effect(() =>
      console.log(this.todoList().length + ' length: ' + this.todoListLength())
    );
    effect(() => console.log('Tylko raz na start'));
  }

  ngOnDestroy(): void {}

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
    this.newMessageAnimate = true;
    setTimeout(() => (this.newMessageAnimate = false), 350);
  }

  delete(e: TodoItem) {
    this.todoList.update((todos) => [
      ...todos.filter((todo) => todo.id !== e.id),
    ]);
  }
}
