@echo off
echo 🚀 Starting deployment process...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run this script from the project root.
    pause
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
npm ci

REM Build the project
echo 🔨 Building project...
npm run build

REM Check if build was successful
if not exist "dist" (
    echo ❌ Error: Build failed. dist directory not found.
    pause
    exit /b 1
)

echo ✅ Build completed successfully!

REM Deploy to GitHub Pages
echo 🚀 Deploying to GitHub Pages...
npm run deploy

echo 🎉 Deployment completed!
echo 🌐 Your site should be available at: https://salahmed-ctrlz.github.io/adam-zebilah
echo ⏰ It may take a few minutes for changes to be visible.
pause
