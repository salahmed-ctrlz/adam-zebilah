#!/bin/bash

# Adam Zebilah Portfolio - Deployment Script
# This script builds and deploys the portfolio to GitHub Pages

echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed. dist directory not found."
    exit 1
fi

echo "✅ Build completed successfully!"

# Deploy to GitHub Pages
echo "🚀 Deploying to GitHub Pages..."
npm run deploy

echo "🎉 Deployment completed!"
echo "🌐 Your site should be available at: https://salahmed-ctrlz.github.io/adam-zebilah"
echo "⏰ It may take a few minutes for changes to be visible."
