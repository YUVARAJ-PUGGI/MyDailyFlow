// All task categories with their colors
export const CATEGORIES = [
  {
    name: 'DSA',
    bg: '#fef3c7',
    color: '#d97706',
    icon: '💻'
  },
  {
    name: 'Aptitude',
    bg: '#dcfce7',
    color: '#16a34a',
    icon: '🧮'
  },
  {
    name: 'Web Dev',
    bg: '#f3e8ff',
    color: '#9333ea',
    icon: '🌐'
  },
  {
    name: 'College Exams',
    bg: '#fef3c7',
    color: '#ca8a04',
    icon: '📚'
  },
  {
    name: 'Labs',
    bg: '#fed7aa',
    color: '#ea580c',
    icon: '🔬'
  },
  {
    name: 'Workout',
    bg: '#fecaca',
    color: '#dc2626',
    icon: '💪'
  },
  {
    name: 'Projects',
    bg: '#fbcfe8',
    color: '#be185d',
    icon: '🚀'
  },
  {
    name: 'Break',
    bg: '#e5e7eb',
    color: '#6b7280',
    icon: '☕'
  }
];

// Get category colors by name
export const getCategoryStyle = (categoryName) => {
  const category = CATEGORIES.find(cat => cat.name === categoryName);
  return category ? { bg: category.bg, color: category.color } : CATEGORIES[0];
};

// Get just the category names for dropdowns
export const getCategoryNames = () => CATEGORIES.map(cat => cat.name);
