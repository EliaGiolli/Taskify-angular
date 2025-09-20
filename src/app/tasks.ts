// Todo interface definition
export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate: Date | null;
  createdAt: Date;
  tags: string[];
}

// Sample todos data
export const todos: Todo[] = [
  {
    id: 1,
    title: "Learn Angular basics",
    description: "Complete the Angular tutorial and understand components, services, and routing",
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
    description: "Get milk, bread, eggs, and vegetables from the supermarket",
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
    description: "Prepare slides and practice presentation for the client meeting",
    completed: true,
    priority: 'high',
    category: 'Work',
    dueDate: new Date('2024-01-05'),
    createdAt: new Date('2024-01-02'),
    tags: ['work', 'presentation', 'client']
  },
  {
    id: 4,
    title: "Call dentist",
    description: "Schedule annual dental checkup appointment",
    completed: false,
    priority: 'low',
    category: 'Health',
    dueDate: null,
    createdAt: new Date('2024-01-09'),
    tags: ['health', 'appointment']
  },
  {
    id: 5,
    title: "Read TypeScript handbook",
    description: "Go through the official TypeScript documentation to improve coding skills",
    completed: false,
    priority: 'medium',
    category: 'Learning',
    dueDate: new Date('2024-01-20'),
    createdAt: new Date('2024-01-07'),
    tags: ['typescript', 'documentation', 'learning']
  },
  {
    id: 6,
    title: "Organize workspace",
    description: "Clean desk, organize files, and set up a better work environment",
    completed: false,
    priority: 'low',
    category: 'Personal',
    dueDate: null,
    createdAt: new Date('2024-01-10'),
    tags: ['organization', 'workspace']
  },
  {
    id: 7,
    title: "Update portfolio website",
    description: "Add new projects and improve the design of personal portfolio",
    completed: false,
    priority: 'medium',
    category: 'Work',
    dueDate: new Date('2024-01-25'),
    createdAt: new Date('2024-01-06'),
    tags: ['portfolio', 'website', 'design']
  },
  {
    id: 8,
    title: "Plan weekend trip",
    description: "Research destinations, book accommodation, and create itinerary",
    completed: true,
    priority: 'medium',
    category: 'Personal',
    dueDate: new Date('2024-01-12'),
    createdAt: new Date('2024-01-03'),
    tags: ['travel', 'planning', 'weekend']
  }
];

// Helper functions for working with todos
export class TodoService {
  // Get all todos
  static getAllTodos(): Todo[] {
    return todos;
  }

  // Get todos by completion status
  static getTodosByStatus(completed: boolean): Todo[] {
    return todos.filter(todo => todo.completed === completed);
  }

  // Get todos by priority
  static getTodosByPriority(priority: 'low' | 'medium' | 'high'): Todo[] {
    return todos.filter(todo => todo.priority === priority);
  }

  // Get todos by category
  static getTodosByCategory(category: string): Todo[] {
    return todos.filter(todo => todo.category.toLowerCase() === category.toLowerCase());
  }

  // Get overdue todos
  static getOverdueTodos(): Todo[] {
    const today = new Date();
    return todos.filter(todo => 
      todo.dueDate && 
      todo.dueDate < today && 
      !todo.completed
    );
  }

  // Toggle todo completion status
  static toggleTodo(id: number): Todo | null {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      return todo;
    }
    return null;
  }

  // Add new todo
  static addTodo(todo: Omit<Todo, 'id' | 'createdAt'>): Todo {
    const newTodo: Todo = {
      ...todo,
      id: Math.max(...todos.map(t => t.id)) + 1,
      createdAt: new Date()
    };
    todos.push(newTodo);
    return newTodo;
  }

  // Delete todo
  static deleteTodo(id: number): boolean {
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) {
      todos.splice(index, 1);
      return true;
    }
    return false;
  }
}
