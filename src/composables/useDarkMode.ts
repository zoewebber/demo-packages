import { ref, watch, onMounted, onUnmounted } from 'vue'

type ThemeMode = 'light' | 'dark' | 'system'

export function useDarkMode() {
  const isDark = ref(false)
  const themeMode = ref<ThemeMode>('system')

  const toggle = () => {
    if (themeMode.value === 'system') {
      // If currently in system mode, toggle to opposite of current system preference
      const systemIsDark =
        typeof window !== 'undefined' && window.matchMedia
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
          : false
      themeMode.value = systemIsDark ? 'light' : 'dark'
    } else {
      // Toggle between light and dark
      themeMode.value = themeMode.value === 'light' ? 'dark' : 'light'
    }
  }

  const setDark = (value: boolean) => {
    themeMode.value = value ? 'dark' : 'light'
  }

  const setThemeMode = (mode: ThemeMode) => {
    themeMode.value = mode
  }

  // Apply dark class to document element
  const applyTheme = (dark: boolean) => {
    if (typeof document !== 'undefined') {
      if (dark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  // Save theme mode preference to localStorage
  const saveThemeMode = (mode: ThemeMode) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('themeMode', mode)
    }
  }

  // Load theme mode preference from localStorage
  const loadThemeMode = (): ThemeMode => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('themeMode') as ThemeMode
      if (saved && ['light', 'dark', 'system'].includes(saved)) {
        return saved
      }
    }
    return 'system' // Default to system preference
  }

  // Calculate if dark mode should be active based on theme mode
  const calculateIsDark = (mode: ThemeMode): boolean => {
    if (mode === 'dark') return true
    if (mode === 'light') return false

    // System mode - check system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  }

  // Watch theme mode changes and update isDark accordingly
  watch(
    themeMode,
    (newMode) => {
      isDark.value = calculateIsDark(newMode)
      saveThemeMode(newMode)
    },
    { immediate: true },
  )

  // Watch isDark changes and apply theme
  watch(
    isDark,
    (newValue) => {
      applyTheme(newValue)
    },
    { immediate: true },
  )

  // Initialize on mount
  onMounted(() => {
    // Load saved theme mode
    themeMode.value = loadThemeMode()

    // Set up system preference listener
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        // Only update if currently in system mode
        if (themeMode.value === 'system') {
          isDark.value = e.matches
        }
      }

      mediaQuery.addEventListener('change', handleSystemThemeChange)

      // Cleanup on unmount
      onUnmounted(() => {
        mediaQuery.removeEventListener('change', handleSystemThemeChange)
      })
    }
  })

  return {
    isDark,
    themeMode,
    toggle,
    setDark,
    setThemeMode,
  }
}
