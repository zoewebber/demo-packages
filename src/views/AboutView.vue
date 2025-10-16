<template>
  <div class="about-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="float text-8xl mb-6">🦄</div>
      <h1 class="text-6xl font-bold rainbow-text mb-4" data-testid="about-title">
        About Our Magical App
      </h1>
      <p class="text-xl text-muted-foreground mb-8">
        Where productivity meets enchantment ✨
      </p>
    </div>

    <!-- Features Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      <div class="feature-card" data-testid="feature-card">
        <div class="text-4xl mb-3 sparkle">🌈</div>
        <h3 class="text-xl font-bold mb-2 text-foreground">Rainbow Design</h3>
        <p class="text-muted-foreground">
          Beautiful gradient colors that make your todos pop with joy and positivity!
        </p>
      </div>

      <div class="feature-card" data-testid="feature-card">
        <div class="text-4xl mb-3 sparkle" style="animation-delay: 0.5s">✨</div>
        <h3 class="text-xl font-bold mb-2 text-foreground">Sparkle Effects</h3>
        <p class="text-muted-foreground">
          Animated sparkles and floating elements bring magic to every interaction.
        </p>
      </div>

      <div class="feature-card" data-testid="feature-card">
        <div class="text-4xl mb-3 sparkle" style="animation-delay: 1s">🎨</div>
        <h3 class="text-xl font-bold mb-2 text-foreground">Priority Colors</h3>
        <p class="text-muted-foreground">
          Color-coded priorities with glowing effects to highlight what matters most.
        </p>
      </div>

      <div class="feature-card" data-testid="feature-card">
        <div class="text-4xl mb-3 float">🌙</div>
        <h3 class="text-xl font-bold mb-2 text-foreground">Dark Mode</h3>
        <p class="text-muted-foreground">
          Seamlessly switch between light and dark themes with magical transitions.
        </p>
      </div>

      <div class="feature-card" data-testid="feature-card">
        <div class="text-4xl mb-3 float" style="animation-delay: 1s">💫</div>
        <h3 class="text-xl font-bold mb-2 text-foreground">Smooth Animations</h3>
        <p class="text-muted-foreground">
          Every action feels delightful with buttery smooth animations and transitions.
        </p>
      </div>

      <div class="feature-card" data-testid="feature-card">
        <div class="text-4xl mb-3 float" style="animation-delay: 1.5s">🎯</div>
        <h3 class="text-xl font-bold mb-2 text-foreground">Task Management</h3>
        <p class="text-muted-foreground">
          Powerful features like drag-and-drop, search, and filters wrapped in beauty.
        </p>
      </div>
    </div>

    <!-- Tech Stack Section -->
    <div class="tech-section">
      <h2 class="text-4xl font-bold rainbow-text mb-8 text-center">
        Built with Modern Magic 🪄
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="tech-badge" data-testid="tech-badge">
          <span class="text-2xl mb-2">⚡</span>
          <p class="font-semibold">Vue 3</p>
        </div>
        <div class="tech-badge" data-testid="tech-badge">
          <span class="text-2xl mb-2">🎨</span>
          <p class="font-semibold">Tailwind CSS</p>
        </div>
        <div class="tech-badge" data-testid="tech-badge">
          <span class="text-2xl mb-2">📘</span>
          <p class="font-semibold">TypeScript</p>
        </div>
        <div class="tech-badge" data-testid="tech-badge">
          <span class="text-2xl mb-2">🚀</span>
          <p class="font-semibold">Vite</p>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="stats-section">
      <div class="stats-card">
        <div class="text-5xl font-bold rainbow-text mb-2">100%</div>
        <p class="text-muted-foreground">Magical ✨</p>
      </div>
      <div class="stats-card">
        <div class="text-5xl font-bold rainbow-text mb-2">∞</div>
        <p class="text-muted-foreground">Possibilities 🌟</p>
      </div>
      <div class="stats-card">
        <div class="text-5xl font-bold rainbow-text mb-2">1</div>
        <p class="text-muted-foreground">Unicorn 🦄</p>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="cta-section">
      <h2 class="text-3xl font-bold mb-4 text-foreground">
        Ready to make your todos magical? ✨
      </h2>
      <p class="text-lg text-muted-foreground mb-6">
        Start organizing your tasks with the power of unicorns and rainbows!
      </p>
      <RouterLink 
        to="/" 
        class="unicorn-button inline-block px-8 py-4 rounded-xl font-bold text-white text-lg shadow-2xl hover:shadow-3xl transition-all"
        data-testid="cta-button"
      >
        Get Started Now 🚀
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.about-page {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  text-align: center;
  padding: 4rem 2rem;
  margin-bottom: 3rem;
}

.feature-card {
  padding: 2rem;
  border-radius: 1rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 240, 255, 0.9) 100%);
  border: 2px solid hsl(var(--border));
  box-shadow: 0 4px 20px rgba(255, 107, 157, 0.15);
  transition: all 0.3s ease;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 40px rgba(255, 107, 157, 0.25);
  border-color: hsl(var(--primary));
}

.dark .feature-card {
  background: linear-gradient(135deg, hsl(280 45% 18%) 0%, hsl(270 40% 20%) 100%);
}

.tech-section {
  padding: 3rem 2rem;
  margin-bottom: 3rem;
}

.tech-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: white;
  border-radius: 0.75rem;
  border: 2px solid hsl(var(--border));
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.tech-badge:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 24px rgba(255, 107, 157, 0.2);
  border-color: hsl(var(--primary));
}

.dark .tech-badge {
  background: hsl(var(--card));
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding: 3rem 2rem;
  margin-bottom: 3rem;
}

.stats-card {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 1rem;
  border: 2px solid hsl(var(--border));
  box-shadow: 0 4px 20px rgba(255, 107, 157, 0.15);
  transition: all 0.3s ease;
}

.stats-card:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(255, 107, 157, 0.25);
}

.dark .stats-card {
  background: hsl(var(--card));
}

.cta-section {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 240, 255, 0.8) 100%);
  border-radius: 1.5rem;
  border: 2px solid hsl(var(--primary) / 0.3);
  box-shadow: 0 8px 32px rgba(255, 107, 157, 0.2);
  margin-bottom: 2rem;
}

.dark .cta-section {
  background: linear-gradient(135deg, hsl(280 45% 18%) 0%, hsl(270 40% 20%) 100%);
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2.5rem;
  }
  
  .hero-section p {
    font-size: 1.1rem;
  }
}
</style>
