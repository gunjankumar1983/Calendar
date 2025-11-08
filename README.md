
# 📅 Modern Calendar App (React + Vite)

A beautifully designed **interactive calendar application** with playful UI animations, conflict detection, event overview modal, and a mini-calendar sidebar — built using **React, Vite, TailwindCSS, and Day.js**.

---

## 🚀 Live Demo

🔗 **Live URL:** (add your deployed link here)

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 📆 Mosaic Calendar Layout | Unique dynamic height day-card layout for visual aesthetics |
| 🗂 Conflict Detection | Detects overlapping events and highlights them |
| 🟢 Event Preview | Displays events per day with colored chips |
| 🔍 Modal Event Viewer | Clicking a day shows all events for that date |
| 🗓 Mini Sidebar Calendar | Shows full month compact view (with Today highlight) |
| 🎨 Tailwind + Neumorphism | Smooth animations, soft shadows, modern gradients |
| ⚡ Vite Dev Server | Lightning-fast build & hot reload |

---

## 🛠 Tech Stack

| Technology | Used For |
|------------|----------|
| **React** | UI / Component logic |
| **Vite** | Build tool / dev server |
| **TailwindCSS** | Styling |
| **Day.js** | Date utilities |
| **JSON Mock Data** | Events storage (`events.json`) |

---

## 📦 Installation & Setup

### ✅ Clone the repository

```bash
git clone https://github.com/gunjankumar1983/calendar.git
cd calendar
```

### ✅ Install dependencies

```bash
npm install
```

### ✅ Run development environment

```bash
npm run dev
```

🌍 App will start at `http://localhost:5173/`

### ✅ Build for production

```bash
npm run build
```

### ✅ Preview production build

```bash
npm run preview
```

---

## 📁 Project Structure

```
calendar/
│── public/
│── src/
│   ├── components/
│   │   ├── MonthCalendar2.jsx
│   │   ├── HeaderBar.jsx
│   │   ├── ... more UI components
│   ├── data/events.json      # event data source
│   ├── App.jsx
│   ├── main.jsx
│── package.json
│── vite.config.js
└── README.md
```

---

## 🧩 Event Structure (editable)

Events are stored in `src/data/events.json`.

Example:

```json
{
  "id": 6,
  "title": "Project Discussion Meeting",
  "date": "2025-11-12",
  "time": "14:00",
  "durationMinutes": 120,
  "description": "Talk with team regarding final deployment."
}
```

---

## ✅ Demo Screenshots (Optional)

```
📷 Add screenshots here once deployed
```

---

## 🌐 Deploy Options

| Platform | Notes |
|----------|-------|
| ✅ Vercel (recommended) | Fastest deployment + automatic CI |
| GitHub Pages | Requires Vite config update |
| Netlify | Drag & drop `/dist` folder |

---

## 🤝 Contributing

1. Fork repo
2. Create branch
3. Commit changes
4. Open PR

---

## 📜 License

MIT License

---

⭐ If you like this project, give it a star on GitHub!  
👉 https://github.com/gunjankumar1983/calendar

