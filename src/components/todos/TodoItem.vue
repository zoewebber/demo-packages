<template>
  <div
    data-testid="todo-item"
    :class="['todo-item group', `priority-${todo.priority}`, { completed: todo.completed }]"
  >
    <!-- Drag Handle -->
    <div class="drag-handle cursor-grab active:cursor-grabbing">
      <Bars3Icon class="h-4 w-4" />
    </div>

    <!-- Checkbox -->
    <Checkbox :checked="todo.completed" @update:checked="handleToggle" />

    <!-- Todo Content -->
    <div class="flex-1 min-w-0">
      <!-- Edit Mode -->
      <div v-if="props.isEditing">
        <Input
          v-model="editText"
          class="w-full text-sm"
          @keydown.enter="saveEdit"
          @keydown.escape="cancelEdit"
          @blur="saveEdit"
          ref="editInput"
        />
      </div>

      <!-- Display Mode -->
      <div v-else>
        <div
          :class="[
            'text-sm font-medium cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-1 rounded',
            todo.completed ? 'line-through text-muted-foreground' : '',
          ]"
          @click="startEdit"
        >
          {{ todo.text }}
        </div>
      </div>
    </div>

    <!-- Priority Dot -->
    <div class="relative priority-dropdown">
      <button
        @click="showPriorityDropdown = !showPriorityDropdown"
        class="flex items-center justify-center w-6 h-6 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
        title="Change priority"
      >
        <span class="w-3 h-3 rounded-full" :class="getPriorityDotClass(todo.priority)"></span>
      </button>

      <!-- Priority Dropdown -->
      <div
        v-if="showPriorityDropdown"
        class="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10"
        @click.stop
      >
        <button
          @click="updatePriority('low')"
          class="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white flex items-center gap-2"
        >
          <span class="w-3 h-3 bg-green-500 rounded-full"></span>
          Low
        </button>
        <button
          @click="updatePriority('medium')"
          class="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white flex items-center gap-2"
        >
          <span class="w-3 h-3 bg-gray-400 rounded-full"></span>
          Medium
        </button>
        <button
          @click="updatePriority('high')"
          class="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white flex items-center gap-2"
        >
          <span class="w-3 h-3 bg-red-500 rounded-full"></span>
          High
        </button>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <Button
        variant="ghost"
        size="icon"
        @click="handleDelete"
        data-testid="delete-button"
        title="Delete"
      >
        <TrashIcon class="h-4 w-4" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { Bars3Icon, TrashIcon } from '@heroicons/vue/24/outline'
import type { Todo, UpdateTodoData } from '@/types/todo'
import Checkbox from '@/components/ui/Checkbox.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'

interface Props {
  todo: Todo
  index: number
  isEditing?: boolean
}

interface Emits {
  (e: 'toggle', id: string): void
  (e: 'update', id: string, data: UpdateTodoData): void
  (e: 'delete', id: string): void
  (e: 'startEdit', id: string): void
  (e: 'endEdit', id: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const showPriorityDropdown = ref(false)
const editText = ref('')
const editInput = ref<HTMLInputElement>()

// Watch for external editing state changes
watch(
  () => props.isEditing,
  async (newValue) => {
    if (newValue) {
      editText.value = props.todo.text
      // Wait for Vue to update the DOM, then focus
      await nextTick()
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (editInput.value) {
            editInput.value.focus()
          }
        }, 100)
      })
    }
  },
)

function handleToggle(checked: boolean) {
  emit('toggle', props.todo.id)
}

function handleDelete() {
  emit('delete', props.todo.id)
}

function updatePriority(priority: 'high' | 'medium' | 'low') {
  emit('update', props.todo.id, { priority })
  showPriorityDropdown.value = false
}

function getPriorityDotClass(priority: 'high' | 'medium' | 'low'): string {
  switch (priority) {
    case 'high':
      return 'bg-red-500'
    case 'medium':
      return 'bg-gray-400'
    case 'low':
      return 'bg-green-500'
    default:
      return 'bg-gray-400'
  }
}

function startEdit() {
  emit('startEdit', props.todo.id)
}

function saveEdit() {
  const trimmedText = editText.value.trim()

  // If text is empty, revert to original text
  if (!trimmedText) {
    editText.value = props.todo.text
    emit('endEdit', props.todo.id)
    return
  }

  // If text changed, update the todo
  if (trimmedText !== props.todo.text) {
    emit('update', props.todo.id, { text: trimmedText })
  }

  emit('endEdit', props.todo.id)
}

function cancelEdit() {
  editText.value = props.todo.text
  emit('endEdit', props.todo.id)
}

function getPriorityClass(priority: string) {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

// Click outside handler
function handleClickOutside(event: Event) {
  const target = event.target as HTMLElement
  if (!target.closest('.priority-dropdown')) {
    showPriorityDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
