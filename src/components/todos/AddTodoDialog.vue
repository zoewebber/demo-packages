<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    @click="handleBackdropClick"
  >
    <div
      class="bg-background rounded-lg shadow-lg p-6 w-full max-w-md mx-4"
      @click.stop
    >
      <h2 class="text-lg font-semibold mb-4">Add New Todo</h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="text" class="block text-sm font-medium mb-2">
            Todo Text
          </label>
          <Input
            id="text"
            v-model="form.text"
            placeholder="Enter your todo..."
            required
          />
        </div>

        <div>
          <label for="priority" class="block text-sm font-medium mb-2">
            Priority
          </label>
          <Select v-model="form.priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </div>

        <div class="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            @click="$emit('update:open', false)"
          >
            Cancel
          </Button>
          <Button type="submit">
            Add Todo
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { CreateTodoData } from '@/types/todo';
import Input from '@/components/ui/Input.vue';
import Select from '@/components/ui/Select.vue';
import Button from '@/components/ui/Button.vue';

interface Props {
  open: boolean;
}

interface Emits {
  (e: 'update:open', value: boolean): void;
  (e: 'add', data: CreateTodoData): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const form = ref<CreateTodoData>({
  text: '',
  priority: 'medium',
});

watch(() => props.open, (newValue) => {
  if (newValue) {
    form.value = {
      text: '',
      priority: 'medium',
    };
  }
});

function handleSubmit() {
  if (form.value.text.trim()) {
    emit('add', { ...form.value });
    emit('update:open', false);
  }
}

function handleBackdropClick() {
  emit('update:open', false);
}
</script>
