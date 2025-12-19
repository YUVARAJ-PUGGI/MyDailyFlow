# File Organization & Directory Structure Guide

## 📁 Complete File Structure Explanation

```
schedule-tracker/
│
├── node_modules/              # Dependencies (auto-generated)
│
├── public/                     # Static files served by web server
│   ├── index.html             # Main HTML entry point
│   ├── manifest.json          # PWA manifest
│   └── robots.txt             # SEO robots file
│
├── src/                        # Source code (where we develop)
│   │
│   ├── components/             # React components (UI building blocks)
│   │   ├── AddTaskForm.js      # Form to create new tasks
│   │   │                       # - Uses useForm hook
│   │   │                       # - Validates input
│   │   │                       # - Shows errors
│   │   │                       # - Calls onAddTask when submitted
│   │   │
│   │   ├── ErrorBoundary.js    # Catches and displays errors
│   │   │                       # - Wraps entire app
│   │   │                       # - Shows friendly error page
│   │   │                       # - Displays dev details
│   │   │
│   │   ├── Header.js           # Top section with title and stats
│   │   │                       # - Shows current date
│   │   │                       # - Date picker
│   │   │                       # - Daily statistics
│   │   │
│   │   ├── TaskItem.js         # Single task display
│   │   │                       # - Shows task details
│   │   │                       # - Mark complete button
│   │   │                       # - Delete button
│   │   │                       # - Shows duration
│   │   │
│   │   ├── TaskList.js         # List of all tasks
│   │   │                       # - Renders TaskItem for each task
│   │   │                       # - Sorts tasks by time
│   │   │                       # - Shows empty state
│   │   │
│   │   └── TimeStats.js        # Statistics card
│   │                           # - Shows time by category
│   │                           # - Total hours display
│   │
│   ├── constants/              # Fixed configuration values
│   │   └── categories.js       # Task categories definitions
│   │                           # - CATEGORIES array
│   │                           # - Color mappings
│   │                           # - Helper functions
│   │
│   ├── hooks/                  # Custom React hooks (reusable logic)
│   │   ├── useTasks.js         # Task state management
│   │   │                       # - Manages tasks array
│   │   │                       # - Handles localStorage
│   │   │                       # - Provides CRUD methods
│   │   │                       # - Handles loading/errors
│   │   │
│   │   └── useForm.js          # Form state management
│   │                           # - Manages form state
│   │                           # - Handles validation
│   │                           # - Provides input handlers
│   │
│   ├── utils/                  # Utility functions (pure functions)
│   │   ├── timeUtils.js        # Time conversion functions
│   │   │                       # - convertTo24Hour()
│   │   │                       # - convertTo12Hour()
│   │   │                       # - calculateDuration()
│   │   │                       # - formatDuration()
│   │   │                       # - isValidTimeRange()
│   │   │
│   │   ├── validation.js       # Form validation functions
│   │   │                       # - validateTaskForm()
│   │   │                       # - sanitizeInput()
│   │   │
│   │   └── localStorage.js     # Browser storage functions
│   │                           # - saveTasks()
│   │                           # - loadTasks()
│   │                           # - clearTasks()
│   │                           # - exportTasksAsJSON()
│   │
│   ├── App.js                  # Main application component
│   │                           # - Root component
│   │                           # - Wraps with ErrorBoundary
│   │                           # - Manages main layout
│   │                           # - Coordinates state
│   │
│   ├── App.css                 # Global styles
│   │                           # - CSS classes for all components
│   │                           # - Responsive design
│   │                           # - Color schemes
│   │
│   ├── index.js                # React app entry point
│   │                           # - Renders App to DOM
│   │
│   ├── index.css               # Global CSS imports
│   │
│   ├── setupTests.js           # Test configuration
│   │
│   └── reportWebVitals.js      # Performance metrics
│
├── DEVELOPER_GUIDE.md          # Complete development documentation
│                               # - Architecture overview
│                               # - File descriptions
│                               # - How to extend
│
├── STEP_BY_STEP_GUIDE.md       # This step implementation guide
│                               # - What we built
│                               # - How it works
│                               # - Key concepts
│
├── package.json                # Project metadata & dependencies
│
├── .gitignore                  # Files to ignore in git
│
└── README.md                   # User-facing documentation
```

