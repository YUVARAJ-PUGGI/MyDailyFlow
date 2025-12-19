# Quick Reference Guide - For Quick Lookups

## 🚀 Common Commands

```bash
# Navigate to project
cd schedule-tracker

# Install dependencies
npm install

# Start development server
npm start

# Run tests (when we add them)
npm test

# Build for production
npm run build

# Install new package
npm install package-name

# Install as dev dependency
npm install --save-dev package-name
```

---

## 📂 File Quick Links

### Components (UI)
| File | Purpose | Edit When |
|------|---------|-----------|
| `Header.js` | Title, date picker, stats | Change header look/data |
| `AddTaskForm.js` | Task creation form | Add form fields or validation |
| `TaskItem.js` | Single task display | Change task appearance |
| `TaskList.js` | All tasks list | Change list layout |
| `TimeStats.js` | Time statistics | Change stats display |
| `ErrorBoundary.js` | Error handling | Improve error UI |

### Hooks (Logic)
| File | Purpose | Edit When |
|------|---------|-----------|
| `useTasks.js` | Task state management | Add new task methods |
| `useForm.js` | Form handling | Change validation/form logic |

### Utils (Calculations)
| File | Purpose | Edit When |
|------|---------|-----------|
| `timeUtils.js` | Time conversions | Add time calculations |
| `validation.js` | Form validation | Add validation rules |
| `localStorage.js` | Data saving | Change persistence |

### Configuration
| File | Purpose | Edit When |
|------|---------|-----------|
| `categories.js` | Task categories | Add/remove categories |

---

## 🔧 Common Code Patterns

### Using Custom Hooks

```javascript
// In any component:
import useTasks from '../hooks/useTasks';

function MyComponent() {
  const { tasks, addTask, deleteTask } = useTasks();
  
  return (
    <div>
      {tasks.map(task => <Task key={task.id} {...task} />)}
    </div>
  );
}
```

### Validating Form Input

```javascript
import { validateTaskForm, sanitizeInput } from '../utils/validation';

const input = sanitizeInput(userInput); // Safe
const { isValid, errors } = validateTaskForm(formData);

if (!isValid) {
  console.log(errors); // { title: "Required", ... }
}
```

### Converting Times

```javascript
import { convertTo24Hour, convertTo12Hour } from '../utils/timeUtils';

const time24 = convertTo24Hour('09:30', 'AM'); // "09:30"
const time12 = convertTo12Hour('21:30');      // { time: "09:30", period: "PM" }
```

### Saving/Loading Data

```javascript
import { saveTasks, loadTasks } from '../utils/localStorage';

const tasks = loadTasks();      // Load from browser
saveTasks(tasks);                // Save to browser
```

### Using PropTypes

```javascript
import PropTypes from 'prop-types';

function MyComponent({ title, count, onComplete }) {
  return <div>{title}: {count}</div>;
}

MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired
};
```

### Toast Notifications

```javascript
import { toast } from 'react-toastify';

toast.success('Task added!');
toast.error('Failed to add task');
toast.info('Information');
toast.warning('Warning');
```

---

## 🐛 Common Issues & Fixes

### Issue: Form not validating
**Solution**: Check `validation.js` has the rule you need

### Issue: Times showing incorrectly
**Solution**: Check if using `startTime24` or `startTime`

### Issue: Data not saving
**Solution**: Check localStorage is available → see `localStorage.js`

### Issue: Component not updating
**Solution**: Make sure state is returned from hook

### Issue: Errors not showing
**Solution**: Check ErrorBoundary wraps app in `App.js`

---

## 📊 State Management Flow

```
App.js
  ↓
useTasks hook
  ↓
localStorage.js
  ↓
Browser Storage

↑ ↓ (bidirectional)

Components
  ↓
useForm hook
  ↓
validation.js
```

---

## 🎨 Color Scheme

### Categories
```javascript
DSA:            #fef3c7 (bg) / #d97706 (text)
Aptitude:       #dcfce7 (bg) / #16a34a (text)
Web Dev:        #f3e8ff (bg) / #9333ea (text)
College Exams:  #fef3c7 (bg) / #ca8a04 (text)
Labs:           #fed7aa (bg) / #ea580c (text)
Workout:        #fecaca (bg) / #dc2626 (text)
Projects:       #fbcfe8 (bg) / #be185d (text)
Break:          #e5e7eb (bg) / #6b7280 (text)
```

