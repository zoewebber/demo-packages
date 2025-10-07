import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import TodoApp from '@/components/todos/TodoApp.vue';
import { useTodos } from '@/composables/useTodos';

// Mock the composable
vi.mock('@/composables/useTodos', () => ({
  useTodos: vi.fn(),
}));

describe('TodoApp - Add Todo Debug', () => {
  let mockUseTodos: any;

  beforeEach(() => {
    mockUseTodos = {
      sortedTodos: [],
      stats: { total: 0, completed: 0, incomplete: 0, high: 0, medium: 0, low: 0 },
      filters: { search: '', priority: 'all', completed: 'all' },
      createTodo: vi.fn(),
      updateTodo: vi.fn(),
      deleteTodo: vi.fn(),
      toggleTodo: vi.fn(),
      reorderTodos: vi.fn(),
      clearCompleted: vi.fn(),
      setFilters: vi.fn(),
    };

    (useTodos as any).mockReturnValue(mockUseTodos);
  });

  it('should debug form submission', async () => {
    const wrapper = mount(TodoApp);
    
    const input = wrapper.find('input[placeholder="What needs to be done?"]');
    
    console.log('Input element:', input.element);
    
    // Set input value
    await input.setValue('Test todo');
    
    console.log('Input value after setValue:', (input.element as HTMLInputElement).value);
    
    // Press Enter key to submit
    await input.trigger('keydown.enter');
    
    console.log('createTodo called:', mockUseTodos.createTodo.mock.calls);
    
    // Check if createTodo was called
    expect(mockUseTodos.createTodo).toHaveBeenCalledWith({
      text: 'Test todo',
      priority: 'medium',
    });
  });
});
