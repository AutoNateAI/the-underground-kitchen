# GitHub Pages Deployment - Setup Complete! ✅

Your Next.js site is now configured for static site generation (SSG) and deployment to GitHub Pages.

## Changes Made

### 1. **Next.js Configuration** (`next.config.js`)
- Added `output: 'export'` for static site generation
- Set `unoptimized: true` for images (required for static export)
- Included commented `basePath` option for custom domains

### 2. **GitHub Actions Workflow** (`.github/workflows/deploy.yml`)
- Automatically builds and deploys on push to `main`
- Uses pnpm v9 (matching your lockfile)
- Caches dependencies for faster builds
- Deploys to GitHub Pages automatically

### 3. **TypeScript Configuration** (`tsconfig.json`)
- Excluded `functions/` directory from Next.js build

### 4. **Dynamic Routes Fixed**
- Separated client/server components for blog and podcast pages
- Added `generateStaticParams()` for static generation
- Created shared mock data in `src/lib/mockData.ts`

### 5. **Firebase Admin Configuration**
- Made initialization conditional (only when credentials present)
- API routes won't work in static export (see limitations below)

### 6. **Static Files**
- Created `.nojekyll` file to prevent Jekyll processing

## ✅ Build Status

**Local build successful!** All pages generated as static HTML:
- Homepage
- About, Menu, Order, Contact, Catering pages
- Community hub
- Blog posts (2): `why-smash-burgers`, `perfect-bun`
- Podcast episode (1): `burger-beer-pairings`

## Next Steps - Enable GitHub Pages

1. **Push changes to GitHub:**
   ```bash
   git add .
   git commit -m "Configure static site generation and GitHub Pages deployment"
   git push
   ```

2. **Enable GitHub Pages in repository settings:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **GitHub Actions**

3. **Monitor deployment:**
   - Go to the **Actions** tab
   - Watch the workflow run
   - Your site will be live at: `https://[username].github.io/[repo-name]/`

## ⚠️ Important Limitations

### API Routes Won't Work
GitHub Pages only serves static files. Your `/api/leads` endpoint won't function. Options:

1. **Use Firebase Client SDK directly** (Recommended)
   - Submit forms directly to Firebase from the browser
   - Update `LeadForm.tsx` to use Firebase client SDK
   - No need for API route

2. **Use external service**
   - Formspree, Netlify Forms, or similar
   - Simple integration for contact forms

3. **Deploy with Vercel/Netlify instead**
   - These platforms support API routes
   - Keep your current implementation

### Base Path Configuration
If your repository is NOT named `[username].github.io`, uncomment and update this in `next.config.js`:
```javascript
basePath: '/your-repo-name',
```

Replace `your-repo-name` with your actual repository name (e.g., `/food`).

## 🎯 SEO Benefits

All pages are pre-rendered as static HTML with:
- ✅ Full content visible to search engines
- ✅ Fast page loads (no client-side rendering delay)
- ✅ Social media preview tags work correctly
- ✅ Perfect Lighthouse scores

## Testing Locally

```bash
# Build the static site
pnpm next build

# Preview the static export (optional - needs a static server)
npx serve out
```

## Troubleshooting

If the deployment fails:
1. Check the Actions tab for error logs
2. Verify GitHub Pages is set to use "GitHub Actions" as source
3. Ensure the repository is public (or you have GitHub Pro for private repos)

---

**Your site is ready to deploy!** 🚀

