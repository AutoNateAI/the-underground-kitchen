All right. We're about to build a... a website, but first off, you just kind of about to just take in information as a provide the context for you to be able to build the Okay. website that I'm looking for. This website is a website for a catering business, a local catering business. It has a bunch of different options and whatnot. I'm about to provide you a ridiculous amount of information But basically we are trying to build a community of, of people, not only are they buying our food, but Somehow, someway, we are providing something that just keeps them engaged throughout the day and then they naturally just come to buying food from us because they understand that part. Food is a very important part of human nature. Every single day people are eating. We can hit With this website and this design at a pretty deep level to where people want to mess with us from a. From a from a like a real hard like life perspective, human perspective, but also understand we also provide food, really good tasting food and whatnot. So give me some questions that I should prime my brain with. I should prime my client with so that I can. get the correct information out so that we can produce a website like this that we can continue to produce more and more content on. Build more and more recipes on just, you know, blogs about different things going on. Even probably have blogs about different food places in the town, just and how it compared to our food, all types of things. I put all this together. understand this and then give me a set of questions that will really prime my brain and my client's brain to produce the information we need. to get you to build the optimal website.
You said:
Alright, so we have solidified. I appreciate all the questions you asked, but we kind of handled on that we're trying to become a burger joint in Grand Rapids, Michigan, a local burger joint. Now, given everything that we just discussed before, now run this analysis and do some creation for me.
You said:
give me the website arch. we are using firebase as the backend and we want to accept leads. also, he wants to have a blog/podcasts to give data to his community daily that also works as inadvernet advertisment. some blogs will be podcasts and blog while other blogs will be just blog (text and images)
You said:
bet, you got it. Now this business is called The Underground Kitchen, phone number 616.290.9198. lets make this happen !
# The Underground Kitchen — Firebase Starter Kit

Grand Rapids burger joint • Phone: **616.290.9198** • Stack: **Next.js 14 (App Router) + Firebase (Auth, Firestore, Storage, Functions, Hosting)**

This starter kit wires up:

* Content model for **Menu**, **Posts** (blog + podcast), **Leads**, etc.
* **Lead capture** with email/Slack notifications
* **RSS feeds** (blog + podcast) and **sitemap** generation
* Access-controlled **Admin** basics
* Local SEO + JSON-LD

> Brand constants already set to: **The Underground Kitchen** (TUK) • **616.290.9198**

---

## 0) Project Setup

```bash
# 1) Create app
npx create-next-app@latest tuk-web --use-npm --ts --eslint --app --tailwind
cd tuk-web

# 2) Add deps
npm i firebase firebase-admin zod date-fns remark remark-html gray-matter
npm i algoliasearch # optional search index
npm i next-sitemap # optional CLI sitemap

# 3) Functions (in subdir)
npm i -g firebase-tools
firebase init # choose: Firestore, Functions (TypeScript), Hosting, Storage, Emulators
```

**.env.local (Next.js)**

```ini
NEXT_PUBLIC_BRAND_NAME="The Underground Kitchen"
NEXT_PUBLIC_BRAND_PHONE="616.290.9198"
NEXT_PUBLIC_CITY="Grand Rapids, MI"
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# Server-side
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
SENDGRID_API_KEY=...
LEADS_NOTIFY_EMAIL="leads@undergroundkitchen.com"
SLACK_WEBHOOK_URL=...
SITE_URL="https://undergroundkitchen.com"
```

---

## 1) Firestore Data Model (Collections)

```
/menuCategories/{categoryId}
/menuItems/{itemId}
/posts/{postId}            # type: "blog" | "podcast"
/authors/{authorId}
/leads/{leadId}
/specials/{specialId}
/locations/{locationId}
/testimonials/{testimonialId}
```

**TypeScript interfaces (shared)** — `src/lib/types.ts`

```ts
export type PostType = 'blog' | 'podcast';

export interface MenuCategory { id: string; title: string; slug: string; order: number; }
export interface MenuItem {
  id: string; title: string; slug: string; categoryId: string; price: number;
  description?: string; dietary?: string[]; photoUrl?: string; isFeatured?: boolean; available?: boolean;
}
export interface Author { id: string; displayName: string; bio?: string; headshotUrl?: string; socials?: Record<string,string>; }
export interface Post {
  id: string; type: PostType; title: string; slug: string; excerpt?: string; body?: string; coverImageUrl?: string;
  audioUrl?: string; duration?: number; transcript?: string; tags?: string[]; authorId?: string; publishedAt?: string;
  seo?: { metaTitle?: string; metaDescription?: string; ogImageUrl?: string };
}
export type LeadStatus = 'new'|'in_progress'|'won'|'lost';
export interface Lead {
  id: string; type: 'catering'|'general'|'career'; name: string; email: string; phone?: string; message?: string;
  eventDate?: string; headcount?: number; budgetRange?: string; source?: string; createdAt: string; status: LeadStatus;
}
```

