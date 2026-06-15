# StudySync 📚

**Real-time Collaborative Study Platform for Students**

Study together. Focus deeper. A purposefully designed focus environment combining real-time collaboration, Pomodoro timers, whiteboards, and accountability.

## 🎯 Overview

StudySync is a next-generation study platform where students:
- Join topic-based study rooms with live participants
- Stay focused with synchronized Pomodoro timers  
- Collaborate on whiteboards and shared notes
- Track study streaks and compete on leaderboards
- Hold each other accountable in real-time

**Target Users:** College students, competitive exam aspirants (JEE, NEET, UPSC, CAT), self-learners aged 16–26

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + CSS Variables
- **UI Components:** Radix UI + shadcn/ui
- **Real-time:** Socket.io Client
- **Animations:** Framer Motion
- **Whiteboard:** Excalidraw (collaborative canvas)
- **Rich Text:** Tiptap (shared notes editor)
- **State Management:** Zustand + React Query
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts

### Backend (To be built)
- **Runtime:** Node.js 20+
- **Framework:** Express.js + TypeScript
- **Real-time:** Socket.io Server
- **Database:** MongoDB + Mongoose
- **Caching:** Redis (ioredis)
- **Auth:** NextAuth.js v5
- **File Upload:** Multer + Cloudinary
- **Email:** Nodemailer

## 🎨 Design System: "Deep Focus Aurora"

StudySync's aesthetic is built around a **late-night study environment** with:
- Near-black backgrounds with living, breathing aurora gradients
- Animated radial gradient shifting between deep violet, teal, and indigo
- Minimal, precise UI that lets the aurora do the emoting
- Custom color palette optimized for extended study sessions

### Color Palette
```css
/* Backgrounds */
--bg-base:     #080B14  /* deepest dark */
--bg-surface:  #0D1120  /* cards, panels */
--bg-elevated: #141826  /* modals, dropdowns */

/* Aurora Accents */
--aurora-violet: #7C3AED
--aurora-teal:   #0EA5E9
--aurora-mint:   #10B981
--aurora-rose:   #F43F5E
--aurora-amber:  #F59E0B
```

## 📁 Project Structure

```
studysync/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── (main)/            # Main application (to be built)
│   │   ├── dashboard/
│   │   ├── rooms/
│   │   ├── leaderboard/
│   │   └── stats/
│   ├── globals.css        # Design system + aurora animation
│   ├── layout.tsx
│   └── providers.tsx
├── components/            # React components (to be built)
├── lib/                   # Utilities & config
│   ├── constants.ts      # Topics, sounds, achievements
│   └── utils.ts          # Helper functions
├── types/                 # TypeScript type definitions
│   ├── user.types.ts
│   ├── room.types.ts
│   ├── socket.types.ts
│   └── timer.types.ts
└── server/                # Backend Express server (to be built)
```

## ✅ What's Been Built (Phase 1)

### ✓ Project Foundation
- [x] Next.js 14 project initialized with TypeScript
- [x] Tailwind CSS configured with custom design system
- [x] All dependencies installed (Socket.io, Excalidraw, Tiptap, etc.)
- [x] Environment variables setup (.env.local, .env.example)
- [x] Git ignore configured

### ✓ Design System
- [x] **Deep Focus Aurora** CSS variables defined
- [x] Aurora background animation (CSS-only, 20s loop)
- [x] Custom color palette for dark theme
- [x] Typography system (Plus Jakarta Sans + JetBrains Mono)
- [x] Utility classes (gradients, glass effects, focus rings)
- [x] Custom scrollbar styling

### ✓ Type Definitions
- [x] User types (profile, preferences, streak tracking)
- [x] Room types (configuration, state, participants)
- [x] Socket.io event interfaces (client ↔ server)
- [x] Timer types (phases, sessions, study sessions)

### ✓ Core Library
- [x] Constants (topics, sounds, Pomodoro presets, achievements)
- [x] Utility functions (time formatting, streak calculation, debounce/throttle)
- [x] Topic color mapping
- [x] Validation helpers

### ✓ Authentication UI
- [x] Login page with aurora background
- [x] Animated floating context cards
- [x] Google OAuth button placeholder
- [x] Email/password form with proper styling
- [x] Responsive design
- [x] Framer Motion animations

### ✓ Development Setup
- [x] Next.js dev server running on http://localhost:3000
- [x] React Query configured for server state
- [x] NextAuth session provider setup
- [x] Sonner toast notifications configured

## 🔨 Next Steps (Phase 2-5)

### Phase 2: Complete Auth & Navigation
- [ ] Register page with goal selection
- [ ] NextAuth.js configuration (Credentials + Google OAuth)
- [ ] Main layout with sidebar
- [ ] Protected routes middleware
- [ ] User profile endpoints

