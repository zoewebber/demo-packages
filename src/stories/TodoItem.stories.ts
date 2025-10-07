import type { Meta, StoryObj } from '@storybook/vue3';
import TodoItem from '@/components/todos/TodoItem.vue';
import type { Todo } from '@/types/todo';

const meta: Meta<typeof TodoItem> = {
  title: 'Todos/TodoItem',
  component: TodoItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    todo: {
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTodo: Todo = {
  id: '1',
  text: 'Sample todo item',
  completed: false,
  priority: 'medium',
  order: 0,
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
};

export const Default: Story = {
  args: {
    todo: sampleTodo,
    index: 0,
  },
};

export const Completed: Story = {
  args: {
    todo: {
      ...sampleTodo,
      completed: true,
    },
    index: 0,
  },
};

export const HighPriority: Story = {
  args: {
    todo: {
      ...sampleTodo,
      priority: 'high',
      text: 'High priority task',
    },
    index: 0,
  },
};

export const LowPriority: Story = {
  args: {
    todo: {
      ...sampleTodo,
      priority: 'low',
      text: 'Low priority task',
    },
    index: 0,
  },
};

export const LongText: Story = {
  args: {
    todo: {
      ...sampleTodo,
      text: 'This is a very long todo item that should wrap to multiple lines and demonstrate how the component handles longer text content.',
    },
    index: 0,
  },
};
