## Vue 3 TODO List Application

A modern, feature-rich TODO list application built with Vue 3, TypeScript, and Tailwind CSS. This application demonstrates best practices in Vue 3 development with comprehensive testing, component documentation, and a clean architecture.

## 🚀 Features

### Core Functionality
- ✅ Create, read, update, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Priority levels (High, Medium, Low) with visual indicators
- ✅ Search and filter functionality
- ✅ Drag & drop reordering (planned)
- ✅ Data persistence with localStorage
- ✅ Responsive design for all devices

### Technical Features
- 🎨 Custom theme with CSS variables
- 🧪 Comprehensive test coverage (80%+ target)
- 📚 Storybook documentation for all components
- 🔧 TypeScript strict mode
- ♿ Accessibility features (ARIA labels, keyboard navigation)
- ⚡ Performance optimized

## 🛠️ Tech Stack

- **Framework**: Vue 3 with Composition API
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom theme
- **Components**: Custom shadcn/vue-style components
- **Testing**: Vitest (unit tests) + Playwright (E2E tests)
- **Documentation**: Storybook
- **Storage**: localStorage only

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todolist-1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🧪 Testing

### Unit Tests (Vitest)
Run unit tests with coverage:
```bash
npm run test:unit
```

Run tests in watch mode:
```bash
npm run test:unit:watch
```

### E2E Tests (Playwright)
Run E2E tests:
```bash
npm run test:e2e
```

Run E2E tests in UI mode:
```bash
npm run test:e2e:ui
```

### Test Coverage
View coverage report:
```bash
npm run test:coverage
```

## 📚 Storybook

Start Storybook for component documentation:
```bash
npm run storybook
```

This will open Storybook at `http://localhost:6006` where you can:
- View all component stories
- Test component variations
- View component documentation
- Interact with component controls

## 🏗️ Project Structure

```
src/
├── components/          # Vue components
│   ├── ui/             # Base UI components (Button, Input, Card, etc.)
│   └── todos/          # Todo-specific components
├── composables/         # Vue composables for business logic
├── types/              # TypeScript type definitions
├── utils/              # Helper functions and utilities
├── stories/            # Storybook stories
├── tests/
│   ├── unit/           # Vitest unit tests
│   └── e2e/            # Playwright E2E tests
└── assets/             # Static assets and styles
```

## 🎨 Theming

The application uses CSS variables for theming, defined in `src/assets/main.css`. You can customize:

- **Colors**: Primary, secondary, accent, destructive, muted
- **Priority Colors**: High (red), Medium (yellow), Low (green)
- **Border Radius**: Consistent rounded corners
- **Animations**: Smooth transitions and hover effects

### Dark Mode Support
The theme includes dark mode variants. Toggle dark mode by adding the `dark` class to the root element.

## 📊 Data Structure

Todos are stored in localStorage with the following structure:

```typescript
interface Todo {
  id: string;                    // Unique identifier
  text: string;                 // Todo content
  completed: boolean;            // Completion status
  priority: 'high' | 'medium' | 'low';  // Priority level
  order: number;                 // Sort order
  createdAt: string;            // ISO timestamp
  updatedAt: string;            // ISO timestamp
}
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test:unit` | Run unit tests |
| `npm run test:unit:watch` | Run unit tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:e2e` | Run E2E tests |
| `npm run test:e2e:ui` | Run E2E tests in UI mode |
| `npm run storybook` | Start Storybook |
| `npm run build-storybook` | Build Storybook for production |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## 🧩 Components

### UI Components
- **Button**: Various variants (default, destructive, outline, secondary, ghost, link)
- **Input**: Text input with validation states
- **Card**: Container component with header and content
- **Checkbox**: Custom checkbox with label support
- **Select**: Dropdown selection component

### Todo Components
- **TodoApp**: Main application component
- **TodoItem**: Individual todo item with actions
- **TodoList**: List container with drag & drop
- **TodoFilters**: Search and filter controls
- **AddTodoDialog**: Modal for creating new todos
- **EditTodoDialog**: Modal for editing existing todos

## 🎯 Key Features Implementation

### State Management
Uses Vue 3 Composition API with the `useTodos` composable for:
- Reactive todo state
- CRUD operations
- Filtering and sorting
- Statistics calculation
- localStorage persistence

### Error Handling
- Graceful localStorage error handling
- Data validation and sanitization
- User-friendly error messages

### Performance
- Efficient reactivity with computed properties
- Optimized re-renders
- Lazy loading for large lists (planned)

### Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Storybook team for component documentation
- Vitest and Playwright teams for testing tools
- The open-source community for inspiration and support

---

**Happy coding! 🎉**
