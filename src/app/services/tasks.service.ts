import { Injectable, signal } from '@angular/core';
import { todos } from '../tasks';
import { Todo } from '../components/todo-input/tasks';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private todos = signal<Todo[]>(todos);

  addTodo(todo: Todo){
    this.todos.update(current => [...current, todo]);
  }

  deleteTodo(id: string) {
    this.todos.update(current => current.filter(t => t.id !== Number(id)));
  }
  
  get todoList() { return this.todos.asReadonly() }
}
