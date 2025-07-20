'use client';

import { useState } from 'react';

const TrophyIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFA500">
    <path d="M6 9H4.5a2.5 2.5 0 000 5H6M18 9h1.5a2.5 2.5 0 010 5H18M6 9v6h12V9M6 9h12M8 21h8M12 3v6"/>
    <path d="M8 21V9M16 21V9"/>
  </svg>
);

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
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '40px 20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <TrophyIcon />
        </div>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          margin: '0 0 8px 0',
          color: '#333'
        }}>
          AI Agents Hackathon Recommender
        </h1>
        <p style={{ 
          color: '#666', 
          margin: 0,
          fontSize: '16px'
        }}>
          Get personalized hackathon project recommendations!
        </p>
      </div>

      {/* Input Section */}
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '24px'
      }}>
        <form onSubmit={handleSubmit}>
          <div style={{ 
            display: 'flex', 
            gap: '10px'
          }}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="collabnix"
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '2px solid #ddd',
                borderRadius: '6px',
                fontSize: '16px',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#007bff'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !username.trim()}
              style={{
                padding: '12px 24px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading || !username.trim() ? 0.6 : 1
              }}
            >
              {loading ? 'Loading...' : 'Get Recommendations'}
            </button>
          </div>
        </form>
      </div>

      {/* Error Display */}
      {error && (
        <div style={{ 
          backgroundColor: '#fee',
          border: '1px solid #fcc',
          borderRadius: '6px',
          padding: '16px',
          marginBottom: '24px',
          color: '#c33'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div style={{ 
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '20px'
          }}>
            <TrophyIcon />
            <span style={{ 
              fontSize: '20px', 
              fontWeight: '600',
              marginLeft: '8px',
              color: '#333'
            }}>
              AI Agents Hackathon Project Recommendations for {username}
            </span>
          </div>

          <div style={{ 
            whiteSpace: 'pre-wrap',
            lineHeight: '1.6',
            color: '#555'
          }}>
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
