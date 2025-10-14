<template>
  <div class="space-y-4">
    <!-- Header with Clear Completed Button -->
    <div class="flex items-center justify-end">
      <Button v-if="stats.completed > 0" variant="outline" size="sm" @click="clearCompleted">
        Clear Completed ({{ stats.completed }})
      </Button>
    </div>

    <!-- Clickable Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div
        class="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        @click="setFilter('all', 'all')"
      >
        <Card>
          <CardContent class="p-4 text-center">
            <div class="text-2xl font-bold">{{ stats.total }}</div>
            <p class="text-xs text-muted-foreground">Total</p>
          </CardContent>
        </Card>
      </div>
      <div
        class="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        @click="setFilter('incomplete', 'all')"
      >
        <Card>
          <CardContent class="p-4 text-center">
            <div class="text-2xl font-bold text-green-600 dark:text-green-400">
              {{ stats.incomplete }}
            </div>
            <p class="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
      </div>
      <div
        class="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        @click="setFilter('completed', 'all')"
      >
        <Card>
          <CardContent class="p-4 text-center">
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {{ stats.completed }}
            </div>
            <p class="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>
      <div
        class="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        @click="setFilter('all', 'high')"
      >
        <Card>
          <CardContent class="p-4 text-center">
            <div class="text-2xl font-bold text-red-600 dark:text-red-400">{{ stats.high }}</div>
            <p class="text-xs text-muted-foreground">High Priority</p>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Filters -->
    <TodoFilters :filters="filters" @update-filters="setFilters" />

    <!-- Todo List -->
    <div>
      <TodoList
        :todos="sortedTodos"
        @reorder="reorderTodos"
        @toggle="toggleTodo"
        @update="updateTodo"
        @delete="deleteTodo"
        @create="handleCreateTodo"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTodos } from '@/composables/useTodos'
import type { Priority } from '@/types/todo'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import CardContent from '@/components/ui/CardContent.vue'
import TodoFilters from '@/components/todos/TodoFilters.vue'
import TodoList from '@/components/todos/TodoList.vue'

const {
  sortedTodos,
  stats,
  filters,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  reorderTodos,
  clearCompleted,
  setFilters,
} = useTodos()

function handleCreateTodo(text: string, priority: Priority) {
  createTodo({
    text,
    priority,
  })
}

function setFilter(
  completed: 'all' | 'completed' | 'incomplete',
  priority: 'all' | 'high' | 'medium' | 'low',
) {
  setFilters({
    completed,
    priority,
  })
}
</script>