### Phase 3: Core Room Experience
- [ ] Room browsing & discovery page
- [ ] Create room modal with topic selection
- [ ] **THE ROOM PAGE** (heart of the product):
  - [ ] 3-panel layout (participants, center, chat)
  - [ ] Pomodoro timer with animated SVG ring
  - [ ] Timer sync logic (synced vs individual modes)
  - [ ] Participant panel with live presence
  - [ ] Chat with reactions
  - [ ] Excalidraw whiteboard integration
  - [ ] Tiptap collaborative notes
  - [ ] Ambient sound mixer (Web Audio API)
  - [ ] Focus Lock mode
  - [ ] Session summary modal

### Phase 4: Backend & Real-time
- [ ] Express.js server setup
- [ ] MongoDB models (User, Room, StudySession, Message, Achievement)
- [ ] Socket.io server with event handlers
- [ ] Redis integration for room state & presence
- [ ] REST API endpoints
- [ ] Authentication middleware
- [ ] Rate limiting & security

### Phase 5: Stats & Gamification
- [ ] Dashboard with live rooms & stats
- [ ] Study stats page with heatmap
- [ ] Leaderboard (weekly, monthly, all-time)
- [ ] Achievement system & unlock logic
- [ ] Streak tracking & notifications
- [ ] Profile pages

## 🛠️ Development

### Prerequisites
- Node.js 20+
- pnpm 8+
- MongoDB (local or Atlas)
- Redis (local or cloud)

### Getting Started

1. **Install dependencies:**
```bash
pnpm install
```

2. **Configure environment variables:**
Copy `.env.example` to `.env.local` and fill in your values:
```bash
cp .env.example .env.local
```

3. **Run development server:**
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the login page.

4. **Start backend server (when built):**
```bash
cd server
pnpm dev
```

### Available Scripts

- `pnpm dev` - Start Next.js development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🎯 Key Features to Implement

### Real-time Collaboration
- **Synchronized Timers:** All participants follow the same Pomodoro session
- **Live Presence:** See who's focusing, on break, or idle
- **Collaborative Whiteboard:** Excalidraw with real-time cursors
- **Shared Notes:** Tiptap with operational transforms (Yjs)

### Study Tools
- **Pomodoro Timer:** Customizable focus/break durations
- **Ambient Sounds:** Rain, café, library, white noise (Web Audio API)
- **Focus Lock:** Full-screen distraction-free mode
- **Session Tracking:** Auto-save completed study sessions

### Gamification
- **Streak System:** Daily study streaks with fire emoji
- **Achievements:** 12+ unlockable badges (Night Owl, Marathon, etc.)
- **Leaderboards:** Weekly/monthly rankings by study hours
- **Study Stats:** Heatmap, charts, subject breakdown

### Social Features
- **Friends System:** Add friends, see their activity
- **Room Discovery:** Browse by topic, see live participant count
- **Public & Private Rooms:** Password-protected study groups
- **Real-time Chat:** Messages with emoji reactions

## 🎨 Design Principles

1. **The Aurora Guides:** The animated background is the signature element, not just decoration
2. **Dark by Default:** No light mode - optimized for late-night study sessions
3. **The Room is King:** Every page feeds users into the room experience
4. **Real-time First:** Socket.io drives all interactions, not just chat
5. **Focus Over Features:** Every design decision serves deep focus

## 📦 Key Dependencies

### Must-Have Libraries
- `next` - React framework with App Router
- `socket.io-client` - Real-time bidirectional communication
- `@excalidraw/excalidraw` - Collaborative whiteboard
- `@tiptap/react` + `yjs` - Rich text collaboration
- `framer-motion` - Smooth animations
- `zustand` - Lightweight state management
- `@tanstack/react-query` - Server state management
- `recharts` - Charts for study statistics

## 🔐 Security Considerations

- JWT tokens for authentication
- bcrypt for password hashing
- Helmet.js for HTTP headers
- CORS configuration
- Rate limiting on API endpoints
- Input validation with Zod
- MongoDB sanitization

## 🚀 Deployment

- **Frontend:** Vercel (recommended for Next.js)
- **Backend:** Railway or Render (Express + Socket.io)
- **Database:** MongoDB Atlas
- **Cache:** Redis Cloud (Upstash or Redis Labs)
- **File Storage:** Cloudinary

## 🎓 Philosophy

> "StudySync is not a chat app with a timer bolted on. It is a purposefully designed focus environment — the lovechild of Discord, Figma's multiplayer, and a library reading room."

Every feature must answer: **Does this help a student enter deep focus and stay there, together?**

## 📄 License

MIT

---

**Built with 🔥 for students who study better together**

