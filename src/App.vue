<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import DarkModeToggle from '@/components/ui/DarkModeToggle.vue'

const route = useRoute()
</script>

<template>
  <div class="min-h-screen app-background">
    <div class="container mx-auto px-4 py-8 max-w-6xl">
      <!-- Rainbow Header with Navigation -->
      <header class="mb-8">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 rounded-2xl bg-white/80 dark:bg-card/80 backdrop-blur-sm shadow-xl border-2 border-primary/20">
          <div class="flex items-center gap-4">
            <div class="text-5xl sparkle">🦄</div>
            <div>
              <h1 class="text-4xl font-bold rainbow-text mb-1">Magical Todo App</h1>
              <p class="text-sm text-muted-foreground">Where tasks become magical ✨</p>
            </div>
          </div>
          
          <div class="flex items-center gap-4">
            <nav class="flex gap-2">
              <RouterLink 
                to="/" 
                class="px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                active-class="bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg"
                exact-active-class="bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg"
                :class="{'bg-secondary/50 text-secondary-foreground': route.path !== '/'}"
              >
                🏠 Home
              </RouterLink>
              <RouterLink 
                to="/about" 
                class="px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                active-class="bg-gradient-to-r from-cyan-400 to-blue-400 text-white shadow-lg"
                :class="{'bg-secondary/50 text-secondary-foreground': route.path !== '/about'}"
              >
                ℹ️ About
              </RouterLink>
            </nav>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main>
        <RouterView />
      </main>

      <!-- Rainbow Footer -->
      <footer class="mt-12 text-center">
        <div class="inline-block p-4 rounded-xl bg-white/60 dark:bg-card/60 backdrop-blur-sm">
          <p class="text-sm text-muted-foreground">
            Made with 💜 and ✨ <span class="rainbow-text font-bold">unicorn magic</span> 🦄
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.app-background {
  background: linear-gradient(135deg, 
    hsl(300 100% 98%) 0%, 
    hsl(280 100% 97%) 25%,
    hsl(190 100% 97%) 50%,
    hsl(330 100% 97%) 75%,
    hsl(300 100% 98%) 100%);
  background-attachment: fixed;
}

.dark .app-background {
  background: linear-gradient(135deg, 
    hsl(280 50% 12%) 0%, 
    hsl(260 50% 15%) 25%,
    hsl(240 45% 18%) 50%,
    hsl(280 45% 16%) 75%,
    hsl(280 50% 12%) 100%);
  background-attachment: fixed;
}

header {
  position: relative;
  overflow: hidden;
}

header::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 107, 157, 0.1) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
