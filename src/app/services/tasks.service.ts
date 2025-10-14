import { Injectable, signal } from '@angular/core';
import { todos } from '../tasks';
import { Todo } from '../components/todo-input/tasks.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private todos = signal<Todo[]>(todos);

  constructor(){
    //Allows Angular + Vite to use browser APIs such as localStorage
    if (typeof window === 'undefined') return; 

    const retrievedTodo = localStorage.getItem('task');

    if(retrievedTodo){
      this.todos = JSON.parse(retrievedTodo);
    }
  }

  addTodo(todo: Todo){
    this.todos.update(current => [...current, todo]);
    this.saveTasks();
  }

  deleteTodo(id: string) {
    this.todos.update(current => current.filter(t => t.id !== Number(id)));
    this.saveTasks();
  }
  
  get todoList() { return this.todos.asReadonly() }

  private saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(this.todos));
  }
}
