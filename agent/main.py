#!/usr/bin/env python3
"""
AI Agents Backend Service for Hackathon Recommender
Handles agent orchestration and MCP tool integration
"""

import os
import logging
import aiohttp
import asyncio
from typing import Dict, Any, List, Optional

import yaml
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Pydantic models
class AnalysisRequest(BaseModel):
    username: str
    agent: str = "hackathon_recommender"

class AnalysisResponse(BaseModel):
    success: bool
    agent: str
    recommendations: Optional[str] = None
    profile: Optional[Dict[str, Any]] = None
    error: Optional[str] = None

class HealthResponse(BaseModel):
    status: str
    version: str = "1.0.0"

class AgentConfig:
    def __init__(self, config_path: str = "/agents.yaml"):
        self.config_path = config_path
        self.agents = {}
        self.config = {}
        self.load_config()
    
    def load_config(self):
        """Load agent configuration from YAML file"""
        try:
            with open(self.config_path, 'r') as f:
                data = yaml.safe_load(f)
                self.agents = data.get('agents', {})
                self.config = data.get('config', {})
            logger.info(f"Loaded {len(self.agents)} agents from config")
        except Exception as e:
            logger.error(f"Failed to load agent config: {e}")
            # Use default config if file not found
            self.agents = {
                "hackathon_recommender": {
                    "name": "Hackathon Project Recommender",
                    "description": "Analyzes GitHub profiles to recommend personalized hackathon projects"
                }
            }
            self.config = {}

class GitHubAnalyzer:
    def __init__(self, token: str = None):
        self.token = token or os.getenv('GITHUB_PERSONAL_ACCESS_TOKEN')
        self.base_url = "https://api.github.com"
        
    async def get_user_profile(self, username: str) -> Dict[str, Any]:
        """Fetch real GitHub user profile data"""
        headers = {}
        if self.token:
            headers['Authorization'] = f'token {self.token}'
            
        try:
            async with aiohttp.ClientSession() as session:
                # Get user basic info
                async with session.get(f"{self.base_url}/users/{username}", headers=headers) as response:
                    if response.status != 200:
                        raise Exception(f"GitHub API error: {response.status}")
                    user_data = await response.json()
                
                # Get user repositories
                async with session.get(f"{self.base_url}/users/{username}/repos?per_page=100", headers=headers) as response:
                    if response.status == 200:
                        repos_data = await response.json()
                    else:
                        repos_data = []
                
                # Analyze repositories for languages
                languages = {}
                for repo in repos_data[:20]:  # Analyze top 20 repos
                    if repo.get('language'):
                        lang = repo['language']
                        languages[lang] = languages.get(lang, 0) + 1
                
                # Get top languages
                top_languages = sorted(languages.items(), key=lambda x: x[1], reverse=True)[:5]
                top_languages = [lang[0] for lang in top_languages]
                
                return {
                    "username": username,
                    "name": user_data.get('name', username),
                    "bio": user_data.get('bio', ''),
                    "repos": user_data.get('public_repos', 0),
                    "followers": user_data.get('followers', 0),
                    "following": user_data.get('following', 0),
                    "languages": top_languages,
                    "company": user_data.get('company', ''),
                    "location": user_data.get('location', ''),
                    "created_at": user_data.get('created_at', ''),
                    "repository_count": len(repos_data),
                    "recent_repos": [repo['name'] for repo in repos_data[:5]]
                }
                
        except Exception as e:
            logger.error(f"GitHub API error for {username}: {e}")
            # Fallback to basic data
            return {
                "username": username,
                "repos": 0,
                "languages": [],
                "followers": 0,
                "following": 0,
                "error": str(e)
            }

