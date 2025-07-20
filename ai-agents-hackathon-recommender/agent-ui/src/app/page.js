'use client';

import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError('');
    setResult('');

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim() }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Analysis failed');
      }

      setResult(data.recommendations);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #3730a3 100%)',
      minHeight: '100vh',
      color: 'white',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ 
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          background: '#f97316',
          borderRadius: '2rem',
          fontSize: '1.125rem',
          fontWeight: 'bold',
          marginBottom: '1rem'
        }}>
          🏆 AI Agents Hackathon Project Recommender
        </div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          Discover your perfect hackathon project!
        </h1>
        <p style={{ color: '#d1d5db', marginBottom: '0.5rem' }}>
          Analyzes GitHub profiles to recommend personalized projects that match your skills and interests.
        </p>
        <p style={{ color: '#60a5fa', fontSize: '0.875rem' }}>
          Inspired by Microsoft AI Agents for Beginners - built with MCP servers & Docker Model Runner
        </p>
      </div>

      {/* Search Form */}
      <div style={{ maxWidth: '32rem', margin: '0 auto 2rem auto' }}>
        <div style={{ 
          background: 'rgba(17, 24, 39, 0.8)', 
          borderRadius: '8px', 
          padding: '1.5rem' 
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '0.5rem' }}>
              🔍 Enter GitHub Username
            </label>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1rem' }}>
              Enter any GitHub username to analyze their coding style and recommend projects.
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ajeetraina"
              style={{ 
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(55, 65, 81, 1)',
                border: '1px solid rgba(75, 85, 99, 1)',
                borderRadius: '8px',
                color: 'white',
                marginBottom: '1rem',
                fontSize: '16px'
              }}
              disabled={loading}
            />
            
            <button
              type="submit"
              disabled={loading || !username.trim()}
              style={{ 
                width: '100%',
                background: 'linear-gradient(135deg, #ec4899, #ef4444)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                fontSize: '16px',
                opacity: (loading || !username.trim()) ? 0.5 : 1
              }}
            >
              {loading ? '🔄 Analyzing...' : '🚀 Generate Hackathon Recommendations'}
            </button>
          </form>

          {/* Service Status */}
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            marginTop: '1rem', 
            fontSize: '0.75rem',
            flexWrap: 'wrap'
          }}>
            <span style={{ background: '#16a34a', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
              🐙 GitHub MCP Server
            </span>
            <span style={{ background: '#16a34a', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
              🦆 DuckDuckGo Search  
            </span>
            <span style={{ background: '#16a34a', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
              🤖 AI Model Runner
            </span>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div style={{ maxWidth: '64rem', margin: '0 auto 2rem auto' }}>
          <div style={{ 
            background: 'rgba(153, 27, 27, 0.8)',
            border: '1px solid #dc2626',
            borderRadius: '8px',
            padding: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '1.25rem', marginRight: '0.5rem' }}>❌</span>
              <div>
                <h3 style={{ fontWeight: '500', color: '#fca5a5', margin: 0 }}>Error</h3>
                <p style={{ color: '#fecaca', margin: '0.5rem 0 0 0' }}>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
          <div style={{ 
            background: 'rgba(17, 24, 39, 0.8)',
            borderRadius: '8px',
            padding: '1.5rem',
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace',
            lineHeight: '1.5'
          }}>
            {result}
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
          🔗 Built with MCP (Model Context Protocol)
        </div>
        <div style={{ color: '#6b7280', fontSize: '0.75rem', marginTop: '0.5rem' }}>
          GitHub Analysis • Trend Research • AI Recommendations • Secure Infrastructure
        </div>
      </div>
    </div>
  );
}
