# Schedule Tracker - Developer Guide

A professional React-based schedule tracker application built with best practices for production-ready code.

## 📋 Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Features](#features)
- [Architecture](#architecture)
- [File Descriptions](#file-descriptions)
- [Next Steps for Professional Development](#next-steps)

## 📁 Project Structure

```
schedule-tracker/
├── src/
│   ├── components/          # React components
│   │   ├── AddTaskForm.js   # Form for creating tasks
│   │   ├── ErrorBoundary.js # Error handling component
│   │   ├── Header.js        # Header with date and stats
│   │   ├── TaskItem.js      # Individual task display
│   │   ├── TaskList.js      # List of tasks
│   │   └── TimeStats.js     # Time statistics display
│   ├── constants/           # Application constants
│   │   └── categories.js    # Task categories configuration
│   ├── hooks/               # Custom React hooks
│   │   ├── useTasks.js      # Task state management
│   │   └── useForm.js       # Form state management
│   ├── utils/               # Utility functions
│   │   ├── timeUtils.js     # Time conversion utilities
│   │   ├── validation.js    # Form validation
│   │   └── localStorage.js  # Local storage operations
│   ├── App.css              # Global styles
│   ├── App.js               # Main application component
│   ├── index.js             # React entry point
│   └── index.css            # Global CSS
├── public/                  # Static files
├── package.json             # Dependencies
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Navigate to project
cd schedule-tracker

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## ✨ Features

### Current Features
- ✅ Create, read, update, and delete tasks
- ✅ Task categorization (DSA, Aptitude, Web Dev, etc.)
- ✅ Time tracking (start and end times)
- ✅ Task completion tracking
- ✅ Daily statistics dashboard
- ✅ Time spent calculations by category
- ✅ Local storage persistence
- ✅ Responsive design
- ✅ Form validation
- ✅ Error boundaries
- ✅ Toast notifications

## 🏗️ Architecture

### Component Structure

```
App (Main Container)
├── ErrorBoundary (Error Handling)
├── Header (Title + Date + Stats)
├── MainContent
│   ├── Sidebar
│   │   ├── AddTaskForm
│   │   └── TimeStats
│   └── TaskSection
│       └── TaskList
│           ├── TaskItem
│           ├── TaskItem
│           └── TaskItem
└── ToastContainer (Notifications)
```

### State Management Flow

```
useTasks Hook
├── tasks (state)
├── loading (state)
├── error (state)
└── Methods:
    ├── addTask()
    ├── updateTask()
    ├── deleteTask()
    ├── toggleTaskCompletion()
    ├── getTasksByDate()
    └── clearAllTasks()
```

## 📄 File Descriptions

### Components

#### `AddTaskForm.js`
**Purpose**: Form for creating new tasks

**Key Props**:
- `onAddTask` (function): Callback when task is added

**Features**:
- Form validation
- Time period toggle (AM/PM)
- Error display
- Loading state

#### `TaskItem.js`
**Purpose**: Display individual task with actions

**Key Props**:
- `task` (object): Task data
- `onToggleComplete` (function): Mark task complete/incomplete
- `onDeleteTask` (function): Delete task

**Features**:
- Task completion toggle
- Duration calculation
- Delete with confirmation
- Responsive layout

#### `TaskList.js`
**Purpose**: Display all tasks for a day

**Key Props**:
- `tasks` (array): Array of task objects
- `onToggleComplete` (function): Toggle completion
- `onDeleteTask` (function): Delete task

**Features**:
- Task sorting by time
- Empty state message
- Task counter

#### `Header.js`
**Purpose**: Display app title, date picker, and statistics

**Key Props**:
- `currentDate` (string): Current selected date
- `setCurrentDate` (function): Update date
- `totalTasks` (number): Total tasks for day
- `completedTasks` (number): Completed tasks count

**Features**:
- Date picker
- Progress percentage
- Daily statistics

#### `TimeStats.js`
**Purpose**: Show time spent by category

**Key Props**:
- `tasks` (array): Array of completed tasks

**Features**:
- Category breakdown
- Total hours display
- Color-coded statistics

#### `ErrorBoundary.js`
**Purpose**: Catch and handle React errors gracefully

**Features**:
- Error logging
- User-friendly error message
- Development error details
- Recovery buttons

### Hooks

#### `useTasks.js`
**Purpose**: Custom hook for task state management

**Returns**:
```javascript
{
  tasks: Array,           // All tasks
  loading: Boolean,       // Loading state
  error: String|null,     // Error message
  addTask: Function,      // Add new task
  updateTask: Function,   // Update task
  deleteTask: Function,   // Delete task
  toggleTaskCompletion: Function, // Toggle completion
  clearAllTasks: Function,        // Clear all
  getTasksByDate: Function        // Get tasks for date
}
```

#### `useForm.js`
**Purpose**: Custom hook for form state and validation

**Returns**:
```javascript
{
  formData: Object,       // Form state
  errors: Object,         // Validation errors
  isSubmitting: Boolean,  // Submission state
  handleChange: Function, // Input change handler
  handleSubmit: Function, // Form submission handler
  updateFormData: Function, // Programmatic update
  resetForm: Function     // Reset form
}
```

### Utilities

#### `timeUtils.js`
**Functions**:
- `convertTo24Hour()`: Convert 12-hour to 24-hour format
- `convertTo12Hour()`: Convert 24-hour to 12-hour format
- `calculateDuration()`: Calculate hours between times
- `formatDuration()`: Format hours to readable format
- `isValidTimeRange()`: Validate time range

#### `validation.js`
**Functions**:
- `validateTaskForm()`: Validate task form data
- `sanitizeInput()`: Prevent XSS attacks

#### `localStorage.js`
**Functions**:
- `saveTasks()`: Save tasks to localStorage
- `loadTasks()`: Load tasks from localStorage
- `clearTasks()`: Clear all tasks
- `exportTasksAsJSON()`: Export tasks as JSON file
- `isLocalStorageAvailable()`: Check localStorage availability

### Constants

#### `categories.js`
**Exports**:
- `CATEGORIES`: Array of category objects with colors
- `getCategoryStyle()`: Get colors for category
- `getCategoryNames()`: Get array of category names

## 🔄 Data Flow

### Adding a Task

```
AddTaskForm.handleSubmit()
    ↓
validateTaskForm()
    ↓
convertTo24Hour() [time conversion]
    ↓
useForm.handleSubmit()
    ↓
App.handleAddTask()
    ↓
useTasks.addTask()
    ↓
saveTasks() [localStorage]
    ↓
toast notification
```

### Displaying Tasks

```
App loads
    ↓
useTasks.loadTasks() [from localStorage]
    ↓
getTasksByDate() [filter by date]
    ↓
TaskList renders sorted tasks
    ↓
TaskItem renders each task
```

## 🎓 Learning Points

### 1. **Custom Hooks**
- How to create reusable logic with hooks
- useState and useEffect patterns
- localStorage integration

### 2. **Form Validation**
- Client-side validation
- Error handling and display
- Form state management

### 3. **Error Handling**
- React Error Boundaries
- Try-catch blocks
- User-friendly error messages

### 4. **Component Architecture**
- Separation of concerns
- PropTypes validation
- Reusable components

### 5. **State Management**
- Local component state
- Custom hooks for complex logic
- localStorage persistence

### 6. **Best Practices**
- JSDoc comments
- Meaningful naming
- Error boundaries
- Loading states
- Responsive design

## 🚀 Next Steps for Professional Development

### Phase 1: Code Quality (Week 1)
```bash
# Install testing libraries
npm install --save-dev @testing-library/react @testing-library/jest-dom jest

# Add ESLint
npm install --save-dev eslint eslint-config-react-app

# Add Prettier
npm install --save-dev prettier
```

**Tasks**:
1. Write unit tests for components
2. Write integration tests for workflows
3. Set up ESLint and Prettier
4. Create pre-commit hooks with husky

### Phase 2: TypeScript (Week 2)
```bash
# Add TypeScript
npm install --save-dev typescript @types/react @types/node
```

**Tasks**:
1. Create `tsconfig.json`
2. Rename `.js` files to `.tsx`
3. Add type definitions for all components
4. Create utility types

### Phase 3: Authentication (Week 3)
```bash
# Install Firebase
npm install firebase

# Or use Auth0
npm install @auth0/auth0-react
```

**Tasks**:
1. Implement user registration
2. Implement login/logout
3. Protect routes
4. Store user ID with tasks

### Phase 4: Backend Integration (Week 4)
```bash
# Install Firebase
npm install firebase

# Or Supabase
npm install @supabase/supabase-js
```

**Tasks**:
1. Move localStorage to cloud
2. Implement real-time sync
3. Handle offline mode
4. Implement backup/restore

### Phase 5: Deployment (Week 5)
```bash
# Install deployment tools
npm install -g vercel

# Or use Netlify
npm install -g netlify-cli
```

**Tasks**:
1. Create `.env.production`
2. Optimize build
3. Deploy to Vercel/Netlify
4. Set up CI/CD with GitHub Actions

## 📚 Resources

- [React Documentation](https://react.dev)
- [React Hooks Guide](https://react.dev/reference/react/hooks)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Lucide Icons](https://lucide.dev)

## 🤝 Contributing

This is a learning project. Feel free to:
- Add new features
- Improve styling
- Optimize performance
- Write tests
- Add documentation

## 📝 License

MIT - Feel free to use for learning

---

**Last Updated**: December 19, 2025
**Status**: MVP with professional code quality