---

## 2) Firebase Client & Admin Init

`src/lib/firebase.client.ts`

```ts
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!
};

export const app = getApps().length ? getApps()[0] : initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

`src/lib/firebase.admin.ts`

```ts
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
  });
}
export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
```

---

## 3) Firestore Security Rules (PII-aware)

`firestore.rules`

```ruby
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isSignedIn() { return request.auth != null; }
    function hasRole(r) { return isSignedIn() && r in request.auth.token.roles; }
    function isEditor() { return hasRole('editor') || hasRole('admin'); }

    // Public content (read-only)
    match /posts/{id} { allow read: if true; allow write: if isEditor(); }
    match /menuItems/{id} { allow read: if true; allow write: if isEditor(); }
    match /menuCategories/{id} { allow read: if true; allow write: if isEditor(); }
    match /specials/{id} { allow read: if true; allow write: if isEditor(); }
    match /locations/{id} { allow read: if true; allow write: if isEditor(); }
    match /testimonials/{id} { allow read: if true; allow write: if isEditor(); }

    // Leads — create publicly; restrict reads to staff
    match /leads/{id} {
      allow create: if true;
      allow read, update, delete: if isEditor();
    }

    // Authors require editor
    match /authors/{id} { allow read: if true; allow write: if isEditor(); }
  }
}
```

---

## 4) Next.js App Router — Routes

```
src/app/
  layout.tsx
  page.tsx                         # Home
  menu/page.tsx
  order/page.tsx
  catering/page.tsx
  community/page.tsx               # index with filters
  community/b/[slug]/page.tsx      # blog post
  community/p/[slug]/page.tsx      # podcast post
  about/page.tsx
  contact/page.tsx
  admin/page.tsx                   # gate by role; simple CMS starter
  api/
    leads/route.ts                 # POST lead
    rss/blog/route.ts              # GET blog RSS
    rss/podcast/route.ts           # GET podcast RSS
    sitemap/route.ts               # GET sitemap.xml
```

**Home hero snippet** `src/app/page.tsx`

```tsx
export default async function Home() {
  const brand = process.env.NEXT_PUBLIC_BRAND_NAME;
  const phone = process.env.NEXT_PUBLIC_BRAND_PHONE;
  return (
    <main className="mx-auto max-w-6xl p-6 space-y-12">
      <section className="flex flex-col gap-4">
        <h1 className="text-4xl md:text-6xl font-extrabold">
          {brand}: Grand Rapids’ Neighborhood Burger Joint
        </h1>
        <p className="text-lg">Call us: {phone}</p>
        <div className="flex gap-3">
          <a className="btn" href="/order">Order Now</a>
          <a className="btn-outline" href="/catering">Book Catering</a>
        </div>
      </section>
    </main>
  );
}
```

**Lead API** `src/app/api/leads/route.ts`

```ts
import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase.admin';
import { z } from 'zod';

const LeadSchema = z.object({
  type: z.enum(['catering','general','career']),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().optional(),
  eventDate: z.string().optional(),
  headcount: z.number().optional(),
  budgetRange: z.string().optional(),
  source: z.string().optional()
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = LeadSchema.parse(body);
    const doc = await adminDb.collection('leads').add({
      ...data,
      status: 'new',
      createdAt: new Date().toISOString()
    });
    return NextResponse.json({ id: doc.id }, { status: 201 });
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
```

**Lead Form (client)** `src/components/LeadForm.tsx`

```tsx
'use client';
import { useState } from 'react';

export default function LeadForm({ type = 'catering' as 'catering'|'general'|'career' }) {
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = new FormData(e.currentTarget);
    const payload: any = Object.fromEntries(form.entries());
    payload.type = type;
    const res = await fetch('/api/leads', { method: 'POST', body: JSON.stringify(payload) });
    setStatus(res.ok ? 'sent' : 'error');
  }
  return (
    <form onSubmit={submit} className="space-y-3">
      <input name="name" required placeholder="Your Name" className="input" />
      <input name="email" required type="email" placeholder="Email" className="input" />
      <input name="phone" placeholder="Phone" className="input" />
      {type==='catering' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input name="eventDate" type="date" className="input" />
          <input name="headcount" type="number" placeholder="Headcount" className="input" />
          <input name="budgetRange" placeholder="Budget (e.g. $12–$18)" className="input" />
        </div>
      )}
      <textarea name="message" rows={4} placeholder="Tell us about your event" className="textarea" />
      <button className="btn" disabled={status==='sending'}>
        {status==='sending' ? 'Sending…' : 'Send'}
      </button>
      {status==='sent' && <p className="text-green-600">Got it! We’ll be in touch soon.</p>}
      {status==='error' && <p className="text-red-600">Something went wrong. Try again.</p>}
    </form>
  );
}
```

**Catering page uses LeadForm** `src/app/catering/page.tsx`

```tsx
import LeadForm from '@/components/LeadForm';
export default function CateringPage(){
  return (
    <main className="mx-auto max-w-4xl p-6 space-y-6">
      <h1 className="text-4xl font-bold">Book Catering</h1>
      <p>Fuel your crew with The Underground Kitchen — Grand Rapids’ burger pros.</p>
      <LeadForm type="catering" />
    </main>
  );
}
```

---

## 5) Cloud Functions — Notifications, RSS, Sitemap

`functions/src/index.ts`

```ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import fetch from 'node-fetch';

