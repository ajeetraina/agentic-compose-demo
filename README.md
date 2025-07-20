# 🏆 AI Agents Hackathon Project Recommender

> **Discover your perfect hackathon project with AI-powered GitHub profile analysis**

An intelligent system that analyzes GitHub profiles and generates personalized hackathon project recommendations using AI agents, Model Context Protocol (MCP), and real-time data integration.

![AI Agents](https://img.shields.io/badge/AI-Agents-blue) ![Next.js](https://img.shields.io/badge/Next.js-13-black) ![Python](https://img.shields.io/badge/Python-3.11-blue) ![Docker](https://img.shields.io/badge/Docker-Compose-blue) ![MCP](https://img.shields.io/badge/MCP-Protocol-green)

## 🌟 Features

- **🤖 AI-Powered Analysis**: Intelligent GitHub profile analysis using AI agents
- **📊 Real-Time Data**: Live integration with GitHub API through MCP servers
- **🎯 Personalized Recommendations**: Tailored hackathon projects based on skills and interests  
- **🔒 Secure Architecture**: Containerized microservices with proper secrets management
- **⚡ Modern Stack**: Next.js + Python + Docker + MCP integration
- **🛠️ Production Ready**: Scalable architecture with comprehensive tooling

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js UI    │───▶│  Python Agents  │───▶│   MCP Gateway   │
│   (Port 3003)   │    │   (Port 7777)   │    │   (Port 8811)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       ▼
         │                       │              ┌─────────────────┐
         │                       │              │  GitHub Tools   │
         │                       │              │  DuckDuckGo     │
         │                       │              │  Fetch Tools    │
         │                       │              │  (76 tools)     │
         │                       │              └─────────────────┘
         │                       ▼
         │              ┌─────────────────┐
         │              │   AI Models     │
         │              │   Qwen3 Small   │
         │              │   (Local/API)   │
         │              └─────────────────┘
         ▼
┌─────────────────┐
│     User        │
│   Browser       │
└─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- GitHub Personal Access Token
- 8GB+ RAM (for local AI models)

### 1. Clone & Setup

```bash
git clone <your-repo-url>
cd ai-agents-hackathon-recommender
```

### 2. Configure Secrets

```bash
# Copy the environment template
cp .mcp.env.example .mcp.env

# Edit with your actual credentials
nano .mcp.env
```

Add your GitHub Personal Access Token:
```bash
GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your_token_here
```

### 3. Launch the Application

```bash
# Build and start all services
docker compose up -d --build

# Monitor the logs
docker compose logs -f
```

### 4. Access the Application

- **Web Interface**: http://localhost:3003
- **Agents API**: http://localhost:7777
- **Health Check**: http://localhost:7777/health

## 🎯 Usage

1. **Open** the web interface at http://localhost:3003
2. **Enter** any GitHub username (e.g., "microsoft", "torvalds", "ajeetraina")
3. **Click** "Get Recommendations"
4. **Receive** personalized hackathon project suggestions!

## 🔧 Development

### Local Development Setup

```bash
# Start in development mode
docker compose up --build

# Watch logs
docker compose logs -f agents-ui
docker compose logs -f agents
```

### API Endpoints

#### Agents Service (Port 7777)

- `GET /health` - Health check
- `POST /analyze` - Analyze GitHub profile
- `GET /agents` - List available agents

```bash
# Example API usage
curl -X POST http://localhost:7777/analyze \
  -H "Content-Type: application/json" \
  -d '{"username": "microsoft", "agent": "hackathon_recommender"}'
```

## 🔒 Security Features

- **Containerized Services**: Isolated Docker containers
- **Secrets Management**: Secure credential handling
- **Resource Limits**: CPU/memory constraints on MCP tools
- **No Host Access**: Restricted filesystem access
- **Signed Images**: Verified Docker images for MCP servers

## 📊 Monitoring & Debugging

### Check Service Status

```bash
# View all containers
docker compose ps

# Check specific service logs
docker compose logs agents
docker compose logs mcp-gateway

# Monitor real-time logs
docker compose logs -f
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/CONTRIBUTING.md) for details.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Microsoft AI Agents for Beginners** - Inspiration and guidance
- **Anthropic MCP** - Model Context Protocol framework
- **Docker** - MCP Gateway and containerization
- **Next.js Team** - React framework
- **FastAPI** - Python web framework

## 🏆 Showcase

This project demonstrates:

- ✅ **Real AI Integration** - Not just templates, actual intelligent analysis
- ✅ **Modern Architecture** - Docker + MCP + Next.js + Python microservices
- ✅ **Production Infrastructure** - Secure, scalable, maintainable design
- ✅ **Excellent UX** - Beautiful interface with real functionality
- ✅ **Open Source Best Practices** - Comprehensive documentation and tooling

Perfect for:
- 🚀 **Hackathons** - Showcase AI agents capabilities
- 📚 **Learning** - Understanding modern AI application architecture  
- 🛠️ **Production** - Base for real-world AI applications
- 🎯 **Demos** - Impressive AI integration examples