### UI Elements
```javascript
Primary Button:    linear-gradient(135deg, #667eea, #764ba2)
Background:        linear-gradient(135deg, #667eea, #764ba2)
Cards:             rgba(255, 255, 255, 0.95)
Text Primary:      #1f2937
Text Secondary:    #6b7280
Error:             #dc2626
Success:           #10b981
Warning:           #f59e0b
```

---

## 📱 Component Props Reference

### Header
```javascript
<Header 
  currentDate="2025-12-19"
  setCurrentDate={func}
  totalTasks={5}
  completedTasks={2}
/>
```

### AddTaskForm
```javascript
<AddTaskForm onAddTask={func} />
```

### TaskList
```javascript
<TaskList 
  tasks={[...]}
  onToggleComplete={func}
  onDeleteTask={func}
/>
```

### TaskItem
```javascript
<TaskItem 
  task={taskObj}
  onToggleComplete={func}
  onDeleteTask={func}
/>
```

### TimeStats
```javascript
<TimeStats tasks={[...]} />
```

---

## 🧪 Testing Hook Usage

```javascript
// Test if useTasks works
import useTasks from '../hooks/useTasks';

const { tasks, addTask } = useTasks();

// Add a task
addTask({
  title: 'Test',
  category: 'DSA',
  startTime24: '09:00',
  endTime24: '10:00'
});

// Should appear in tasks array
console.log(tasks);
```

---

## 🔑 Key Functions Reference

### timeUtils.js
```javascript
convertTo24Hour(time12, period) → string
convertTo12Hour(time24) → { time, period }
calculateDuration(startTime, endTime) → number
formatDuration(hours) → string
isValidTimeRange(startTime, endTime) → boolean
```

### validation.js
```javascript
validateTaskForm(formData) → { isValid, errors }
sanitizeInput(input) → string
```

### localStorage.js
```javascript
saveTasks(tasks) → boolean
loadTasks() → array
clearTasks() → boolean
exportTasksAsJSON(tasks) → void
isLocalStorageAvailable() → boolean
```

### useTasks Hook
```javascript
{
  tasks,                    // array
  loading,                  // boolean
  error,                    // string|null
  addTask(data),           // function
  updateTask(id, updates), // function
  deleteTask(id),          // function
  toggleTaskCompletion(id), // function
  clearAllTasks(),         // function
  getTasksByDate(date)     // function
}
```

### useForm Hook
```javascript
{
  formData,          // object
  errors,            // object
  isSubmitting,      // boolean
  handleChange(e),   // function
  handleSubmit(e),   // function
  updateFormData(updates), // function
  resetForm()        // function
}
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `DEVELOPER_GUIDE.md` | Complete architecture & design |
| `STEP_BY_STEP_GUIDE.md` | What we built & how it works |
| `FILE_ORGANIZATION.md` | How to navigate & organize code |
| `QUICK_REFERENCE.md` | This file - quick lookups |

---

## 🚀 Next Things to Try

### Easy (30 min)
- [ ] Change a color in categories.js
- [ ] Add a new category
- [ ] Change form field text
- [ ] Add a new validation rule

### Medium (1-2 hours)
- [ ] Add task description field
- [ ] Add task notes
- [ ] Add search/filter
- [ ] Change UI colors

### Hard (3+ hours)
- [ ] Add authentication
- [ ] Add backend integration
- [ ] Add recurring tasks
- [ ] Add task templates

---

## 💾 Current Project Stats

```
Files:        25+
Components:   6
Hooks:        2
Utils:        3
Lines of Code: ~2000
Testing:      0 (to add)
TypeScript:   Not used (can add)
```

---

## ✅ Development Checklist

When adding features, check:

- [ ] Is it in the right folder?
- [ ] Did I add PropTypes?
- [ ] Did I add error handling?
- [ ] Did I test it works?
- [ ] Did I add comments?
- [ ] Does app still run?
- [ ] Do other features still work?

---

**Version**: 1.0
**Last Updated**: December 19, 2025
**Status**: Ready for development
