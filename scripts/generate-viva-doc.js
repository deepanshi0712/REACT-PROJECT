/**
 * Generates GoalFlow Viva & Project Documentation Word file
 * Run: node scripts/generate-viva-doc.js
 */

const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
} = require('docx');

function heading(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({ text, heading: level, spacing: { before: 240, after: 120 } });
}

function para(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text, size: 22, ...opts })],
  });
}

function boldPara(label, text) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [
      new TextRun({ text: label, bold: true, size: 22 }),
      new TextRun({ text, size: 22 }),
    ],
  });
}

function qna(question, answer) {
  return [
    new Paragraph({
      spacing: { before: 200, after: 80 },
      children: [new TextRun({ text: `Q. ${question}`, bold: true, size: 24, color: '1F2937' })],
    }),
    new Paragraph({
      spacing: { after: 160 },
      children: [new TextRun({ text: `Ans. ${answer}`, size: 22 })],
    }),
  ];
}

function simpleTable(headers, rows) {
  const headerRow = new TableRow({
    children: headers.map(
      (h) =>
        new TableCell({
          width: { size: 100 / headers.length, type: WidthType.PERCENTAGE },
          shading: { fill: 'E5E7EB' },
          children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 20 })] })],
        })
    ),
  });

  const dataRows = rows.map(
    (row) =>
      new TableRow({
        children: row.map(
          (cell) =>
            new TableCell({
              width: { size: 100 / headers.length, type: WidthType.PERCENTAGE },
              children: [new Paragraph({ children: [new TextRun({ text: cell, size: 20 })] })],
            })
        ),
      })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow, ...dataRows],
  });
}