---

## 🎯 File Categories & Their Purpose

### 1. **Components** (`src/components/`)
**Purpose**: React UI components (visual elements)

**When to edit**:
- Changing how something looks
- Adding new UI elements
- Fixing rendering bugs
- Changing component layout

**Do NOT edit for**:
- Business logic (use hooks instead)
- Data persistence (use utils)
- Calculations (use utils)

### 2. **Hooks** (`src/hooks/`)
**Purpose**: Reusable logic across components

**When to edit**:
- Adding new state-related features
- Changing how data is managed
- Modifying form behavior
- Adding new CRUD operations

**Structure**:
```javascript
// Custom hooks always:
// 1. Start with "use"
// 2. Use React hooks internally
// 3. Return an object with functions/state
// 4. Can be used in multiple components

const useMyHook = () => {
  const [state, setState] = useState(initialValue);
  
  const method = () => { /* logic */ };
  
  return { state, method };
};
```

### 3. **Utils** (`src/utils/`)
**Purpose**: Pure functions (no state, predictable output)

**When to edit**:
- Adding new calculation functions
- Adding new validation rules
- Adding new data transformations
- Fixing bugs in calculations

**Example**:
```javascript
// Pure function: same input = same output
export const convertTo24Hour = (time12, period) => {
  // No side effects
  // No state
  // Predictable
  return time24;
};
```

### 4. **Constants** (`src/constants/`)
**Purpose**: Configuration and fixed values

**When to edit**:
- Adding new categories
- Changing color schemes
- Adding new fixed options
- Updating configuration

**Never put here**:
- User data
- State values
- Functions with side effects

### 5. **App.js**
**Purpose**: Main component that ties everything together

**Responsibilities**:
- Initializes app
- Wraps with ErrorBoundary
- Manages main state via hooks
- Passes props to children
- Coordinates component communication

---

## 🔄 Data Flow Through Files

### Scenario: User adds a task

```
1. User Types in Form
   ↓ (component/AddTaskForm.js)
   
2. User Clicks Submit
   ↓ (calls handleSubmit)
   
3. Form Validates Input
   ↓ (uses validation.js)
   ↓ validateTaskForm() checks all fields
   
4. If Valid, Convert Times
   ↓ (uses timeUtils.js)
   ↓ convertTo24Hour() changes format
   
5. Submit Handler Runs
   ↓ (calls onAddTask prop)
   
6. App.js Receives Call
   ↓ (handleAddTask function)
   ↓ Calls addTask from useTasks hook
   
7. useTasks Hook Processes
   ↓ (hooks/useTasks.js)
   ↓ Adds task with ID, timestamp
   
8. localStorage Saves
   ↓ (utils/localStorage.js)
   ↓ saveTasks() writes to browser
   
9. State Updates
   ↓ (React re-renders)
   
10. Components Re-render
    ↓ (Header, TaskList, TimeStats, etc.)
    
11. User Sees Toast
    ↓ (react-toastify)
    ↓ "Task added successfully!"
```

---

## 📝 How to Navigate the Codebase

### Finding Something Specific

#### "How to display tasks"
1. Start: `src/components/TaskList.js` (displays list)
2. See: `src/components/TaskItem.js` (each item)
3. Get data from: `src/App.js` (main state)

#### "How to validate form"
1. Start: `src/components/AddTaskForm.js` (form)
2. Uses: `src/hooks/useForm.js` (form logic)
3. Calls: `src/utils/validation.js` (validation rules)

#### "How to convert times"
1. Start: `src/components/AddTaskForm.js` (needs conversion)
2. Calls: `src/utils/timeUtils.js` (does conversion)

#### "How to save data"
1. Start: `src/hooks/useTasks.js` (manages state)
2. Calls: `src/utils/localStorage.js` (saves)

#### "How to handle errors"
1. Start: `src/components/ErrorBoundary.js` (catches)
2. Or: try-catch in any file

---

## ✅ File Editing Checklist

When editing a file, ask yourself:

