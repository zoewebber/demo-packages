import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import TodoApp from '@/components/todos/TodoApp.vue';
import { useTodos } from '@/composables/useTodos';

// Mock the composable
vi.mock('@/composables/useTodos', () => ({
  useTodos: vi.fn(),
}));

describe('TodoApp - Working Add Todo Tests', () => {
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

  it('should render the add todo form', () => {
    const wrapper = mount(TodoApp);
    
    // The form is in TodoList component, not directly in TodoApp
    expect(wrapper.find('input[placeholder="What needs to be done?"]').exists()).toBe(true);
    // There's no submit button, only Enter key handling
    expect(wrapper.find('button[type="submit"]').exists()).toBe(false);
  });

  it('should call createTodo when form is submitted via Enter key', async () => {
    const wrapper = mount(TodoApp);
    
    const input = wrapper.find('input[placeholder="What needs to be done?"]');
    
    // Set input value
    await input.setValue('Test todo');
    
    // Simulate Enter key press
    await input.trigger('keydown.enter');
    
    // Check if createTodo was called
    expect(mockUseTodos.createTodo).toHaveBeenCalledWith({
      text: 'Test todo',
      priority: 'medium',
    });
  });

  it('should not call createTodo when submit button is clicked (no submit button)', async () => {
    const wrapper = mount(TodoApp);
    
    const input = wrapper.find('input[placeholder="What needs to be done?"]');
    
    // Set input value
    await input.setValue('Test todo');
    
    // Wait for reactivity to update the button state
    await wrapper.vm.$nextTick();
    
    // There's no submit button, so this test should verify that
    expect(wrapper.find('button[type="submit"]').exists()).toBe(false);
  });

  it('should reset form after adding todo', async () => {
    const wrapper = mount(TodoApp);
    
    const input = wrapper.find('input[placeholder="What needs to be done?"]');
    
    // Set input value
    await input.setValue('Test todo');
    
    // Simulate Enter key press
    await input.trigger('keydown.enter');
    
    // Wait for reactivity
    await wrapper.vm.$nextTick();
    
    // Check if input is cleared
    expect((input.element as HTMLInputElement).value).toBe('');
  });

  it('should not call createTodo when input is empty', async () => {
    const wrapper = mount(TodoApp);
    
    const input = wrapper.find('input[placeholder="What needs to be done?"]');
    
    // Press Enter key with empty input
    await input.trigger('keydown.enter');
    
    // Check that createTodo was not called
    expect(mockUseTodos.createTodo).not.toHaveBeenCalled();
  });

  it('should call createTodo when input has text', async () => {
    const wrapper = mount(TodoApp);
    
    const input = wrapper.find('input[placeholder="What needs to be done?"]');
    
    await input.setValue('Test todo');
    await input.trigger('keydown.enter');
    
    expect(mockUseTodos.createTodo).toHaveBeenCalled();
  });

  it('should show priority dropdown when clicked', async () => {
    const wrapper = mount(TodoApp);
    
    const priorityButton = wrapper.find('.priority-dropdown button');
    
    // Initially dropdown should not be visible
    expect(wrapper.find('.priority-dropdown .absolute').exists()).toBe(false);
    
    // Click priority button
    await priorityButton.trigger('click');
    
    // Dropdown should now be visible
    expect(wrapper.find('.priority-dropdown .absolute').exists()).toBe(true);
  });

  it('should change priority when dropdown option is selected', async () => {
    const wrapper = mount(TodoApp);
    
    const priorityButton = wrapper.find('.priority-dropdown button');
    
    // Open dropdown
    await priorityButton.trigger('click');
    
    // Click high priority option (the button with "High" text)
    const highPriorityOptions = wrapper.findAll('.priority-dropdown .absolute button');
    const highPriorityOption = highPriorityOptions.find(btn => 
      btn.text().includes('High')
    );
    await highPriorityOption!.trigger('click');
    
    // Wait for reactivity
    await wrapper.vm.$nextTick();
    
    // Check if the priority dot color changed
    const priorityDot = wrapper.find('.priority-dropdown button span');
    expect(priorityDot.classes()).toContain('bg-red-500');
  });
});
