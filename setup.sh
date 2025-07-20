#!/bin/bash

echo "🚀 Setting up AI Agents Hackathon Recommender"
echo "============================================="

# Check if .mcp.env exists
if [ ! -f ".mcp.env" ]; then
    echo "📝 Creating .mcp.env from template..."
    cp .mcp.env.example .mcp.env
    echo ""
    echo "⚠️  IMPORTANT: Edit .mcp.env and add your GitHub Personal Access Token!"
    echo "   Get token from: https://github.com/settings/tokens"
    echo "   Required permissions: repo, user, read:org"
    echo ""
    echo "Press Enter after you've updated .mcp.env..."
    read
fi

echo "🏗️ Building and starting services..."
docker compose up -d --build

echo ""
echo "🎉 Setup complete!"
echo "=================="
echo ""
echo "🌐 Web Interface: http://localhost:3003"
echo "🔧 API Endpoint: http://localhost:7777"
echo "📊 Health Check: http://localhost:7777/health"
echo ""
echo "📋 To monitor logs: docker compose logs -f"
echo "🛑 To stop: docker compose down"
