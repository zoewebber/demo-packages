import type { Meta, StoryObj } from '@storybook/vue3';
import Card from '@/components/ui/Card.vue';
import CardHeader from '@/components/ui/CardHeader.vue';
import CardContent from '@/components/ui/CardContent.vue';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Card, CardHeader, CardContent },
    template: `
      <Card>
        <CardHeader>
          <h3 class="text-lg font-semibold">Card Title</h3>
        </CardHeader>
        <CardContent>
          <p>This is the card content. It can contain any text or components.</p>
        </CardContent>
      </Card>
    `,
  }),
};

export const WithActions: Story = {
  render: () => ({
    components: { Card, CardHeader, CardContent },
    template: `
      <Card>
        <CardHeader>
          <h3 class="text-lg font-semibold">Card with Actions</h3>
        </CardHeader>
        <CardContent>
          <p>This card has action buttons below.</p>
          <div class="flex gap-2 mt-4">
            <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Primary Action
            </button>
            <button class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
              Secondary Action
            </button>
          </div>
        </CardContent>
      </Card>
    `,
  }),
};
