import type { Meta, StoryObj } from '@storybook/vue3'
import DarkModeToggle from '@/components/ui/DarkModeToggle.vue'

const meta = {
  title: 'Components/DarkModeToggle',
  component: DarkModeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DarkModeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const InHeader: Story = {
  args: {},
  render: () => ({
    components: { DarkModeToggle },
    template: `
      <div class="flex justify-between items-center p-4 border border-border rounded-lg bg-background">
        <h1 class="text-xl font-bold">Todo App</h1>
        <DarkModeToggle />
      </div>
    `,
  }),
}

export const ThreeModeDemo: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates the three-mode theme system:
- **Light Mode**: Sun icon - forces light theme
- **Dark Mode**: Moon icon - forces dark theme  
- **System Mode**: Computer icon - follows OS preference automatically

Click the toggle button to cycle through: Light → Dark → System → Light...
When in System mode, try changing your OS dark mode setting to see real-time updates!
        `,
      },
    },
  },
  render: () => ({
    components: { DarkModeToggle },
    template: `
      <div class="space-y-6">
        <div class="p-4 border border-border rounded-lg bg-card">
          <h2 class="text-lg font-semibold mb-2">Three-Mode Theme System</h2>
          <p class="text-muted-foreground mb-4">
            Click the toggle to cycle through Light → Dark → System modes.
            The icon changes to show the current mode.
          </p>
          <div class="flex items-center justify-between">
            <div class="space-y-1">
              <div class="text-sm font-medium">Theme Controls:</div>
              <div class="text-xs text-muted-foreground">
                ☀️ Light • 🌙 Dark • 💻 System
              </div>
            </div>
            <DarkModeToggle />
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 bg-primary text-primary-foreground rounded-lg">
            <h3 class="font-medium">Primary</h3>
            <p class="text-sm opacity-90">Primary color showcase</p>
          </div>
          <div class="p-4 bg-secondary text-secondary-foreground rounded-lg">
            <h3 class="font-medium">Secondary</h3>
            <p class="text-sm opacity-90">Secondary color showcase</p>
          </div>
          <div class="p-4 bg-accent text-accent-foreground rounded-lg">
            <h3 class="font-medium">Accent</h3>
            <p class="text-sm opacity-90">Accent color showcase</p>
          </div>
        </div>

        <div class="p-4 border border-dashed border-border rounded-lg bg-muted/50">
          <h3 class="font-medium mb-2">💡 Pro Tip</h3>
          <p class="text-sm text-muted-foreground">
            System mode automatically respects your OS preference and updates in real-time 
            when you change your system's dark mode setting. Perfect for users who want 
            the app to match their system theme!
          </p>
        </div>
      </div>
    `,
  }),
}
