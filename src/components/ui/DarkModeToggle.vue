<template>
  <button
    @click="toggleDarkMode"
    class="p-2 rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
    :title="getToggleTitle()"
    data-testid="dark-mode-toggle"
  >
    <!-- Sun Icon (Light Mode) -->
    <SunIcon v-if="themeMode === 'light'" class="h-4 w-4" />
    <!-- Moon Icon (Dark Mode) -->
    <MoonIcon v-else-if="themeMode === 'dark'" class="h-4 w-4" />
    <!-- Computer/System Icon (System Mode) -->
    <ComputerDesktopIcon v-else class="h-4 w-4" />
  </button>
</template>

<script setup lang="ts">
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/vue/24/outline'
import { useDarkMode } from '@/composables/useDarkMode'

const { isDark, themeMode, toggle } = useDarkMode()

function toggleDarkMode() {
  toggle()
}

function getToggleTitle(): string {
  switch (themeMode.value) {
    case 'light':
      return 'Switch to dark mode'
    case 'dark':
      return 'Switch to system mode'
    case 'system':
      return `System mode (currently ${isDark.value ? 'dark' : 'light'}). Click to switch to light mode`
    default:
      return 'Toggle theme'
  }
}
</script>
