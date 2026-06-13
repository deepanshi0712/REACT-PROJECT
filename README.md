# GoalFlow – Personal Goal Tracker

**Repository:** [deepanshi0712/REACT-PROJECT](https://github.com/deepanshi0712/REACT-PROJECT)

A clean and practical React.js web application for creating, managing, and tracking personal goals. Built as a college project using React Hooks and Local Storage — no backend required.

![React](https://img.shields.io/badge/React-18.2-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![CSS](https://img.shields.io/badge/CSS-Plain-green)

---

## Features

- **Add Goals** — Title, description, deadline, and priority (High / Medium / Low)
- **Manage Goals** — Edit, delete, mark complete/incomplete
- **Search** — Find goals by title
- **Filter** — View all, completed, or pending goals
- **Sort** — By deadline or priority
- **Dashboard Stats** — Total, completed, pending, and completion percentage
- **Progress Bar** — Visual overall progress tracker
- **Deadline Indicators** — Overdue and upcoming goals highlighted
- **Dark Mode** — Toggle between light and dark themes
- **Recent Activity** — Track recent actions
- **Gamification** — XP, levels, daily streaks, and achievement badges
- **Local Storage** — Data persists after page refresh
- **Responsive Design** — Works on mobile, tablet, and desktop

---

## Tech Stack

| Technology     | Purpose                    |
|----------------|----------------------------|
| React.js 18    | UI framework               |
| JavaScript     | Programming language       |
| React Hooks    | State management           |
| Local Storage  | Data persistence           |
| Plain CSS      | Styling                    |

No TypeScript, no backend, no Firebase, no authentication.

---

## Project Structure

```
src/
├── components/
│   ├── Navbar/
│   ├── GoalForm/
│   ├── GoalCard/
│   ├── GoalList/
│   ├── SearchBar/
│   ├── FilterBar/
│   ├── DashboardStats/
│   ├── ProgressTracker/
│   ├── EmptyState/
│   ├── ConfirmationModal/
│   ├── RecentActivity/
│   └── Footer/
├── hooks/
│   ├── useGoals.js
│   ├── useDarkMode.js
│   └── useToast.js
├── utils/
│   ├── constants.js
│   └── helpers.js
├── styles/
│   ├── global.css
│   └── App.css
├── assets/
├── App.js
└── index.js
```

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (comes with Node.js)

### Steps

1. **Navigate to the project folder**

   ```bash
   cd "react project"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command         | Description                          |
|-----------------|--------------------------------------|
| `npm start`     | Run app in development mode          |
| `npm run build` | Create production build in `/build`  |
| `npm test`      | Run tests in interactive watch mode  |

---

## Sample Data

On first launch, GoalFlow loads sample goals so you can explore the app immediately:

| Goal                        | Priority | Status    |
|-----------------------------|----------|-----------|
| Complete React Assignment   | High     | Pending   |
| Read 2 Chapters of DBMS     | Medium   | Pending   |
| Morning Walk Routine        | Low      | Completed |
| Prepare for Mid-Sem Exam    | High     | Overdue   |

Sample data is stored in `src/utils/constants.js` under `SAMPLE_GOALS`.

---

## How It Works

1. **Adding a goal** — Fill in the form and click "Add Goal". Required fields are validated before saving.
2. **Editing** — Click "Edit" on any goal card. The form switches to edit mode.
3. **Completing** — Check the checkbox on a goal card to mark it done.
4. **Deleting** — Click "Delete" and confirm in the modal dialog.
5. **Searching & filtering** — Use the search bar and filter buttons to find specific goals.
6. **Dark mode** — Click the moon/sun icon in the navbar.

All data is saved automatically to your browser's Local Storage.

---

## Color Palette

| Usage          | Color     |
|----------------|-----------|
| Background     | `#F8F9FA` |
| Cards          | `#FFFFFF` |
| Primary        | `#2563EB` |
| Success        | `#22C55E` |
| Warning        | `#F59E0B` |
| Danger         | `#EF4444` |
| Main Text      | `#1F2937` |
| Secondary Text | `#6B7280` |

---

## Author

College Project — React.js Web Application Development

---

## License

This project is created for educational purposes.
