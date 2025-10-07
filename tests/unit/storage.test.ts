import { describe, it, expect, beforeEach, vi } from 'vitest';
import { saveTodos, loadTodos, clearTodos, generateId, getCurrentTimestamp, StorageError } from '@/utils/storage';
import type { Todo } from '@/types/todo';

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

describe('storage utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('saveTodos', () => {
    it('should save todos to localStorage', () => {
      const todos: Todo[] = [
        {
          id: '1',
          text: 'Test todo',
          completed: false,
          priority: 'high',
          order: 0,
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z',
        },
      ];

      saveTodos(todos);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'vue-todo-app',
        JSON.stringify(todos)
      );
    });

    it('should throw StorageError when localStorage fails', () => {
      const todos: Todo[] = [];
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded');
      });

      expect(() => saveTodos(todos)).toThrow(StorageError);
    });
  });

  describe('loadTodos', () => {
    it('should return empty array when no data in localStorage', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = loadTodos();

      expect(result).toEqual([]);
    });

    it('should load todos from localStorage', () => {
      const todos: Todo[] = [
        {
          id: '1',
          text: 'Test todo',
          completed: false,
          priority: 'high',
          order: 0,
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z',
        },
      ];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(todos));

      const result = loadTodos();

      expect(result).toEqual(todos);
    });

    it('should filter out invalid todos', () => {
      const invalidData = [
        {
          id: '1',
          text: 'Valid todo',
          completed: false,
          priority: 'high',
          order: 0,
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z',
        },
        {
          id: '2',
          text: 'Invalid todo',
          // Missing required fields
        },
        'not an object',
      ];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(invalidData));

      const result = loadTodos();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });

    it('should return empty array when localStorage fails', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('Storage error');
      });

      const result = loadTodos();

      expect(result).toEqual([]);
    });
  });

  describe('clearTodos', () => {
    it('should remove todos from localStorage', () => {
      clearTodos();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('vue-todo-app');
    });

    it('should throw StorageError when localStorage fails', () => {
      localStorageMock.removeItem.mockImplementation(() => {
        throw new Error('Storage error');
      });

      expect(() => clearTodos()).toThrow(StorageError);
    });
  });

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();

      expect(id1).toBeDefined();
      expect(id2).toBeDefined();
      expect(id1).not.toBe(id2);
    });

    it('should generate IDs with timestamp and random string', () => {
      const id = generateId();
      const parts = id.split('-');

      expect(parts).toHaveLength(2);
      expect(parts[0]).toMatch(/^\d+$/); // timestamp
      expect(parts[1]).toMatch(/^[a-z0-9]+$/); // random string
    });
  });

  describe('getCurrentTimestamp', () => {
    it('should return ISO timestamp', () => {
      const timestamp = getCurrentTimestamp();

      expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
      expect(new Date(timestamp).toISOString()).toBe(timestamp);
    });
  });
});
