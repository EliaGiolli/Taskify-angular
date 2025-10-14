// Todo interface definition
import { Todo } from "./components/todo-input/tasks.model";
// Sample todos data
export const todos: Todo[] = [
  {
    id: 1,
    title: "Learn Angular basics",
    completed: false,
    priority: 'high',
    category: 'Learning',
    dueDate: new Date('2024-01-15'),
    createdAt: new Date('2024-01-01'),
    tags: ['angular', 'frontend', 'learning']
  },
  {
    id: 2,
    title: "Buy groceries",
    completed: false,
    priority: 'medium',
    category: 'Personal',
    dueDate: new Date('2024-01-10'),
    createdAt: new Date('2024-01-08'),
    tags: ['shopping', 'food']
  },
  {
    id: 3,
    title: "Finish project presentation",
    completed: true,
    priority: 'high',
    category: 'Work',
    dueDate: new Date('2024-01-05'),
    createdAt: new Date('2024-01-02'),
    tags: ['work', 'presentation', 'client']
  }
];
