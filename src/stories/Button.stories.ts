import type { Meta, StoryObj } from '@storybook/vue3';
import Button from '@/components/ui/Button.vue';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Secondary</Button>',
  }),
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Destructive</Button>',
  }),
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Outline</Button>',
  }),
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Ghost</Button>',
  }),
};

export const Link: Story = {
  args: {
    variant: 'link',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Link</Button>',
  }),
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Small</Button>',
  }),
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Large</Button>',
  }),
};

export const Icon: Story = {
  args: {
    size: 'icon',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">🚀</Button>',
  }),
};