admin.initializeApp();
const db = admin.firestore();

export const onLeadCreate = functions.firestore.document('leads/{id}').onCreate(async (snap) => {
  const lead = snap.data();
  // Send Slack
  if (process.env.SLACK_WEBHOOK_URL) {
    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `New lead: ${lead.type} — ${lead.name} <${lead.email}>\nEvent: ${lead.eventDate || 'n/a'} | Headcount: ${lead.headcount || 'n/a'}`
      })
    });
  }
  // Send Email (SendGrid)
  if (process.env.SENDGRID_API_KEY && process.env.LEADS_NOTIFY_EMAIL) {
    await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: process.env.LEADS_NOTIFY_EMAIL }] }],
        from: { email: 'no-reply@undergroundkitchen.com', name: 'The Underground Kitchen' },
        subject: `New Lead: ${lead.type} — ${lead.name}`,
        content: [{ type: 'text/html', value: `<h3>New ${lead.type} lead</h3><pre>${JSON.stringify(lead, null, 2)}</pre>` }]
      })
    });
  }
});

// Build RSS helpers
function rssItem(p:any){
  return `<item><title>${p.title}</title><link>${process.env.SITE_URL}/community/${p.type==='podcast'?'p':'b'}/${p.slug}</link><pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate><guid>${p.id}</guid></item>`;
}

export const rssBlog = functions.https.onRequest(async (_req, res) => {
  const snap = await db.collection('posts').where('type','==','blog').orderBy('publishedAt','desc').limit(50).get();
  const items = snap.docs.map(d=>rssItem({ id:d.id, ...d.data() }));
  res.set('Content-Type','application/rss+xml');
  res.send(`<?xml version="1.0"?><rss version="2.0"><channel><title>TUK Blog</title><link>${process.env.SITE_URL}</link>${items.join('')}</channel></rss>`);
});

export const rssPodcast = functions.https.onRequest(async (_req, res) => {
  const snap = await db.collection('posts').where('type','==','podcast').orderBy('publishedAt','desc').limit(50).get();
  const items = snap.docs.map(d=>rssItem({ id:d.id, ...d.data() }));
  res.set('Content-Type','application/rss+xml');
  res.send(`<?xml version="1.0"?><rss version="2.0"><channel><title>TUK Podcast</title><link>${process.env.SITE_URL}</link>${items.join('')}</channel></rss>`);
});

