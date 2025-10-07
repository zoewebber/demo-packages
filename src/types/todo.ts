export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface TodoFilters {
  search: string;
  priority: 'all' | 'high' | 'medium' | 'low';
  completed: 'all' | 'completed' | 'incomplete';
}

export interface TodoStats {
  total: number;
  completed: number;
  incomplete: number;
  high: number;
  medium: number;
  low: number;
}

export type Priority = 'high' | 'medium' | 'low';

export interface CreateTodoData {
  text: string;
  priority: Priority;
}

export interface UpdateTodoData {
  text?: string;
  completed?: boolean;
  priority?: Priority;
}