async function main() {
  const sections = [];

  // TITLE PAGE
  sections.push(
    new Paragraph({ spacing: { before: 2000 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: 'GoalFlow – Personal Goal Tracker', bold: true, size: 48, color: '2563EB' })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [new TextRun({ text: 'Complete Project Documentation & Viva Guide', size: 28 })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: 'React.js College Project', size: 24, italics: true })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 400 },
      children: [new TextRun({ text: 'GitHub: github.com/deepanshi0712/REACT-PROJECT', size: 22 })],
    }),
    new Paragraph({ children: [new TextRun({ text: '', break: 1 })] }),
    new Paragraph({ pageBreakBefore: true })
  );

  // SECTION 1: PROJECT OVERVIEW
  sections.push(heading('1. Project Overview (Parichay)'));
  sections.push(
    para(
      'GoalFlow ek Personal Goal Tracker web application hai jo React.js mein banaya gaya hai. Is application ka main purpose hai ki user apne personal goals create kar sake, unhe manage kar sake, progress track kar sake aur motivated rahe (gamification ke through).'
    ),
    para(
      'Yeh ek frontend-only application hai — isme koi backend server, database, Firebase ya login system nahi hai. Saara data browser ke Local Storage mein save hota hai, isliye page refresh karne ke baad bhi data safe rehta hai.'
    ),
    boldPara('Project Name: ', 'GoalFlow – Personal Goal Tracker'),
    boldPara('Submitted By: ', 'Deepanshi (College Project)'),
    boldPara('Tech Stack: ', 'React.js 18, JavaScript, React Hooks, Local Storage, Plain CSS'),
    boldPara('Repository: ', 'https://github.com/deepanshi0712/REACT-PROJECT')
  );

  // SECTION 2: TECH STACK
  sections.push(heading('2. Technology Stack – Kya Use Hua Aur Kyun?'));
  sections.push(
    simpleTable(
      ['Technology', 'Kya Hai', 'Is Project Mein Kaise Use Hua'],
      [
        ['React.js 18', 'JavaScript UI library', 'Poora user interface components mein banaya gaya. Fast aur interactive UI ke liye.'],
        ['JavaScript (ES6+)', 'Programming language', 'TypeScript nahi use kiya — pure JavaScript mein saara logic likha hai.'],
        ['React Hooks', 'State management tool', 'useState, useEffect, useCallback, useMemo, useRef — data aur side effects handle karne ke liye.'],
        ['Local Storage', 'Browser storage API', 'Goals, theme, activity aur gamification data permanently save karne ke liye.'],
        ['Plain CSS', 'Styling', 'Har component ka alag CSS file — clean, responsive design ke liye. CSS Modules nahi, simple import.'],
        ['Create React App', 'Project setup tool', 'react-scripts se project bootstrap kiya — npm start se dev server chalta hai.'],
        ['Inter Font', 'Google Font', 'Professional aur clean typography ke liye index.html se load hota hai.'],
      ]
    ),
    new Paragraph({ spacing: { after: 200 } })
  );

  // SECTION 3: PROJECT STRUCTURE
  sections.push(heading('2.1 Project Folder Structure'));
  sections.push(
    para('Project ko professionally organize kiya gaya hai taaki code maintain karna easy ho:'),
    para(
      'src/components/ — Reusable UI parts (Navbar, GoalForm, GoalCard, GoalList, SearchBar, FilterBar, DashboardStats, ProgressTracker, EmptyState, ConfirmationModal, Footer, RewardDashboard, Achievements, MotivationSection, RecentActivity)\n\nsrc/hooks/ — Custom React Hooks (useGoals, useGamification, useDarkMode, useToast)\n\nsrc/utils/ — Helper functions aur constants (constants.js, helpers.js, gamification.js)\n\nsrc/styles/ — Global CSS aur App layout CSS\n\nsrc/assets/ — Static files ke liye folder\n\npublic/ — index.html aur manifest.json\n\nApp.js — Main component jo sab kuch connect karta hai\n\nindex.js — React app ka entry point'
    )
  );

  // SECTION 4: FEATURES
  sections.push(heading('3. Features – Detail Mein Samjho'));
  sections.push(heading('3.1 Goal Management', HeadingLevel.HEADING_2));
  sections.push(
    boldPara('Add Goal: ', 'User title, description, deadline aur priority (High/Medium/Low) enter karta hai. GoalForm component form handle karta hai. Validation ke baad useGoals hook mein addGoal() call hota hai.'),
    boldPara('Edit Goal: ', 'GoalCard par Edit button dabane se goal data form mein load hota hai. Save par updateGoal() se goal update hota hai.'),
    boldPara('Delete Goal: ', 'Delete button par ConfirmationModal open hota hai. Confirm karne par deleteGoal() se goal remove hota hai.'),
    boldPara('Mark Complete: ', 'Checkbox se goal complete/incomplete hota hai. toggleComplete() state change karta hai.'),
    boldPara('Creation Date: ', 'Har goal ke saath createdAt timestamp save hota hai jo GoalCard par display hota hai.')
  );

  sections.push(heading('3.2 Search, Filter & Sort', HeadingLevel.HEADING_2));
  sections.push(
    boldPara('Search: ', 'SearchBar component title se goals filter karta hai. filterGoals() helper function use hoti hai.'),
    boldPara('Filter: ', 'FilterBar se All / Completed / Pending goals dekh sakte ho.'),
    boldPara('Sort: ', 'Deadline ya Priority ke basis par sort — sortGoals() function array sort karta hai.')
  );

  sections.push(heading('3.3 Dashboard & Progress', HeadingLevel.HEADING_2));
  sections.push(
    boldPara('DashboardStats: ', 'Total Goals, Completed, Pending aur Completion Percentage dikhata hai. calculateStats() se compute hota hai.'),
    boldPara('ProgressTracker: ', 'Visual progress bar jo completion percentage dikhata hai. Auto-update hota hai jab goals complete hote hain.')
  );

  sections.push(heading('3.4 Deadline Indicators', HeadingLevel.HEADING_2));
  sections.push(
    para('GoalCard mein deadline check hoti hai:'),
    para('• Overdue goals — red border aur warning badge (deadline guzar chuki hai)\n• Upcoming goals — amber/yellow border (7 din ke andar deadline)\n• Normal goals — regular display\n• isOverdue(), isUpcoming(), getDaysRemaining() helper functions use hote hain')
  );

  sections.push(heading('3.5 Dark Mode', HeadingLevel.HEADING_2));
  sections.push(
    para('useDarkMode hook dark/light theme toggle karta hai. Theme localStorage mein save hota hai (goalflow_theme key). CSS variables (--bg-color, --card-bg, etc.) data-theme attribute se change hote hain.')
  );

  sections.push(heading('3.6 Gamification System', HeadingLevel.HEADING_2));
  sections.push(
    simpleTable(
      ['Feature', 'Detail'],
      [
        ['XP System', 'Low = 10 XP, Medium = 20 XP, High = 30 XP (goal complete par)'],
        ['Levels', 'Level 1: 0 XP | Level 2: 100 XP | Level 3: 250 XP | Level 4: 500 XP | Level 5: 1000 XP'],
        ['Daily Streak', 'Lagatar din jab kam se kam 1 goal complete ho — miss kiya toh reset'],
        ['Badges', 'First Step, 3-Day Streak, 7-Day Streak, Goal Getter (10), Overachiever (25), XP Hunter (100 XP)'],
        ['Reward Dashboard', 'Level, XP, progress bar, streaks dikhata hai'],
        ['Motivation Section', 'Dynamic messages — streak, level up, badge unlock ke liye'],
      ]
    ),
    new Paragraph({ spacing: { after: 200 } })
  );

  // SECTION 5: REACT HOOKS
  sections.push(heading('4. React Hooks – Kaise Use Hue'));
  sections.push(
    simpleTable(
      ['Hook', 'File', 'Kaam'],
      [
        ['useState', 'App.js, sab hooks', 'Component ka local state manage karta hai (search, filter, editing, toast)'],
        ['useEffect', 'useGoals, useGamification, useDarkMode', 'Page load par localStorage se data load; changes par save'],
        ['useCallback', 'useGoals, useGamification', 'Functions ko memoize karta hai taaki unnecessary re-render na ho'],
        ['useMemo', 'App.js', 'displayedGoals aur goalStats ko efficiently calculate karta hai'],
        ['useRef', 'useGamification', 'Latest gamification state synchronously read karne ke liye'],
      ]
    ),
    new Paragraph({ spacing: { after: 200 } })
  );

  sections.push(heading('4.1 Custom Hooks Detail'));
  sections.push(
    boldPara('useGoals(): ', 'Goals CRUD operations — addGoal, updateGoal, deleteGoal, toggleComplete. Activity log bhi maintain karta hai. STORAGE_KEY = goalflow_goals'),
    boldPara('useGamification(): ', 'XP, levels, streaks, badges manage karta hai. handleGoalCompleted() goal complete hone par call hota hai. GAMIFICATION_KEY = goalflow_gamification'),
    boldPara('useDarkMode(): ', 'Theme toggle aur persistence. THEME_KEY = goalflow_theme'),
    boldPara('useToast(): ', 'Success/error notification messages 3 seconds ke liye dikhata hai.')
  );

  // SECTION 6: LOCAL STORAGE
  sections.push(heading('5. Local Storage – Data Kahan Save Hota Hai'));
  sections.push(
    simpleTable(
      ['Key Name', 'Kya Save Hota Hai'],
      [
        ['goalflow_goals', 'Saare goals ka array (JSON format)'],
        ['goalflow_activity', 'Recent activity log (last 10 entries)'],
        ['goalflow_gamification', 'XP, streaks, badges, levels data'],
        ['goalflow_theme', 'Dark ya light mode preference'],
      ]
    ),
    new Paragraph({ spacing: { after: 120 } }),
    para('Local Storage browser ka built-in feature hai. Methods: localStorage.setItem(key, value), localStorage.getItem(key), JSON.stringify() aur JSON.parse() use hote hain kyunki objects ko string mein convert karna padta hai.')
  );

  // SECTION 7: COMPONENTS
  sections.push(heading('6. Components – Har Component Ka Kaam'));
  sections.push(
    simpleTable(
      ['Component', 'Kaam'],
      [
        ['Navbar', 'App title aur dark mode toggle button'],
        ['DashboardStats', '4 stat cards — total, completed, pending, percentage'],
        ['ProgressTracker', 'Overall progress bar'],
        ['RewardDashboard', 'Level, XP, streak, badges count'],
        ['MotivationSection', 'Motivational messages display'],
        ['GoalForm', 'Add/Edit goal form with validation'],
        ['GoalList', 'Saare goal cards list karta hai'],
        ['GoalCard', 'Single goal display — checkbox, priority badge, deadline status'],
        ['SearchBar', 'Title se search input'],
        ['FilterBar', 'Filter buttons aur sort dropdown'],
        ['EmptyState', 'Jab koi goal nahi ya search empty ho'],
        ['ConfirmationModal', 'Delete confirm dialog'],
        ['Achievements', 'Badge grid — earned/locked'],
        ['RecentActivity', 'Last actions ki list'],
        ['Footer', 'Copyright aur info'],
      ]
    ),
    new Paragraph({ spacing: { after: 200 } })
  );

  // SECTION 8: DATA FLOW
  sections.push(heading('7. Data Flow – App Kaise Kaam Karti Hai'));
  sections.push(
    para('1. index.js → ReactDOM.createRoot() se App component mount hota hai\n2. App.js → useGoals(), useGamification(), useDarkMode(), useToast() hooks call hote hain\n3. Page load → useEffect se localStorage se data load hota hai\n4. User form submit kare → addGoal/updateGoal → state update → useEffect se localStorage save\n5. User goal complete kare → toggleComplete + handleGoalCompleted → XP/streak/badge update\n6. Search/filter change → useMemo se displayedGoals recalculate → GoalList re-render')
  );

  // SECTION 9: HOW TO RUN
  sections.push(heading('8. Project Kaise Run Karein'));
  sections.push(
    para('Step 1: git clone https://github.com/deepanshi0712/REACT-PROJECT.git\nStep 2: cd REACT-PROJECT\nStep 3: npm install\nStep 4: npm start\nStep 5: Browser mein http://localhost:3000 kholo\n\nProduction build: npm run build (build folder mein optimized files banengi)')
  );

  // SECTION 10: VIVA QUESTIONS
  sections.push(new Paragraph({ pageBreakBefore: true }));
  sections.push(heading('9. VIVA Questions & Detailed Answers'));
  sections.push(
    para('Neeche har topic ke important viva questions hain detailed answers ke saath. Inhe padh kar aap confidently jawab de sakte ho.')
  );

  const vivaQuestions = [
    [
      'Aapka project kis baare mein hai?',
      'Mera project "GoalFlow – Personal Goal Tracker" hai. Yeh ek React.js web application hai jisme user apne personal goals add, edit, delete aur track kar sakta hai. Isme dashboard statistics, search/filter, progress tracking aur gamification (XP, levels, streaks, badges) bhi hai. Yeh college submission ke liye banaya gaya hai aur koi backend use nahi kiya — saara data browser ke Local Storage mein save hota hai.',
    ],
    [
      'React kya hai aur aapne is project mein React kyun use kiya?',
      'React ek JavaScript library hai jo user interfaces banane ke liye use hoti hai, Facebook (Meta) ne develop ki thi. Main ne React use kiya kyunki: (1) Component-based architecture se code reusable aur organized rehta hai, (2) Virtual DOM se UI fast update hota hai, (3) React Hooks se state management easy hai, (4) Industry mein sabse zyada use hoti hai, (5) Single Page Application (SPA) banana easy hai.',
    ],
    [
      'React Hooks kya hain? Aapne kaun kaun se hooks use kiye?',
      'Hooks React 16.8 mein aaye — ye functions hain jo functional components mein state aur lifecycle features use karne dete hain. Maine use kiye: useState (state ke liye), useEffect (side effects — load/save data), useCallback (functions memoize), useMemo (expensive calculations cache), useRef (DOM/state reference). Custom hooks bhi banaye: useGoals, useGamification, useDarkMode, useToast.',
    ],
    [
      'useState aur useEffect mein kya difference hai?',
      'useState component ka data/state store karta hai aur jab state change hoti hai tab component re-render hota hai. Example: searchQuery, filter, goals array. useEffect side effects handle karta hai — jaise page load par localStorage se data lena, ya state change hone par localStorage mein save karna. useEffect(() => {...}, [dependencies]) — dependency array batati hai kab effect run hoga.',
    ],
    [
      'Custom Hook kya hai? Example do.',
      'Custom Hook ek reusable JavaScript function hai jo "use" se start hoti hai aur andar React hooks use karti hai. Example: useGoals() — isme goals ka saara logic hai (add, edit, delete, toggle, localStorage save/load). App.js clean rehta hai kyunki complex logic hook mein shift ho gaya. Dusra example: useGamification() — XP, streaks, badges handle karta hai.',
    ],
    [
      'Local Storage kya hai? Is project mein kaise use hua?',
      'Local Storage browser ka built-in storage hai jo data permanently store karta hai (jab tak user clear na kare). Key-value pairs mein data store hota hai. Is project mein 4 keys use ki: goalflow_goals (goals array), goalflow_activity (activity log), goalflow_gamification (XP/streaks/badges), goalflow_theme (dark/light). JSON.stringify() se object ko string banate hain save karne se pehle, JSON.parse() se wapas object banate hain read karte waqt.',
    ],
    [
      'Local Storage aur Session Storage mein kya difference hai?',
      'Local Storage data permanently store karta hai — browser band karne ke baad bhi data rehta hai. Session Storage data tab tak rehta hai jab tak browser tab open hai — tab close hone par data delete ho jata hai. Hamare project mein Local Storage use kiya kyunki goals aur progress permanently save rehna chahiye.',
    ],
    [
      'Kya aapne backend use kiya hai? Agar nahi, toh data kaise save hota hai?',
      'Nahi, koi backend nahi use kiya — na server, na database, na Firebase. Pure frontend application hai. Data browser ke Local Storage mein save hota hai. Jab user goal add/edit/delete karta hai, React state update hoti hai aur useEffect automatically localStorage.setItem() se save kar deta hai.',
    ],
    [
      'Component-based architecture kya hai?',
      'React mein UI ko chote reusable pieces mein divide kiya jata hai jinhe components kehte hain. Har component apna UI aur logic rakhta hai. Example: Navbar alag, GoalCard alag, GoalForm alag. App.js in sab ko combine karta hai. Fayda: code reuse, easy maintenance, team mein alag alag components par kaam ho sakta hai.',
    ],
    [
      'Props kya hain? Example do apne project se.',
      'Props (Properties) parent component se child component ko data pass karne ka tarika hain. Example 1: App.js se GoalList ko goals={displayedGoals} pass hota hai. Example 2: GoalList se GoalCard ko goal={goal}, onEdit={handleEdit}, onDelete={handleDeleteRequest} pass hote hain. Props read-only hote hain — child unhe change nahi kar sakta.',
    ],
    [
      'State kya hai? Props aur State mein difference?',
      'State component ka apna internal data hai jo change ho sakta hai. Props parent se aate hain. State change hone par component re-render hota hai. Example: goals state useGoals hook mein hai jo change hoti hai jab goal add/delete hota hai. Props static input hote hain child ke liye, state dynamic hoti hai.',
    ],
    [
      'Virtual DOM kya hai?',
      'Virtual DOM React ka concept hai — ye memory mein actual DOM ki copy rakhta hai. Jab state change hoti hai, React pehle Virtual DOM update karta hai, phir compare karta hai (diffing) purane se, aur sirf wahi changes real DOM mein apply karta hai. Isse performance fast rehti hai — poora page re-render nahi hota.',
    ],
    [
      'SPA (Single Page Application) kya hai? Kya yeh SPA hai?',
      'SPA ek aisi web app hai jisme page reload nahi hota — ek hi HTML page par JavaScript se content change hota hai. Haan, GoalFlow ek SPA hai — React Router nahi use kiya lekin poora app ek page par chalti hai bina full page reload ke.',
    ],
    [
      'Form validation kaise ki hai?',
      'GoalForm component mein validateGoalForm() function hai jo check karta hai: title required hai aur minimum 3 characters, deadline required hai, priority select honi chahiye. Agar error hai toh errors state mein message store hota hai aur input ke neeche red error text dikhta hai. HTML5 validation bhi hai jaise required fields.',
    ],
    [
      'Search aur Filter kaise implement kiya?',
      'Search: SearchBar mein input value searchQuery state mein store hoti hai. filterGoals() function goals array ko title se filter karta hai (toLowerCase() se case-insensitive search). Filter: FilterBar se filter state set hoti hai — all/completed/pending. Sort: sortGoals() deadline ya priority ke basis par array sort karta hai. Sab useMemo se efficiently compute hota hai.',
    ],
    [
      'Progress percentage kaise calculate hoti hai?',
      'calculateStats() function helpers.js mein hai: total = goals.length, completed = goals.filter(g => g.completed).length, completionPercentage = (completed / total) * 100. Agar koi goal nahi hai toh 0%. ProgressTracker component yeh percentage visual bar mein dikhata hai.',
    ],
    [
      'Overdue aur Upcoming goals kaise detect hote hain?',
      'helpers.js mein functions hain: isOverdue() — deadline aaj se pehle ki hai aur goal complete nahi hai. isUpcoming() — deadline agle 7 din ke andar hai. getDaysRemaining() — kitne din bache hain. GoalCard in functions ko use karke red (overdue) ya amber (upcoming) border aur status badge dikhata hai.',
    ],
    [
      'Gamification system explain karo.',
      'Gamification user ko motivate karne ke liye game-like features hain: (1) XP — goal complete par priority ke hisaab se points (Low=10, Medium=20, High=30). (2) Levels — XP ke basis par Level 1 se 5 tak. (3) Daily Streak — lagatar din goal complete karo. (4) Badges — achievements unlock hoti hain conditions poori hone par. useGamification hook saara logic handle karta hai aur goalflow_gamification key mein save hota hai.',
    ],
    [
      'Streak system kaise kaam karta hai?',
      'Jab user goal complete karta hai, updateStreakOnCompletion() check karta hai: agar kal bhi complete kiya tha toh streak +1, agar aaj pehli baar complete kar raha hai toh streak = 1, agar aaj pehle se complete ho chuka hai toh streak same. App load par applyStreakReset() check karta hai — agar last completion 2+ din pehle thi toh streak 0 ho jati hai.',
    ],
    [
      'Badges kaise unlock hote hain?',
      'constants.js mein BADGES array hai har badge ke saath check function. Jab goal complete hota hai, checkNewBadges() har badge ki condition check karta hai — jaise totalGoalsCompleted >= 1 for First Step badge. Naye badges earnedBadges array mein add hote hain aur Achievements section mein unlocked dikhte hain.',
    ],
    [
      'Dark Mode kaise implement kiya?',
      'useDarkMode hook theme state manage karta hai. Toggle par document.documentElement.setAttribute("data-theme", "dark") set hota hai. global.css mein CSS variables define hain light aur dark ke liye. [data-theme="dark"] selector se dark colors apply hote hain. Theme localStorage mein save hota hai taaki refresh ke baad bhi same rahe.',
    ],
    [
      'Confirmation Modal kyun use kiya?',
      'Delete jaisa destructive action accidentally na ho, isliye ConfirmationModal use kiya. User Delete dabata hai → modal open → Cancel ya Confirm choose karta hai. Confirm par hi deleteGoal() call hota hai. Modal backdrop click se bhi close ho sakta hai.',
    ],
    [
      'useMemo kahan use kiya aur kyun?',
      'App.js mein displayedGoals aur goalStats ke liye useMemo use kiya. Jab goals, searchQuery, filter ya sortBy change hote hain tab hi recalculate hota hai. Bina useMemo ke har render par filter/sort dubara chalega jo unnecessary hai. Performance optimization ke liye use kiya.',
    ],
    [
      'useCallback kahan use kiya aur kyun?',
      'useGoals aur useGamification hooks mein addGoal, updateGoal, deleteGoal, toggleComplete, handleGoalCompleted functions useCallback se wrap hain. Isse function reference stable rehti hai aur unnecessary child re-renders avoid hote hain jab ye functions dependency arrays mein pass hote hain.',
    ],
    [
      'Props drilling kya hai? Kya aapke project mein hai?',
      'Props drilling tab hoti hai jab data ko bahut saare nested components se pass karna padta hai. Hamare project mein thodi si hai — App se handlers GoalList tak, phir GoalCard tak pass hote hain. Lekin custom hooks (useGoals) se main data App level par hi manage hota hai, isliye zyada deep drilling nahi hai.',
    ],
    [
      'Responsive design kaise implement kiya?',
      'CSS Media Queries use ki hain. Example: @media (max-width: 768px) stats grid 2 columns, @media (max-width: 900px) sidebar neeche aa jata hai, @media (max-width: 480px) padding aur font size adjust. Flexbox aur CSS Grid se layouts banaye hain jo screen size ke hisaab se adapt hote hain.',
    ],
    [
      'Key prop kya hai aur kyun zaroori hai?',
      'React lists render karte waqt har item ko unique "key" chahiye. GoalList mein goals.map() mein key={goal.id} use kiya. Key se React identify karta hai kaun sa item change/add/remove hua — bina key ke performance issues aur bugs aa sakte hain.',
    ],
    [
      'React.StrictMode kya karta hai?',
      'index.js mein App ko StrictMode se wrap kiya hai. Development mode mein potential problems detect karta hai — jaise deprecated APIs, unsafe lifecycle methods. Production mein koi visual effect nahi hota.',
    ],
    [
      'npm install aur npm start kya karta hai?',
      'npm install — package.json ki dependencies (react, react-dom, react-scripts) download karke node_modules folder mein install karta hai. npm start — react-scripts start development server chalata hai (default port 3000), hot reload ke saath — code change par browser auto update.',
    ],
    [
      'package.json mein kya hota hai?',
      'package.json project ki metadata file hai: project name (goalflow), version, dependencies (react, react-dom, react-scripts), scripts (start, build, test). npm is file ko padh kar packages install aur commands run karta hai.',
    ],
    [
      'Create React App (CRA) kya hai?',
      'CRA ek official tool hai jo React project setup karta hai bina manual webpack/babel configuration ke. react-scripts package build, dev server, testing sab handle karti hai. Hamara project CRA structure follow karta hai.',
    ],
    [
      'Functional Components vs Class Components?',
      'Functional components simple JavaScript functions hain jo JSX return karte hain. Class components ES6 classes the. Ab React mein functional components + hooks standard hain. Hamare project mein sirf functional components use kiye hain — koi class component nahi.',
    ],
    [
      'JSX kya hai?',
      'JSX JavaScript ka extension hai jo HTML jaisa syntax React components mein use hota hai. Example: <GoalCard goal={goal} />. Browser JSX directly nahi samajhta — Babel transpiler JSX ko React.createElement() calls mein convert karta hai.',
    ],
    [
      'Event Handling kaise ki? Example do.',
      'React mein events camelCase mein hote hain: onClick, onChange, onSubmit. Example 1: FilterBar mein onClick={() => onFilterChange("completed")}. Example 2: GoalForm mein onSubmit={handleSubmit} — form submit par validation aur addGoal call. Example 3: Checkbox onChange se toggleComplete call hota hai.',
    ],
    [
      'Conditional Rendering kaise ki?',
      'React mein if/else, ternary operator (? :), aur && operator se conditional rendering hoti hai. Examples: (1) goals.length === 0 ? <EmptyState /> : <GoalList /> (2) toast && <div className="toast"> (3) editingGoal ? "Edit Goal" : "Add New Goal" form heading mein.',
    ],
    [
      'Lifting State Up kya hai? Aapke project mein example?',
      'Jab multiple components ko same state chahiye, state common parent mein rakhte hain. Example: searchQuery aur filter state App.js mein hai kyunki SearchBar, FilterBar aur GoalList teeno ko iski zaroorat hai. State "up" lift ki gayi parent App component mein.',
    ],
    [
      'Kya aapne TypeScript use kiya?',
      'Nahi, pure JavaScript use kiya hai. TypeScript JavaScript ka typed superset hai jo compile time par errors catch karta hai. College requirement ke hisaab se sirf JavaScript use kiya.',
    ],
    [
      'Kya Firebase ya authentication use kiya?',
      'Nahi. Koi login/register system nahi hai. Koi Firebase database nahi. App directly browser mein chalti hai bina kisi server ke. Data sirf us browser ke Local Storage mein save hota hai.',
    ],
    [
      'Agar user dusre browser mein app khole toh?',
      'Data Local Storage browser-specific hai. Dusre browser ya device mein data nahi dikhega kyunki koi cloud sync nahi hai. Yeh limitation hai frontend-only apps ki. Future mein backend add karke solve ho sakta hai.',
    ],
    [
      'Project ki limitations kya hain?',
      '(1) No backend — data sirf local browser mein. (2) No multi-device sync. (3) Local Storage limit ~5MB. (4) No user authentication. (5) No real-time collaboration. Future improvements: backend API, database, user login, cloud sync.',
    ],
    [
      'Future improvements kya add kar sakte ho?',
      'Backend (Node.js + MongoDB), user authentication (JWT), cloud data sync, push notifications for deadlines, export goals as PDF, categories/tags for goals, drag-and-drop reorder, PWA (Progressive Web App) for offline use.',
    ],
    [
      'CSS mein CSS Variables kaise use kiye?',
      'global.css mein :root { --primary: #2563EB; --bg-color: #F8F9FA; } define kiye. Components mein var(--primary) use kiya. Dark mode mein [data-theme="dark"] selector se variables override hote hain. Isse ek jagah color change karne se poori app update ho jati hai.',
    ],
    [
      'Sample data kyun add kiya?',
      'Pehli baar app khulne par user ko empty screen na dikhe, isliye SAMPLE_GOALS constants.js mein define kiye. Agar localStorage empty hai toh sample goals load hote hain taaki user features turant explore kar sake.',
    ],
    [
      'GitHub par project kaise upload kiya?',
      'git init se repository initialize ki, git add . se files stage ki, git commit se commit banaya, git remote add origin se GitHub repo connect kiya, git push origin main se code upload kiya. .gitignore mein node_modules aur build exclude kiye.',
    ],
    [
      'Re-render kab hota hai React mein?',
      'Jab component ka state (useState) change hota hai, props change hote hain, ya parent re-render hota hai. React Virtual DOM compare karke sirf changed parts update karta hai. useMemo/useCallback unnecessary re-renders kam karte hain.',
    ],
    [
      'Array.map() ka use kahan kiya?',
      'Lists render karne ke liye: GoalList mein goals.map() se har goal ke liye GoalCard banaya. Achievements mein badges.map(). RecentActivity mein activities.map(). map() har item ke liye JSX element return karta hai.',
    ],
    [
      'JSON.stringify aur JSON.parse kyun use kiya?',
      'Local Storage sirf strings store karta hai, objects directly nahi. Save karte waqt JSON.stringify(goals) se array ko string banate hain. Load karte waqt JSON.parse(stored) se wapas JavaScript object/array milta hai.',
    ],
    [
      'Toast notification kaise kaam karta hai?',
      'useToast hook toast state rakhta hai { message, type }. showToast("Goal added!", "success") call hota hai. 3 seconds baad setTimeout se toast null ho jata hai aur hide ho jata hai. App.js mein toast && <div className="toast"> se conditionally render hota hai.',
    ],
    [
      'Aapka favourite feature kaun sa hai aur kyun?',
      'Gamification system — kyunki sirf goal tracking se zyada user ko motivate karta hai. XP, levels, streaks aur badges user ko regularly app use karne ke liye encourage karte hain. Real productivity apps mein bhi aise features hote hain.',
    ],
  ];

  vivaQuestions.forEach(([q, a]) => {
    sections.push(...qna(q, a));
  });

  // FOOTER
  sections.push(
    new Paragraph({ pageBreakBefore: true }),
    heading('10. Quick Revision Cheat Sheet'),
    para('React = UI library | Hooks = useState, useEffect, useCallback, useMemo, useRef'),
    para('Local Storage Keys = goalflow_goals, goalflow_activity, goalflow_gamification, goalflow_theme'),
    para('XP = Low:10, Medium:20, High:30 | Levels = 0, 100, 250, 500, 1000 XP'),
    para('Components = 15+ reusable | Custom Hooks = 4 | Utils = 3 files'),
    para('No Backend | No Firebase | No Auth | Data in Browser Local Storage'),
    para('Run = npm install → npm start → localhost:3000'),
    new Paragraph({ spacing: { before: 400 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: '— All the Best for Your Viva! —', bold: true, size: 28, color: '2563EB' })],
    })
  );

  const doc = new Document({
    sections: [{ properties: {}, children: sections }],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(__dirname, '..', 'GoalFlow_Project_Viva_Guide.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log('Document created:', outputPath);
}

main().catch(console.error);