- [ ] Is this the right file type?
  - UI change → `components/`
  - Logic change → `hooks/` or `utils/`
  - Config change → `constants/`

- [ ] Did I add PropTypes?
  - All components should have PropTypes

- [ ] Did I add comments?
  - Complex logic should have JSDoc

- [ ] Did I add error handling?
  - Async operations need try-catch
  - API calls need error states

- [ ] Did I update related files?
  - Change validation? Update error messages too
  - Add category? Update constants AND components

- [ ] Is it reusable?
  - Generic logic? Put in utils/hooks
  - Specific logic? Keep in components

---

## 🚀 Adding a New Feature: Step By Step

### Example: "Add task priority (Low/Medium/High)"

#### Step 1: Add constant
```javascript
// src/constants/categories.js
export const TASK_PRIORITIES = ['Low', 'Medium', 'High'];
```

#### Step 2: Update form hook
```javascript
// In useForm initialState
const initialFormState = {
  title: '',
  category: 'DSA',
  priority: 'Medium',  // ← NEW
  startTime: '',
  endTime: '',
  startPeriod: 'AM',
  endPeriod: 'AM'
};
```

#### Step 3: Update form component
```javascript
// src/components/AddTaskForm.js
import { TASK_PRIORITIES } from '../constants/categories';

// Add field to JSX
<div className="form-group">
  <label className="form-label">Priority</label>
  <select name="priority" value={formData.priority} onChange={handleChange}>
    {TASK_PRIORITIES.map(p => (
      <option key={p}>{p}</option>
    ))}
  </select>
</div>
```

#### Step 4: Display in task
```javascript
// src/components/TaskItem.js
<span style={{ color: getPriorityColor(task.priority) }}>
  {task.priority}
</span>
```

#### Step 5: Add utility if needed
```javascript
// src/utils/timeUtils.js (if you need calculations)
export const getPriorityColor = (priority) => {
  const colors = {
    'Low': '#10b981',
    'Medium': '#f59e0b',
    'High': '#dc2626'
  };
  return colors[priority] || '#9ca3af';
};
```

**Done!** Feature is added!

---

## 🧭 Quick Navigation Guide

### I want to...

| Task | Go to |
|------|-------|
| Change how a button looks | `components/` → relevant file |
| Add a new input field | `components/AddTaskForm.js` |
| Change validation rules | `utils/validation.js` |
| Add a new category | `constants/categories.js` |
| Change time calculation | `utils/timeUtils.js` |
| Save data differently | `utils/localStorage.js` |
| Handle errors better | `components/ErrorBoundary.js` |
| Add new feature | Start in appropriate folder |
| Understand data flow | `App.js` → `hooks/` → `utils/` |
| Fix a bug | Find in file → add error handling |

---

## 💡 Pro Tips

### Organization Best Practices

1. **Keep components small**
   - One component = one responsibility
   - If > 200 lines → split it

2. **Use hooks for complex logic**
   - Don't put too much in components
   - Extract to hooks for reuse

3. **Use utils for pure functions**
   - No side effects
   - Easy to test
   - Reusable

4. **Use constants for config**
   - Centralized
   - Easy to maintain
   - Single source of truth

5. **Keep files organized**
   ```
   src/
   ├── components/     (UI only)
   ├── hooks/          (logic)
   ├── utils/          (calculations)
   ├── constants/      (config)
   └── App.js          (coordinator)
   ```

### File Size Guidelines

- **Components**: 100-300 lines
- **Hooks**: 50-150 lines
- **Utils**: 20-100 lines
- **Constants**: 10-50 lines

If larger → split into smaller files

---

## 🔗 File Dependencies

```
App.js
├─ components/Header.js
├─ components/AddTaskForm.js
│  └─ hooks/useForm.js
│     └─ utils/validation.js
│        └─ utils/timeUtils.js
├─ components/TaskList.js
│  └─ components/TaskItem.js
│     └─ utils/timeUtils.js
├─ components/TimeStats.js
│  └─ constants/categories.js
├─ components/ErrorBoundary.js
└─ hooks/useTasks.js
   └─ utils/localStorage.js
      └─ constants/categories.js
```

---

**Version**: 1.0
**Last Updated**: December 19, 2025
