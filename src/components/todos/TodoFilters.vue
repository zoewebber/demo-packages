<template>
  <div class="flex flex-col sm:flex-row gap-4 p-4 bg-muted/50 rounded-lg">
    <!-- Search -->
    <div class="flex-1">
      <Input
        :model-value="filters.search"
        @update:model-value="updateSearch"
        placeholder="Search todos..."
        class="w-full"
      />
    </div>

    <!-- Priority Filter -->
    <div class="flex gap-2">
      <Select :model-value="filters.priority" @update:model-value="updatePriority">
        <option value="all">All Priorities</option>
        <option value="high">High Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="low">Low Priority</option>
      </Select>
    </div>

    <!-- Status Filter -->
    <div class="flex gap-2">
      <Select :model-value="filters.completed" @update:model-value="updateCompleted">
        <option value="all">All Status</option>
        <option value="incomplete">Pending</option>
        <option value="completed">Completed</option>
      </Select>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { TodoFilters } from '@/types/todo';
import Input from '@/components/ui/Input.vue';
import Select from '@/components/ui/Select.vue';

interface Props {
  filters: TodoFilters;
}

interface Emits {
  (e: 'update-filters', filters: Partial<TodoFilters>): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function updateSearch(value: string) {
  emit('update-filters', { search: value });
}

function updatePriority(value: 'all' | 'high' | 'medium' | 'low') {
  emit('update-filters', { priority: value });
}

function updateCompleted(value: 'all' | 'completed' | 'incomplete') {
  emit('update-filters', { completed: value });
}
</script>
