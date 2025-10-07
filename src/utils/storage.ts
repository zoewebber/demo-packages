import type { Todo } from '@/types/todo';

const STORAGE_KEY = 'vue-todo-app';

export class StorageError extends Error {
  constructor(message: string, public cause?: Error) {
    super(message);
    this.name = 'StorageError';
  }
}

export function saveTodos(todos: Todo[]): void {
  try {
    const serialized = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    throw new StorageError('Failed to save todos to localStorage', error as Error);
  }
}

export function loadTodos(): Todo[] {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) {
      return [];
    }
    
    const parsed = JSON.parse(serialized);
    
    // Validate the data structure
    if (!Array.isArray(parsed)) {
      throw new Error('Invalid data format');
    }
    
    // Validate each todo item
    const validatedTodos = parsed.filter((item: any) => {
      return (
        typeof item === 'object' &&
        typeof item.id === 'string' &&
        typeof item.text === 'string' &&
        typeof item.completed === 'boolean' &&
        ['high', 'medium', 'low'].includes(item.priority) &&
        typeof item.order === 'number' &&
        typeof item.createdAt === 'string' &&
        typeof item.updatedAt === 'string'
      );
    });
    
    return validatedTodos as Todo[];
  } catch (error) {
    console.warn('Failed to load todos from localStorage:', error);
    return [];
  }
}

export function clearTodos(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    throw new StorageError('Failed to clear todos from localStorage', error as Error);
  }
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}
