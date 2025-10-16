import { ref, computed, watch, readonly } from 'vue';
import type { Todo, TodoFilters, TodoStats, CreateTodoData, UpdateTodoData, Priority } from '@/types/todo';
import { saveTodos, loadTodos, generateId, getCurrentTimestamp } from '@/utils/storage';

export function useTodos() {
  const todos = ref<Todo[]>([]);
  const filters = ref<TodoFilters>({
    search: '',
    priority: 'all',
    completed: 'all',
  });

  // Load todos from localStorage on initialization
  todos.value = loadTodos();

  // Save todos to localStorage whenever they change
  watch(
    todos,
    (newTodos) => {
      saveTodos(newTodos);
    },
    { deep: true }
  );

  // Computed properties
  const filteredTodos = computed(() => {
    return todos.value.filter((todo) => {
      const matchesSearch = todo.text.toLowerCase().includes(filters.value.search.toLowerCase());
      const matchesPriority = filters.value.priority === 'all' || todo.priority === filters.value.priority;
      const matchesCompleted = 
        filters.value.completed === 'all' ||
        (filters.value.completed === 'completed' && todo.completed) ||
        (filters.value.completed === 'incomplete' && !todo.completed);

      return matchesSearch && matchesPriority && matchesCompleted;
    });
  });

  const sortedTodos = computed(() => {
    return [...filteredTodos.value].sort((a, b) => {
      // First sort by completion status (incomplete first)
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      // Then by order (newer todos at the end)
      return a.order - b.order;
    });
  });

  const stats = computed((): TodoStats => {
    return {
      total: todos.value.length,
      completed: todos.value.filter(todo => todo.completed).length,
      incomplete: todos.value.filter(todo => !todo.completed).length,
      high: todos.value.filter(todo => todo.priority === 'high').length,
      medium: todos.value.filter(todo => todo.priority === 'medium').length,
      low: todos.value.filter(todo => todo.priority === 'low').length,
    };
  });

  // Actions
  function createTodo(data: CreateTodoData): Todo {
    const todo: Todo = {
      id: generateId(),
      text: data.text.trim(),
      completed: false,
      priority: data.priority,
      order: todos.value.length,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp(),
    };

    todos.value.push(todo);
    return todo;
  }

  function updateTodo(id: string, data: UpdateTodoData): Todo | null {
    const index = todos.value.findIndex(todo => todo.id === id);
    if (index === -1) {
      return null;
    }

    const todo = todos.value[index];
    if (!todo) {
      return null;
    }

    // Only update defined properties
    if (data.text !== undefined) {
      todo.text = data.text;
    }
    if (data.completed !== undefined) {
      todo.completed = data.completed;
    }
    if (data.priority !== undefined) {
      todo.priority = data.priority;
    }
    todo.updatedAt = getCurrentTimestamp();

    return todo;
  }

  function deleteTodo(id: string): boolean {
    const index = todos.value.findIndex(todo => todo.id === id);
    if (index === -1) {
      return false;
    }

    todos.value.splice(index, 1);
    
    // Reorder remaining todos
    todos.value.forEach((todo, idx) => {
      todo.order = idx;
    });

    return true;
  }

  function toggleTodo(id: string): boolean {
    const todo = todos.value.find(todo => todo.id === id);
    if (!todo) {
      return false;
    }

    todo.completed = !todo.completed;
    todo.updatedAt = getCurrentTimestamp();
    return true;
  }

  function reorderTodos(fromIndex: number, toIndex: number): void {
    const todo = todos.value.splice(fromIndex, 1)[0];
    if (todo) {
      todos.value.splice(toIndex, 0, todo);
      
      // Update order property for all todos
      todos.value.forEach((todo, index) => {
        todo.order = index;
      });
    }
  }

  function clearCompleted(): void {
    todos.value = todos.value.filter(todo => !todo.completed);
    
    // Reorder remaining todos
    todos.value.forEach((todo, index) => {
      todo.order = index;
    });
  }

  function setFilters(newFilters: Partial<TodoFilters>): void {
    filters.value = { ...filters.value, ...newFilters };
  }

  function resetFilters(): void {
    filters.value = {
      search: '',
      priority: 'all',
      completed: 'all',
    };
  }

  return {
    // State
    todos: readonly(todos),
    filters: readonly(filters),
    
    // Computed
    filteredTodos,
    sortedTodos,
    stats,
    
    // Actions
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    reorderTodos,
    clearCompleted,
    setFilters,
    resetFilters,
  };
}
