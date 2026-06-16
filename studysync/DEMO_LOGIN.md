# 🔐 StudySync - Demo Login Credentials

## Quick Login

The application now has **working demo authentication**! Use these credentials to log in:

### Demo Account 1 (Primary)
```
Email:    demo@studysync.com
Password: demo123
```

### Demo Account 2
```
Email:    rahul@studysync.com
Password: demo123
```

### Demo Account 3
```
Email:    priya@studysync.com
Password: demo123
```

---

## How to Login

### Method 1: Auto-Fill (Easiest)
1. Go to http://localhost:3000/login
2. Click the **"→ Click to auto-fill"** button in the blue banner
3. Click **"Sign in"**
4. You're in! 🎉

### Method 2: Copy-Paste
1. Go to http://localhost:3000/login
2. Copy the email from the banner: `demo@studysync.com`
3. Copy the password from the banner: `demo123`
4. Click **"Sign in"**
5. Done! ✅

### Method 3: Manual Type
1. Go to http://localhost:3000/login
2. Type: `demo@studysync.com`
3. Type: `demo123`
4. Click **"Sign in"**

---

## Features Now Working

### ✅ Login System
- Email/password authentication
- Error messages for invalid credentials
- Auto-redirect to dashboard after login
- Remember me functionality (UI ready)

### ✅ Register System
- Create new accounts
- Validation for all fields
- Password confirmation
- Study goal selection
- Auto-login after registration

### ✅ Protected Routes
- Dashboard, Rooms, Stats pages require login
- Auto-redirect to /login if not authenticated
- Session persists across page refreshes

### ✅ Logout
- Logout button in sidebar
- Clears session
- Redirects to login page
- Success toast notification

### ✅ User Display
- Shows current user name in topbar
- Shows username in topbar
- Shows user avatar (first letter of name)
- Shows current streak in sidebar

---

## What Happens After Login

1. **Redirected to Dashboard** - `/dashboard`
   - See your study stats
   - View live rooms
   - Check friends activity

2. **Full Navigation Access**
   - Browse Rooms (`/rooms`)
   - Join Study Rooms (`/rooms/1`)
   - View Stats (placeholder)
   - Check Leaderboard (placeholder)

3. **Real User Experience**
   - Your name appears in topbar
   - Your streak shows in sidebar
   - All features unlocked

---

## Registration Flow

Want to create a new account?

1. Go to http://localhost:3000/register
2. Fill in the form:
   - Full Name
   - Username
   - Email
   - Password (min 6 chars)
   - Confirm Password
   - Study Goal (select from dropdown)
   - Institution (optional)
3. Check the terms checkbox
4. Click **"Create Account"**
5. Auto-logged in and redirected to dashboard!

---

## Session Management

### How It Works
- Uses **localStorage** for demo purposes
- Stores user info and token
- Persists across page refreshes
- Cleared on logout

### Check Your Session
Open browser DevTools → Application → Local Storage:
- `studysync_user` - Your user data
- `studysync_token` - Your auth token

---

## Troubleshooting

### "Nothing happens when I click Sign in"
- Check the console for errors
- Make sure you're using the exact credentials
- Try the auto-fill button
- Refresh the page and try again

### "Redirected back to login"
- Your session might have expired
- Login again with demo credentials
- Check if localStorage is enabled

### "Can't access dashboard"
- Make sure you're logged in
- Check URL: should be `/dashboard` not `/`
- Try logout and login again

---

## Demo Users Profiles

### Demo User 1 - Navaneeth Kumar
- **Email:** demo@studysync.com
- **Goal:** JEE Preparation
- **Streak:** 14 days 🔥
- **Username:** @navaneeth

### Demo User 2 - Rahul Sharma
- **Email:** rahul@studysync.com
- **Goal:** NEET Preparation
- **Streak:** 7 days
- **Username:** @rahul

### Demo User 3 - Priya Patel
- **Email:** priya@studysync.com
- **Goal:** CAT Preparation
- **Streak:** 21 days 🔥
- **Username:** @priya

---

## Next Steps After Login

1. **Explore Dashboard**
   - See your stats
   - Click on live rooms

2. **Browse Rooms**
   - Filter by topic
   - Search for rooms
   - Join a room

3. **Experience THE ROOM**
   - Go to `/rooms/1`
   - Click "Start Focus Session"
   - Watch the timer animate
   - Try Focus Lock mode

4. **Try Logout**
   - Click logout in sidebar
   - Verify redirect to login
   - Login again

---

## Mobile Experience

The login page is now fully responsive:
- ✅ Touch-friendly buttons
- ✅ Proper spacing on small screens
- ✅ Auto-fill works on mobile
- ✅ Keyboard-friendly inputs
- ✅ Swipe-friendly navigation

---

## Security Note

⚠️ **This is a DEMO authentication system** for development only.

In production, you'll need:
- NextAuth.js for secure authentication
- JWT tokens from backend
- Password hashing (bcrypt)
- HTTPS/SSL
- CSRF protection
- Rate limiting

The current system:
- ✅ Shows the flow and UX
- ✅ Perfect for demos and development
- ✅ Works without backend
- ❌ Not secure for production
- ❌ Passwords stored in plain text
- ❌ No encryption

---

## Quick Commands

### Start the App
```bash
cd studysync
pnpm dev
```

### Test Login Flow
1. Open http://localhost:3000
2. Click auto-fill
3. Click sign in
4. Explore dashboard
5. Click logout
6. Repeat!

---

**🎉 You're all set! Enjoy exploring StudySync!**

---

**Last Updated:** June 15, 2026  
**Status:** Demo Auth Working ✅  
**Mobile Responsive:** Yes ✅