class AgentService:
    def __init__(self):
        self.config = AgentConfig()
        self.gateway_url = os.getenv('MCPGATEWAY_URL', 'mcp-gateway:8811')
        self.github_analyzer = GitHubAnalyzer()
    
    async def analyze_github_profile(self, username: str, agent_name: str = "hackathon_recommender") -> AnalysisResponse:
        """Analyze a GitHub profile and generate hackathon recommendations"""
        try:
            agent_config = self.config.agents.get(agent_name, {})
            if not agent_config:
                raise Exception(f"Agent {agent_name} not found in configuration")
            
            logger.info(f"Starting analysis for {username} with agent {agent_name}")
            
            # Get real GitHub profile data
            profile = await self.github_analyzer.get_user_profile(username)
            
            # Generate personalized recommendations based on profile
            recommendations = self.generate_personalized_recommendations(username, profile)
            
            return AnalysisResponse(
                success=True,
                agent=agent_name,
                recommendations=recommendations,
                profile=profile
            )
            
        except Exception as e:
            logger.error(f"Analysis failed for {username}: {e}")
            return AnalysisResponse(
                success=False,
                agent=agent_name,
                error=str(e)
            )
    
    def generate_personalized_recommendations(self, username: str, profile: Dict[str, Any]) -> str:
        """Generate personalized recommendations based on real GitHub data"""
        
        # Extract data from profile
        repos_count = profile.get('repos', 0)
        languages = profile.get('languages', [])
        followers = profile.get('followers', 0)
        company = profile.get('company', '')
        bio = profile.get('bio', '')
        
        # Determine experience level
        if repos_count > 50:
            experience = "Expert"
        elif repos_count > 20:
            experience = "Advanced"
        elif repos_count > 5:
            experience = "Intermediate"
        else:
            experience = "Beginner"
        
        # Primary language
        primary_lang = languages[0] if languages else "Multiple"
        
        # Generate personalized project recommendations
        projects = []
        
        if "Python" in languages:
            projects.append({
                "title": "🐍 AI-Powered Python Assistant",
                "description": f"Build an intelligent Python coding companion leveraging your {primary_lang} expertise.",
                "stack": "Python + OpenAI API + FastAPI + Docker"
            })
        
        if "JavaScript" in languages or "TypeScript" in languages:
            projects.append({
                "title": "⚡ Interactive Web Agent",
                "description": f"Create a dynamic web application with AI integration using your {primary_lang} skills.",
                "stack": "Next.js + Node.js + AI APIs + PostgreSQL"
            })
        
        if "Go" in languages:
            projects.append({
                "title": "🚀 High-Performance API Agent",
                "description": "Build a lightning-fast microservice architecture with AI capabilities.",
                "stack": "Go + Docker + Kubernetes + Redis"
            })
        
        if repos_count > 20:
            projects.append({
                "title": "🔍 Advanced Code Analyzer",
                "description": f"With {repos_count} repositories, create a sophisticated tool that analyzes codebases for improvements.",
                "stack": f"{primary_lang} + AST parsing + ML models + Web UI"
            })
        
        # Default projects if no specific language match
        if not projects:
            projects = [
                {
                    "title": "🤖 Universal AI Assistant",
                    "description": "Start your AI journey with a versatile assistant that can grow with your skills.",
                    "stack": "Python + OpenAI API + Streamlit + SQLite"
                },
                {
                    "title": "📚 Smart Learning Companion",
                    "description": "Build an AI that helps developers learn new technologies.",
                    "stack": "Next.js + Python + Vector DB + AI APIs"
                }
            ]
        
        # Format recommendations
        recommendations_text = f"""🏆 AI Agents Hackathon Project Recommendations for {username}

📊 Profile Analysis:
• GitHub profile: {repos_count} repositories, {followers} followers
• Primary languages: {', '.join(languages[:3]) if languages else 'Multiple technologies'}
• Experience level: {experience}
• Coding focus: {bio[:50] + '...' if bio else 'Full-stack development'}

🚀 Personalized Project Recommendations:

"""
        
        for i, project in enumerate(projects[:5], 1):
            recommendations_text += f"""{i}. **{project['title']}**
   {project['description']}
   Tech Stack: {project['stack']}
   
"""
        
        recommendations_text += f"""💡 Personalized Tips for {username}:
• Leverage your {primary_lang} expertise as a foundation
• Consider your {repos_count} repositories as inspiration for new projects
• Build on your existing GitHub presence ({followers} followers)
• {company + ' experience' if company else 'Open source'} gives you unique perspective

🛠️ Recommended Tech Stack:
• Primary: {primary_lang} (your strongest language)
• AI/ML: OpenAI API, Anthropic Claude, or Hugging Face
• Backend: {'FastAPI' if 'Python' in languages else 'Express.js' if 'JavaScript' in languages else 'Your preferred framework'}
• Database: PostgreSQL, MongoDB, or vector databases
• Deployment: Docker, Vercel, or cloud platforms

Ready to build something amazing? Your {experience.lower()} level and {primary_lang} skills are perfect for these projects! 🎯"""

        return recommendations_text

# Initialize FastAPI app
app = FastAPI(
    title="AI Agents Hackathon Recommender",
    description="Backend service for analyzing GitHub profiles and recommending hackathon projects",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize service
agent_service = AgentService()

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    return HealthResponse(status="healthy")

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_profile(request: AnalysisRequest):
    """Analyze a GitHub profile and generate hackathon recommendations"""
    return await agent_service.analyze_github_profile(request.username, request.agent)

@app.get("/agents")
async def list_agents():
    """List available agents"""
    return {"agents": list(agent_service.config.agents.keys())}

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "AI Agents Hackathon Recommender API", "version": "1.0.0"}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=7777,
        reload=False,
        log_level="info"
    )
