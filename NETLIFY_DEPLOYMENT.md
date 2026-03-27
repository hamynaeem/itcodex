# Netlify deployment guide for SoftCoder Angular App

## Prerequisites
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Create a Netlify account at https://netlify.com
3. Connect your GitHub repository to Netlify

## Deployment Methods

### Method 1: Automatic Deployment (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repo to Netlify
3. Netlify will automatically build and deploy when you push to main branch
4. Build settings are configured in `netlify.toml`

### Method 2: Manual Deployment via CLI
```bash
# Login to Netlify
netlify login

# Build the project
npm run build:netlify

# Deploy for preview
npm run preview:netlify

# Deploy to production
npm run deploy:netlify
```

### Method 3: Drag and Drop
1. Build the project: `npm run build:netlify`
2. Go to Netlify dashboard
3. Drag and drop the `dist/browser` folder

## Build Configuration
- **Build command:** `npm run build:netlify`
- **Publish directory:** `dist/browser`
- **Node version:** 18

## Environment Variables
If you need environment variables for production:
1. Go to Netlify dashboard → Site settings → Environment variables
2. Add your production environment variables

Example variables you might need:
- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- etc.

## Custom Domain
1. Go to Netlify dashboard → Domain settings
2. Add your custom domain
3. Update DNS settings as instructed by Netlify

## Performance Optimizations
The `netlify.toml` file includes:
- Caching headers for static assets
- Security headers
- Gzip compression (automatic)
- Angular routing redirects

## Troubleshooting
- If routing doesn't work, ensure `_redirects` file is in the `public` folder
- Check build logs in Netlify dashboard for any errors
- Ensure all environment variables are set correctly