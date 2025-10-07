<template>
  <div class="space-y-2">
    <div
      ref="todoListRef"
      class="space-y-2"
    >
      <TodoItem
        v-for="(todo, index) in todos"
        :key="todo.id"
        :todo="todo"
        :index="index"
        :isEditing="editingTodoId === todo.id"
        @toggle="$emit('toggle', $event)"
        @update="(id, data) => $emit('update', id, data)"
        @delete="$emit('delete', $event)"
        @startEdit="handleStartEdit"
        @endEdit="handleEndEdit"
      />
    </div>

    <!-- Add Todo Form - Always at the bottom -->
    <div class="todo-item">
      <!-- Drag Handle Placeholder -->
      <div class="w-4 h-4"></div>
      
      <!-- Checkbox Placeholder -->
      <div class="w-4 h-4"></div>
      
      <!-- Add Todo Input -->
      <div class="flex-1 min-w-0">
        <Input
          v-model="newTodoText"
          placeholder="What needs to be done?"
          @keydown.enter="handleAddTodo"
          class="w-full text-sm"
        />
      </div>
      
      <!-- Priority Dropdown -->
      <div class="relative priority-dropdown">
        <button
          type="button"
          @click="showPriorityDropdown = !showPriorityDropdown"
          class="flex items-center justify-center w-6 h-6 transition-colors hover:bg-gray-100 rounded"
          title="Change priority"
        >
          <span class="w-3 h-3 rounded-full" :class="getPriorityDotClass(newTodoPriority)"></span>
        </button>
        
        <!-- Dropdown Menu -->
        <div
          v-if="showPriorityDropdown"
          class="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10"
          @click.stop
        >
          <button
            type="button"
            @click="selectPriority('low')"
            class="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
          >
            <span class="w-3 h-3 bg-green-500 rounded-full"></span>
            Low
          </button>
          <button
            type="button"
            @click="selectPriority('medium')"
            class="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
          >
            <span class="w-3 h-3 bg-gray-400 rounded-full"></span>
            Medium
          </button>
          <button
            type="button"
            @click="selectPriority('high')"
            class="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
          >
            <span class="w-3 h-3 bg-red-500 rounded-full"></span>
            High
          </button>
        </div>
      </div>
      
      <!-- Actions Placeholder -->
      <div class="w-10 h-10"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { Todo, UpdateTodoData, Priority } from '@/types/todo';
import TodoItem from './TodoItem.vue';
import Input from '@/components/ui/Input.vue';

interface Props {
  todos: Todo[];
}

interface Emits {
  (e: 'reorder', fromIndex: number, toIndex: number): void;
  (e: 'toggle', id: string): void;
  (e: 'update', id: string, data: UpdateTodoData): void;
  (e: 'delete', id: string): void;
  (e: 'create', text: string, priority: Priority): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const todoListRef = ref<HTMLElement>();

// Editing state management
const editingTodoId = ref<string | null>(null);

// Add todo form state
const newTodoText = ref('');
const newTodoPriority = ref<Priority>('medium');
const showPriorityDropdown = ref(false);

function handleAddTodo() {
  if (newTodoText.value.trim()) {
    emit('create', newTodoText.value.trim(), newTodoPriority.value);
    
    // Reset form
    newTodoText.value = '';
    newTodoPriority.value = 'medium';
    showPriorityDropdown.value = false;
  }
}

function handleStartEdit(todoId: string) {
  editingTodoId.value = todoId;
}

function handleEndEdit(todoId: string) {
  if (editingTodoId.value === todoId) {
    editingTodoId.value = null;
  }
}

function selectPriority(priority: Priority) {
  newTodoPriority.value = priority;
  showPriorityDropdown.value = false;
}

function getPriorityDotClass(priority: Priority): string {
  switch (priority) {
    case 'high': return 'bg-red-500';
    case 'medium': return 'bg-gray-400';
    case 'low': return 'bg-green-500';
    default: return 'bg-gray-400';
  }
}

// Click outside handler
function handleClickOutside(event: Event) {
  const target = event.target as HTMLElement;
  if (!target.closest('.priority-dropdown')) {
    showPriorityDropdown.value = false;
  }
}

onMounted(() => {
  // Initialize drag and drop functionality
  if (todoListRef.value) {
    // This will be implemented with SortableJS
    // For now, we'll add basic drag and drop later
  }
  
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  // Cleanup drag and drop
  document.removeEventListener('click', handleClickOutside);
});
</script>
