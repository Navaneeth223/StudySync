# 🚀 StudySync - Quick Start Guide

## Getting Started in 30 Seconds

1. **Development server is already running at:**
   ```
   http://localhost:3000
   ```

2. **Navigate through the app:**
   - Start at `/login` - See the beautiful aurora login page
   - Click "Sign up" → `/register` - Registration with goal selection
   - After "login" (no auth yet), you'll see → `/dashboard`
   - Click "Browse Rooms" → `/rooms` - Filter and search rooms
   - Click any "Join" button → `/rooms/1` - **THE CORE EXPERIENCE**

---

## 🎯 Key Pages to Visit

### 1. Login Page (`/login`)
**What you'll see:**
- Aurora gradient background (animated, 20s loop)
- Three floating glass cards drifting across screen
- StudySync logo with pulse animation
- Google OAuth button
- Email/password form
- Smooth Framer Motion animations

**What to try:**
- Watch the aurora shift colors
- Notice the floating cards move
- Hover over buttons for glow effects

---

### 2. Register Page (`/register`)
**What you'll see:**
- Same aurora background
- Larger form with 8 fields
- Study goal dropdown (JEE/NEET/UPSC/CAT/etc.)
- Institution field
- Two-column layout on desktop

**What to try:**
- Select a study goal
- Notice form validation
- Mobile responsive layout

---

### 3. Dashboard (`/dashboard`)
**What you'll see:**
- Welcome message with name
- Study streak prominently displayed (🔥 14 days)
- 4 stat cards (Today, Week, Streak, Sessions)
- Live rooms carousel (3 cards)
- Friends activity feed

**What to try:**
- Hover over room cards (scale animation)
- Notice the "LIVE" indicators pulsing
- Check out the stat comparisons

---

### 4. Browse Rooms (`/rooms`)
**What you'll see:**
- Topic filter pills with colors
- Search bar
- "Live Now" toggle
- Grid of room cards (3 columns)
- Participant avatars stacked
- Progress bars showing room capacity

**What to try:**
- Click topic filters (watch colors change)
- Toggle "Live Now"
- Search for "JEE"
- Hover over room cards (border glow)

---

### 5. Room Page (`/rooms/1`) ⭐ **MUST SEE**
**This is the heart of StudySync.**

**Layout:**
```
┌──────────────┬─────────────────┬──────────────┐
│ Participants │     Timer       │     Chat     │
│    (left)    │   (center)      │   (right)    │
└──────────────┴─────────────────┴──────────────┘
```

**What you'll see:**
- **Left Panel (Participants):**
  - List of 4 mock participants
  - Status indicators (🍅 Focusing, ☕ Break, 💤 Idle)
  - Sessions today counter
  - Quick stats at bottom

- **Center Panel (Timer):**
  - Animated SVG Pomodoro ring (280px)
  - "Start Focus Session" button
  - Session dots visualization
  - Tab navigation (Timer/Whiteboard/Notes)

- **Right Panel (Chat):**
  - Message list with avatars
  - System messages
  - Input with send button
  - Focus time overlay (dismissible)

**What to try:**
1. **Click "Start Focus Session"**
   - Watch the ring animate from 0 to full
   - Timer counts down (25:00 → 24:59...)
   - Ring glows with violet color
   - Pulse animation appears

2. **Click Pause**
   - Timer stops
   - Ring dims slightly
   - Button changes to "Resume"

3. **Click "Focus Lock" button** (top right, maximize icon)
   - Full-screen overlay appears
   - Only timer visible
   - "Emergency Exit" button at bottom
   - Immersive focus mode

4. **Switch tabs** (Timer/Whiteboard/Notes)
   - Smooth indicator animation
   - Placeholders for Whiteboard and Notes

5. **Send a chat message**
   - Type in input at bottom right
   - Click send button
   - Message appears in chat

6. **Watch the participants panel**
   - See status indicators
   - Hover over participants
   - Notice the organized layout

---

## 🎨 Design Elements to Notice

### The Aurora Background
- Opens DevTools → Elements → `<body class="aurora-bg">`
- Watch CSS animation: `aurora-shift 20s ease infinite`
- Background position shifts from 0% to 100% and back
- Three overlapping radial gradients at 8-18% opacity

### Topic Colors
Every topic has a consistent color:
- Mathematics = Violet `#7C3AED`
- Science = Teal `#0EA5E9`
- UPSC = Orange `#EA580C`

Look for these colors:
- Room card left border
- Topic badges
- Filter buttons

### Live Indicators
Pulsing green dots everywhere:
- Room cards ("LIVE" badge)
- Participant status
- Notifications
- CSS: `pulse-glow` class with keyframe animation

### Animations
- **Page transitions:** 350ms fade + slide up
- **Room cards:** Scale to 1.02 on hover
- **Buttons:** Scale to 0.95 on click
- **Sidebar indicator:** Spring animation (smooth!)
- **Timer ring:** Stroke-dashoffset with 1s linear transition

---

## 🔧 Code Structure to Explore

### Key Files
```
app/
├── (auth)/
│   ├── login/page.tsx              ← Beautiful aurora login
│   └── register/page.tsx           ← Registration form
├── (main)/
│   ├── dashboard/page.tsx          ← Stats & live rooms
│   ├── rooms/
│   │   ├── page.tsx                ← Browse & filter
│   │   └── [roomId]/page.tsx       ← THE ROOM ⭐
│   └── layout.tsx                  ← Sidebar + Topbar

components/
├── room/
│   ├── TimerPanel.tsx              ← Pomodoro logic
│   ├── ParticipantPanel.tsx        ← Live participants
│   └── ChatPanel.tsx               ← Real-time chat
├── timer/
│   ├── PomodoroRing.tsx            ← SVG animation
│   └── TimerControls.tsx           ← Play/Pause buttons
├── layout/
│   ├── Sidebar.tsx                 ← Navigation
│   └── Topbar.tsx                  ← Search & user
└── discover/
    └── RoomCard.tsx                ← Room cards

store/
├── useTimerStore.ts                ← Timer state
├── useRoomStore.ts                 ← Room state
└── useSoundStore.ts                ← Sound mixing

lib/
├── constants.ts                    ← Topics, sounds, achievements
└── utils.ts                        ← Helpers
```

