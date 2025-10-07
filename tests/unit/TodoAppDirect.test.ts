import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import TodoApp from '@/components/todos/TodoApp.vue';
import { useTodos } from '@/composables/useTodos';

// Mock the composable
vi.mock('@/composables/useTodos', () => ({
  useTodos: vi.fn(),
}));

describe('TodoApp - Direct Function Test', () => {
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

  it('should call createTodo when handleCreateTodo is called directly', async () => {
    const wrapper = mount(TodoApp);
    
    // Get the component instance
    const vm = wrapper.vm as any;
    
    // Call the handleCreateTodo function directly
    vm.handleCreateTodo('Test todo', 'high');
    
    // Check if createTodo was called
    expect(mockUseTodos.createTodo).toHaveBeenCalledWith({
      text: 'Test todo',
      priority: 'high',
    });
  });
});
