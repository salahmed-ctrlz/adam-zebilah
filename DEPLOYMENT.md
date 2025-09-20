# Deployment Guide - GitHub Pages

This guide will help you deploy the Adam Zebilah portfolio website to GitHub Pages.

## 🚀 Quick Deployment

### Option 1: Using GitHub Actions (Recommended)

1. **Push your code to GitHub:**
```bash
git add .
git commit -m "Initial commit - Portfolio website"
git branch -M main
git remote add origin https://github.com/salahmed-ctrlz/adam-zebilah.git
git push -u origin main
```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically deploy on every push to main

3. **Access your site:**
   - Your site will be available at: `https://salahmed-ctrlz.github.io/adam-zebilah`
   - It may take a few minutes for the first deployment

### Option 2: Manual Deployment

1. **Install gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Deploy:**
```bash
npm run deploy
```

3. **Enable GitHub Pages:**
   - Go to repository Settings > Pages
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch and "/ (root)" folder

## 🔧 Configuration

### Vite Configuration
The `vite.config.js` is already configured with:
- Base path: `/adam-zebilah/`
- Output directory: `dist`
- Assets directory: `assets`

### GitHub Actions Workflow
The `.github/workflows/deploy.yml` file handles:
- Automatic building on push to main
- Deployment to GitHub Pages
- Node.js 18 environment

## 📁 File Structure for Deployment

```
.github/
└── workflows/
    └── deploy.yml          # GitHub Actions workflow
vite.config.js              # Vite configuration for GitHub Pages
package.json                # Build scripts
README.md                   # Project documentation
.gitignore                  # Git ignore rules
```

## 🛠️ Build Process

The build process includes:
1. **Dependency Installation** - npm ci
2. **Code Building** - vite build
3. **Asset Optimization** - Code splitting and minification
4. **Deployment** - Upload to gh-pages branch

## 🔍 Troubleshooting

### Common Issues:

1. **404 Error on GitHub Pages:**
   - Ensure the base path in `vite.config.js` matches your repository name
   - Check that GitHub Pages is enabled in repository settings

2. **Assets Not Loading:**
   - Verify the base path configuration
   - Check browser console for 404 errors

3. **Build Fails:**
   - Check GitHub Actions logs
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

### Debug Steps:

1. **Check GitHub Actions:**
   - Go to Actions tab in your repository
   - View the latest workflow run
   - Check for any error messages

2. **Local Build Test:**
```bash
npm run build
npm run preview
```

3. **Verify Configuration:**
   - Ensure `base: '/adam-zebilah/'` in vite.config.js
   - Check that repository name matches the base path

## 📝 Environment Variables

If you need environment variables:
1. Create `.env.production` file
2. Add variables with `VITE_` prefix
3. Access in code with `import.meta.env.VITE_VARIABLE_NAME`

## 🔄 Updating the Site

To update the deployed site:
1. Make your changes
2. Commit and push to main branch
3. GitHub Actions will automatically rebuild and deploy

```bash
git add .
git commit -m "Update portfolio content"
git push origin main
```

## 📊 Performance Optimization

The build includes:
- Code splitting for vendor libraries
- Asset optimization
- Tree shaking for unused code
- Minification and compression

## 🔒 Security

- No sensitive data in the repository
- All API keys should be environment variables
- GitHub Pages provides HTTPS by default

## 📞 Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Verify the configuration files
3. Test the build locally
4. Check GitHub Pages documentation

---

**Live Site**: [https://salahmed-ctrlz.github.io/adam-zebilah](https://salahmed-ctrlz.github.io/adam-zebilah)