### State Management
Open DevTools → Components → Zustand stores:
- `useTimerStore` - phase, timeRemaining, isRunning
- `useRoomStore` - currentRoom, participants
- `useSoundStore` - activeSounds, masterVolume

### CSS Variables
Open DevTools → Computed → Search for `--`:
- `--bg-base: #080B14` (deepest dark)
- `--aurora-violet: #7C3AED` (primary accent)
- `--text-primary: #EEF2FF` (main text)

---

## 🎯 What Works (Frontend Only)

### ✅ Fully Functional
- All page navigation
- Timer countdown (local state)
- Participant list display
- Chat message display
- Room filtering and search
- Topic color coding
- All animations
- Responsive layouts

### ⏳ Needs Backend
- User authentication
- Room persistence
- Message persistence
- Real-time sync across users
- Timer sync across participants
- Whiteboard collaboration
- Notes collaboration
- Sound synchronization

---

## 🚧 Placeholders

These pages exist but show "Coming soon":
- `/my-rooms` - Rooms I created or frequent
- `/leaderboard` - Weekly/monthly rankings
- `/stats` - Study heatmap and charts
- `/profile` - User profile
- `/settings` - User settings

---

## 🎪 Demo Script

**For showing StudySync to someone:**

1. **Start at login** (`/login`)
   > "This is StudySync - notice the aurora background. It's all CSS, no JavaScript. Watch it shift colors."

2. **Show register** (`/register`)
   > "Students select their study goal - JEE, NEET, UPSC, CAT. This personalizes their experience."

3. **Go to dashboard** (`/dashboard`)
   > "The dashboard shows their streak prominently - gamification is key. See the live rooms? Let's join one."

4. **Browse rooms** (`/rooms`)
   > "Filter by topic - each has its own color. See how Mathematics is always violet? That's consistent throughout."

5. **Join a room** (`/rooms/1`)
   > "This is the core experience. Left panel shows who's studying. Center is the Pomodoro timer. Right is chat."

6. **Start timer**
   > "Watch the ring animate. This is pure SVG with stroke-dashoffset. Notice the glow? That's the 'focus energy'."

7. **Enable Focus Lock**
   > "Full-screen mode blocks all distractions. You can't leave until the timer ends. That's accountability."

8. **Show chat**
   > "During focus time, chat is dimmed. But you can override it. We respect student autonomy."

---

## 💡 Pro Tips

1. **Open DevTools** and watch:
   - Network tab (no backend calls yet)
   - Console (clean, no errors)
   - React DevTools → Components → Zustand stores

2. **Resize window** to see:
   - Mobile sidebar drawer
   - Responsive room cards
   - Collapsing layouts

3. **Try different topics** in room browser:
   - Each has unique color
   - Consistent across badges, borders, filters

4. **Watch animations** in slow motion:
   - Open DevTools → Performance → Animations
   - See Framer Motion springs
   - Notice aurora shift

5. **Check accessibility**:
   - Tab through elements
   - Focus visible states
   - Keyboard navigation works

---

## 🐛 Known Issues

- Auth pages don't actually authenticate (UI only)
- Timer doesn't persist on page refresh (no backend)
- Chat messages don't save (mock data)
- No real users, all mocked
- Socket.io not connected

**These are intentional** - frontend MVP first, backend next.

---

## 📱 Mobile Testing

1. Open DevTools → Toggle device toolbar
2. Select "iPhone 12 Pro" or "iPad"
3. Navigate through pages
4. Click hamburger menu to open sidebar
5. Notice responsive layouts

---

## 🎨 Color Palette Quick Reference

```css
/* Backgrounds */
--bg-base:     #080B14  /* Main canvas */
--bg-surface:  #0D1120  /* Cards */
--bg-overlay:  #1A2030  /* Hover states */

/* Accents */
--aurora-violet: #7C3AED  /* Focus, primary */
--aurora-teal:   #0EA5E9  /* Secondary */
--aurora-mint:   #10B981  /* Success, break */
--aurora-rose:   #F43F5E  /* Danger, warning */

/* Text */
--text-primary:   #EEF2FF  /* Main text */
--text-secondary: #94A3B8  /* Secondary text */
--text-muted:     #475569  /* Muted text */
```

---

## 🎓 For Developers

### To Add a New Page
1. Create file: `app/(main)/your-page/page.tsx`
2. Add route to sidebar: `components/layout/Sidebar.tsx`
3. Use motion wrapper for animations
4. Follow existing patterns

### To Add a New Component
1. Create in appropriate folder: `components/room/YourComponent.tsx`
2. Use TypeScript interfaces
3. Follow naming conventions
4. Add to exports if needed

### To Modify Colors
1. Edit `app/globals.css` CSS variables
2. Colors are centralized
3. Use `var(--variable-name)` in components

### To Add State
1. Create Zustand store: `store/useYourStore.ts`
2. Follow existing patterns
3. Separate UI state from socket state

---

**Have fun exploring StudySync! 🔥**

Open http://localhost:3000 and dive in!