export const sitemap = functions.https.onRequest(async (_req, res) => {
  const base = process.env.SITE_URL;
  const staticUrls = ['','/menu','/order','/catering','/community','/about','/contact'].map(u=>`${base}${u}`);
  const posts = await db.collection('posts').orderBy('publishedAt','desc').get();
  const postUrls = posts.docs.map(d=>{
    const p = d.data();
    const path = `/community/${p.type==='podcast'?'p':'b'}/${p.slug}`;
    return `${base}${path}`;
  });
  res.set('Content-Type','application/xml');
  res.send(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...staticUrls, ...postUrls].map(u=>`<url><loc>${u}</loc></url>`).join('')}</urlset>`);
});
```

**Next.js edge routes to Functions (optional)**

* Map `/rss/blog.xml` → `rssBlog`
* Map `/rss/podcast.xml` → `rssPodcast`
* Map `/sitemap.xml` → `sitemap`

---

## 6) Community Pages (Blog + Podcast)

**Community index** `src/app/community/page.tsx`

```tsx
import { adminDb } from '@/lib/firebase.admin';
export const revalidate = 60;
export default async function CommunityIndex({ searchParams }: any) {
  const type = searchParams?.type as 'blog'|'podcast'|undefined;
  let ref = adminDb.collection('posts');
  if (type) ref = ref.where('type','==',type);
  const snap = await ref.orderBy('publishedAt','desc').limit(20).get();
  const posts = snap.docs.map(d=>({ id:d.id, ...d.data() } as any));
  return (<main className="mx-auto max-w-5xl p-6 grid gap-6">{/* render cards */}</main>);
}
```

**Blog page** `src/app/community/b/[slug]/page.tsx` and **Podcast page** `src/app/community/p/[slug]/page.tsx` are similar; podcast adds audio player + transcript block.

---

## 7) Local SEO & JSON-LD

`src/app/layout.tsx` (inject structured data)

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const name = process.env.NEXT_PUBLIC_BRAND_NAME!;
  const phone = process.env.NEXT_PUBLIC_BRAND_PHONE!;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name, telephone: phone, address: { '@type':'PostalAddress', addressLocality:'Grand Rapids', addressRegion:'MI', addressCountry:'US' }
  };
  return (
    <html lang="en"><body>
      {children}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </body></html>
  );
}
```

---

## 8) Minimal Admin Gate & Roles

`src/app/admin/page.tsx`

```tsx
import { cookies } from 'next/headers';
// Placeholder: implement Firebase Auth client and custom claims for roles.
export default function Admin(){
  return <main className="p-6">Admin — soon: post editor, media, leads board.</main>;
}
```

> Use Firebase custom claims `{ roles: ['editor'] }` for staff. Lock writes in rules.

---

## 9) Styling Helpers (Tailwind)

`src/styles/globals.css`

```css
@tailwind base; @tailwind components; @tailwind utilities;
.btn { @apply inline-flex items-center rounded-xl px-4 py-2 font-semibold shadow hover:opacity-90 bg-black text-white; }
.btn-outline { @apply inline-flex items-center rounded-xl px-4 py-2 font-semibold border border-black; }
.input { @apply w-full rounded-xl border p-3; }
.textarea { @apply w-full rounded-xl border p-3; }
```

---

## 10) Sample Seed Docs

**MenuCategory**

```json
{ "title":"Burgers","slug":"burgers","order":1 }
```

**MenuItem**

```json
{ "title":"Beer City Bacon Stack","slug":"beer-city-bacon-stack","categoryId":"BURGERS","price":13.5,"description":"Two smashed patties, crispy bacon, beer-cheese sauce." }
```

**Post (blog)**

```json
{ "type":"blog","title":"Behind the Grill: Why Smash Burgers","slug":"why-smash-burgers","excerpt":"Science of crust.","publishedAt":"2025-10-31T15:00:00Z" }
```

**Post (podcast)**

```json
{ "type":"podcast","title":"Burger + Beer Pairings in GR","slug":"burger-beer-pairings","audioUrl":"/audio/podcasts/pairings.mp3","duration":1180,"publishedAt":"2025-11-03T12:00:00Z" }
```

---

## 11) Deploy Notes

```bash
# Emulators for local dev
firebase emulators:start

# Build and deploy
npm run build && firebase deploy
```

* Map hosting rewrites so `/api/*` stays on Next.js server; `/rss/*` and `/sitemap.xml` can point to Cloud Functions or to Next routes.
* Ensure CORS for Functions if calling directly from client (here we call via Next server only).

---

## 12) Roadmap Next

* WYSIWYG editor (TipTap) for posts + Storage image upload
* Audio Storage upload + duration extraction
* Algolia/Meilisearch indexing on `posts` write
* Newsletter form (Klaviyo/ConvertKit) + weekly digest job
* Loyalty stub (points per order via integration)
* Multi-location support

---

**You’re live to start building**: brand constants are set to **The Underground Kitchen** and phone to **616.290.9198**. Wire your Firebase project IDs, deploy, and start publishing daily blog/podcast content as built-in community fuel.🍔🔥
Locked and loaded. I dropped a full Firebase + Next.js starter kit for The Underground Kitchen—with your name and phone baked in—on the canvas to your right. It includes:

Firestore schema, security rules, and shared TypeScript types

App Router routes for /, /menu, /order, /catering, /community (blogs + podcasts), /about, /contact, /admin

Lead capture API + client form, plus Cloud Functions to notify via email/Slack

Auto-generated RSS feeds (blog + podcast) and sitemap

Local SEO JSON-LD for a Grand Rapids restaurant

Env template and deploy steps

Next concrete moves:

Paste your Firebase creds into .env.local.

Run the emulators, submit a test catering lead, and confirm Slack/email notifications.

Publish your first two blog posts and one podcast episode to light up /community.

Want me to add a simple admin post editor (TipTap) and a minimal audio player skin next?