#!/bin/bash
set -e

export PATH="$HOME/bin:$PATH"

echo ""
echo "🚀 Jabber — Railway Deployment"
echo "================================"
echo ""

# Check node
node --version > /dev/null 2>&1 || { echo "❌ Node not found. Ensure ~/bin is in PATH."; exit 1; }

# Install deps if needed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Build
echo "🔨 Building React app..."
npm run build
echo "✅ Build complete"
echo ""

# Railway login + deploy
echo "🔐 Logging into Railway (your browser will open)..."
railway login

echo ""
echo "⚙️  Initialising Railway project..."
railway init --name jabber 2>/dev/null || true

echo ""
echo "🚀 Deploying to Railway..."
railway up --detach

echo ""
echo "🌐 Getting your public URL..."
sleep 5
railway domain 2>/dev/null || railway status
echo ""
echo "✅ Done! Your site should be live at the URL above."
echo "   It may take 30–60 seconds to fully start up."
