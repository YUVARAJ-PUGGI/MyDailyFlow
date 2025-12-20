# MyDailyFlow ⚡

> **Plan Your Day. Build Your Future.**
> The definitive productivity interface for high-performance engineering students.

![Project Banner](public/logo.svg)

## 🚀 Overview

**MyDailyFlow** is not just a to-do list; it's a **productivity operating system** designed specifically for engineers and students. It combines smart scheduling, habit tracking, and gamification into a single, distraction-free "Glassmorphism" interface.

Built to help you balance **DSA practice, System Design, competitive coding, and university exams** without burning out.

## ✨ Key Features

- **🎮 Gamified Productivity**: Earn XP for every task completed. Level up your profile and unlock exclusive UI themes in the **Theme Shop**.
- **🧠 Smart Conflict Detection**: Automatically detects scheduling conflicts and offers one-click "Auto-Reschedule" logic to find the next available slot.
- **📊 Visual Analytics**: Real-time dashboards powered by `recharts` to track your study streaks, focus hours, and task distribution.
- **🍅 Focus Mode**: Integrated **Pomodoro Timer** with custom work/break intervals to maintain deep work flow.
- **📱 PWA Ready**: Fully installable Progressive Web App. Works offline and feels like a native app on mobile and desktop.
- **🎨 Ultra-Premium UI**: A sleek, dark-mode-first aesthetic featuring glassmorphism, micro-interactions, and smooth transitions.
- **⚡ Quick Actions**: "Magic Prompt" (coming soon) and keyboard-friendly navigation for power users.

## 🛠️ Tech Stack

- **Core**: React 19, functional components, custom Hooks.
- **State Management**: Context API (`GamificationContext`, `ThemeContext`) + LocalStorage persistence.
- **Styling**: Pure CSS3 Variables, Flexbox/Grid, Glassmorphism effects.
- **Icons**: `lucide-react` for crisp, lightweight SVG icons.
- **Charts**: `recharts` for data visualization.
- **Build Tool**: Create React App (CRA) with custom Webpack configuration via `react-scripts`.

## 📦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/MyDailyFlow.git
    cd MyDailyFlow
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server**
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🚀 Deployment

This project is optimized for deployment on **Vercel** or **Netlify**.

### Vercel (Recommended)

1.  Push your code to a GitHub repository.
2.  Import the project dashboard on [Vercel](https://vercel.com).
3.  Vercel will detect the `vercel.json` and `package.json` automatically.
4.  Click **Deploy**.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ for Engineers by <strong>Yuvaraj Puggi</strong>
</p>
