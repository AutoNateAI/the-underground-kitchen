# The Underground Kitchen 🍔

**Grand Rapids' Next-Generation Burger Joint**

A modern, glassmorphic web experience built with Next.js 14, Firebase, and Tailwind CSS.

## 🎯 Features

- **Stunning Glassmorphic UI** - Next-gen design with glass effects and smooth animations
- **Menu Management** - Dynamic menu with categories, filtering, and search
- **Lead Capture** - Catering and general inquiry forms with Firebase integration
- **Community Hub** - Blog and podcast content system
- **Firebase Backend** - Firestore, Authentication, Storage, and Cloud Functions
- **SEO Optimized** - Local business schema, meta tags, and sitemap
- **Fully Responsive** - Mobile-first design that works on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Firebase CLI installed (`npm install -g firebase-tools`)
- A Firebase project created

### Installation

```bash
# Install dependencies
npm install

# Install functions dependencies
cd functions && npm install && cd ..

# Copy environment file
cp .env.example .env.local

# Add your Firebase credentials to .env.local
```

### Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or select existing one
3. Get your Firebase config from Project Settings
4. Add credentials to `.env.local`

### Run Development Server

```bash
# Start Next.js dev server
npm run dev

# In another terminal, start Firebase emulators
firebase emulators:start
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
food/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── page.tsx           # Homepage
│   │   ├── menu/              # Menu pages
│   │   ├── catering/          # Catering page with lead form
│   │   ├── community/         # Blog & podcast hub
│   │   │   ├── b/[slug]/     # Blog post detail
│   │   │   └── p/[slug]/     # Podcast episode detail
│   │   ├── contact/           # Contact page
│   │   ├── about/             # About page
│   │   └── api/
│   │       └── leads/         # Lead capture API
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Input.tsx
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── LeadForm.tsx
│   └── lib/
│       ├── firebase.client.ts  # Firebase client config
│       ├── firebase.admin.ts   # Firebase admin config
│       ├── types.ts           # TypeScript types
│       └── constants.ts       # Brand constants
├── functions/                  # Firebase Cloud Functions
│   └── src/
│       └── index.ts           # Lead notifications, RSS feeds
├── public/                    # Static assets
└── firebase.json              # Firebase configuration
```

## 🔥 Firebase Collections

- **`leads`** - Catering and general inquiries
- **`posts`** - Blog posts and podcast episodes
- **`menuCategories`** - Menu category organization
- **`menuItems`** - Individual menu items
- **`authors`** - Content authors/contributors
- **`testimonials`** - Customer reviews
- **`specials`** - Special offers

## 🎨 Design System

The site uses a custom glassmorphic design system with:

- **Glass effects** - Backdrop blur and transparency
- **Smooth animations** - Framer Motion powered transitions
- **Brand colors** - Orange/red gradient scheme
- **Responsive typography** - Scales beautifully across devices
- **Dark theme** - Modern dark aesthetic

## 📝 Environment Variables

```bash
# Firebase Client (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin (Server-side)
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# Brand
NEXT_PUBLIC_BRAND_NAME="The Underground Kitchen"
NEXT_PUBLIC_BRAND_PHONE="616.290.9198"
NEXT_PUBLIC_CITY="Grand Rapids, MI"

# Notifications
SENDGRID_API_KEY=
LEADS_NOTIFY_EMAIL=
SLACK_WEBHOOK_URL=

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🚢 Deployment

### Deploy to Firebase Hosting

```bash
# Build the Next.js app
npm run build

# Deploy everything
firebase deploy

# Or deploy specific services
firebase deploy --only hosting
firebase deploy --only functions
firebase deploy --only firestore:rules
```

## 📊 Adding Content

### Add Menu Items

```javascript
// In Firebase Console or via admin script
db.collection('menuCategories').add({
  title: 'Burgers',
  slug: 'burgers',
  order: 1
});

db.collection('menuItems').add({
  title: 'Beer City Bacon Stack',
  slug: 'beer-city-bacon-stack',
  categoryId: 'BURGERS',
  price: 13.50,
  description: 'Two smashed patties, crispy bacon, beer-cheese sauce',
  isFeatured: true,
  available: true
});
```

### Add Blog Post

```javascript
db.collection('posts').add({
  type: 'blog',
  title: 'Why Smash Burgers Are Superior',
  slug: 'why-smash-burgers',
  excerpt: 'The science behind the perfect crust...',
  body: '<p>Full HTML content here</p>',
  publishedAt: '2025-11-01T12:00:00Z',
  tags: ['technique', 'cooking']
});
```

### Add Podcast Episode

```javascript
db.collection('posts').add({
  type: 'podcast',
  title: 'Burger & Beer Pairings',
  slug: 'burger-beer-pairings',
  excerpt: 'Exploring the best local craft beers...',
  audioUrl: '/audio/episode-001.mp3',
  duration: 1180, // in seconds
  transcript: 'Full transcript text...',
  publishedAt: '2025-11-01T12:00:00Z',
  tags: ['pairings', 'local']
});
```

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Backend:** Firebase (Firestore, Auth, Storage, Functions, Hosting)
- **Validation:** Zod
- **Date Handling:** date-fns

## 📞 Support

**The Underground Kitchen**
- Phone: 616.290.9198
- Email: hello@undergroundkitchen.com
- Location: Grand Rapids, MI

## 📄 License

Private - The Underground Kitchen © 2025




