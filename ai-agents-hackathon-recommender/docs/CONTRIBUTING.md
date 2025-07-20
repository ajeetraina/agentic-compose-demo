# Contributing to AI Agents Hackathon Recommender

Thank you for your interest in contributing! This guide will help you get started.

## 🚀 Quick Start for Contributors

### Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for agent development)
- Git

### Setup Development Environment

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/ai-agents-hackathon-recommender.git
cd ai-agents-hackathon-recommender

# Copy environment template
cp .mcp.env.example .mcp.env
# Add your GitHub token to .mcp.env

# Start development environment
docker compose up --build
```

## 📋 Ways to Contribute

### 🐛 Bug Reports
1. Search existing issues first
2. Use the bug report template
3. Include reproduction steps
4. Add relevant logs/screenshots

### ✨ Feature Requests
1. Check if feature already requested
2. Describe the use case clearly
3. Suggest implementation approach
4. Consider backward compatibility

### 🔧 Code Contributions

#### Frontend (Next.js)
- UI/UX improvements
- New visualization components
- Performance optimizations
- Accessibility enhancements

#### Backend (Python Agents)
- New AI agent types
- Enhanced GitHub analysis
- Additional MCP tool integrations
- Performance improvements

## 🧪 Testing

```bash
# Frontend testing
cd agent-ui
npm test

# Backend testing
cd agent
python -m pytest

# Full system testing
docker compose up -d
./scripts/test-integration.sh
```

## 📏 Code Style

### Frontend
- ESLint configuration
- Prettier for formatting
- TypeScript for type safety

### Backend
- Black for code formatting
- isort for import sorting
- mypy for type checking

## 🤝 Community Guidelines

- Be respectful and inclusive
- Constructive feedback only
- Help others learn and grow
- Collaborate openly

---

**Thank you for contributing to make AI agents more accessible and powerful! 🙏**
