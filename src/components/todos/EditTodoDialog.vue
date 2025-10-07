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
      <h2 class="text-lg font-semibold mb-4">Edit Todo</h2>
      
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

        <div>
          <Checkbox
            v-model:checked="form.completed"
            label="Completed"
          />
        </div>

        <div class="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            @click="$emit('update:open', false)"
          >
            Cancel
          </Button>
          <Button type="submit" data-testid="save-button">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Todo, UpdateTodoData } from '@/types/todo';
import Input from '@/components/ui/Input.vue';
import Select from '@/components/ui/Select.vue';
import Button from '@/components/ui/Button.vue';
import Checkbox from '@/components/ui/Checkbox.vue';

interface Props {
  open: boolean;
  todo: Todo;
}

interface Emits {
  (e: 'update:open', value: boolean): void;
  (e: 'update', id: string, data: UpdateTodoData): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const form = ref<UpdateTodoData>({
  text: '',
  priority: 'medium',
  completed: false,
});

watch(() => props.todo, (newTodo) => {
  if (newTodo) {
    form.value = {
      text: newTodo.text,
      priority: newTodo.priority,
      completed: newTodo.completed,
    };
  }
}, { immediate: true });

function handleSubmit() {
  if (form.value.text?.trim()) {
    emit('update', props.todo.id, { ...form.value });
    emit('update:open', false);
  }
}

function handleBackdropClick() {
  emit('update:open', false);
}
</script>
