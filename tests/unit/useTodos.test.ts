import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useTodos } from '@/composables/useTodos';
import type { Todo, CreateTodoData, UpdateTodoData } from '@/types/todo';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock the storage utilities
vi.mock('@/utils/storage', () => ({
  saveTodos: vi.fn(),
  loadTodos: vi.fn(() => []),
  generateId: vi.fn(() => 'test-id'),
  getCurrentTimestamp: vi.fn(() => '2023-01-01T00:00:00.000Z'),
}));

describe('useTodos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty todos', () => {
    const { todos, stats } = useTodos();
    
    expect(todos.value).toEqual([]);
    expect(stats.value.total).toBe(0);
    expect(stats.value.completed).toBe(0);
    expect(stats.value.incomplete).toBe(0);
  });

  it('should create a new todo', () => {
    const { createTodo, todos } = useTodos();
    
    const todoData: CreateTodoData = {
      text: 'Test todo',
      priority: 'high',
    };
    
    const newTodo = createTodo(todoData);
    
    expect(newTodo).toMatchObject({
      id: 'test-id',
      text: 'Test todo',
      completed: false,
      priority: 'high',
      order: 0,
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    });
    
    expect(todos.value).toHaveLength(1);
    expect(todos.value[0]).toStrictEqual(newTodo);
  });

  it('should update a todo', () => {
    const { createTodo, updateTodo, todos } = useTodos();
    
    const todo = createTodo({ text: 'Test todo', priority: 'low' });
    const updateData: UpdateTodoData = {
      text: 'Updated todo',
      priority: 'high',
    };
    
    const updatedTodo = updateTodo(todo.id, updateData);
    
    expect(updatedTodo).toMatchObject({
      id: todo.id,
      text: 'Updated todo',
      priority: 'high',
      completed: false,
    });
    
    expect(todos.value[0]).toStrictEqual(updatedTodo);
  });

  it('should toggle todo completion', () => {
    const { createTodo, toggleTodo, todos } = useTodos();
    
    const todo = createTodo({ text: 'Test todo', priority: 'medium' });
    
    expect(todo.completed).toBe(false);
    
    const result = toggleTodo(todo.id);
    
    expect(result).toBe(true);
    expect(todos.value[0].completed).toBe(true);
  });

  it('should delete a todo', () => {
    const { createTodo, deleteTodo, todos } = useTodos();
    
    const todo1 = createTodo({ text: 'Todo 1', priority: 'low' });
    const todo2 = createTodo({ text: 'Todo 2', priority: 'high' });
    
    expect(todos.value).toHaveLength(2);
    
    const result = deleteTodo(todo1.id);
    
    expect(result).toBe(true);
    expect(todos.value).toHaveLength(1);
    expect(todos.value[0].id).toBe(todo2.id);
  });

  it('should filter todos by search text', () => {
    const { createTodo, filteredTodos, setFilters } = useTodos();
    
    createTodo({ text: 'Buy groceries', priority: 'high' });
    createTodo({ text: 'Walk the dog', priority: 'low' });
    createTodo({ text: 'Buy milk', priority: 'medium' });
    
    setFilters({ search: 'buy' });
    
    expect(filteredTodos.value).toHaveLength(2);
    expect(filteredTodos.value.every(todo => 
      todo.text.toLowerCase().includes('buy')
    )).toBe(true);
  });

  it('should filter todos by priority', () => {
    const { createTodo, filteredTodos, setFilters } = useTodos();
    
    createTodo({ text: 'High priority task', priority: 'high' });
    createTodo({ text: 'Low priority task', priority: 'low' });
    createTodo({ text: 'Medium priority task', priority: 'medium' });
    
    setFilters({ priority: 'high' });
    
    expect(filteredTodos.value).toHaveLength(1);
    expect(filteredTodos.value[0].priority).toBe('high');
  });

  it('should filter todos by completion status', () => {
    const { createTodo, filteredTodos, setFilters, toggleTodo } = useTodos();
    
    const todo1 = createTodo({ text: 'Task 1', priority: 'high' });
    const todo2 = createTodo({ text: 'Task 2', priority: 'low' });
    
    toggleTodo(todo1.id);
    
    setFilters({ completed: 'completed' });
    
    expect(filteredTodos.value).toHaveLength(1);
    expect(filteredTodos.value[0].id).toBe(todo1.id);
  });

  it('should calculate correct stats', () => {
    const { createTodo, stats, toggleTodo } = useTodos();
    
    const todo1 = createTodo({ text: 'High task', priority: 'high' });
    const todo2 = createTodo({ text: 'Medium task', priority: 'medium' });
    const todo3 = createTodo({ text: 'Low task', priority: 'low' });
    
    toggleTodo(todo1.id);
    
    expect(stats.value).toEqual({
      total: 3,
      completed: 1,
      incomplete: 2,
      high: 1,
      medium: 1,
      low: 1,
    });
  });

  it('should clear completed todos', () => {
    const { createTodo, clearCompleted, todos, toggleTodo } = useTodos();
    
    const todo1 = createTodo({ text: 'Task 1', priority: 'high' });
    const todo2 = createTodo({ text: 'Task 2', priority: 'low' });
    
    toggleTodo(todo1.id);
    
    expect(todos.value).toHaveLength(2);
    
    clearCompleted();
    
    expect(todos.value).toHaveLength(1);
    expect(todos.value[0].id).toBe(todo2.id);
  });

  it('should reset filters', () => {
    const { setFilters, resetFilters, filters } = useTodos();
    
    setFilters({
      search: 'test',
      priority: 'high',
      completed: 'completed',
    });
    
    expect(filters.value).toEqual({
      search: 'test',
      priority: 'high',
      completed: 'completed',
    });
    
    resetFilters();
    
    expect(filters.value).toEqual({
      search: '',
      priority: 'all',
      completed: 'all',
    });
  });
});
