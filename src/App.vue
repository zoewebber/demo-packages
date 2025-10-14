<script setup lang="ts">
import TodoApp from '@/components/todos/TodoApp.vue'
import DarkModeToggle from '@/components/ui/DarkModeToggle.vue'
</script>

<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- Header with Dark Mode Toggle -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-foreground">Todo App</h1>
        <DarkModeToggle />
      </div>

      <TodoApp />
    </div>
  </div>
</template>
