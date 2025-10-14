import React, { useState, useEffect, useRef } from 'react';
import './ChatWidget.css';

const ChatWidget = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [age, setAge] = useState('');
  const [state, setState] = useState('');
  const [stateInfo, setStateInfo] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const apiUrl = config?.apiUrl || 'http://localhost:3001';
  const primaryColor = config?.primaryColor || '#10b981';

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleVerifyAge = async (e) => {
    e.preventDefault();
    
    if (!age || !state) {
      alert('Please enter your age and select your state.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/chat/verify-age`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ age: parseInt(age), state })
      });

      const data = await response.json();

      if (data.verified) {
        setIsVerified(true);
        setSessionId(data.sessionId);
        setStateInfo(data.stateInfo);
        
        const welcomeMessage = {
          role: 'assistant',
          content: `Welcome! I'm your cannabis culture assistant. I can help you learn about cannabis basics, consumption methods, legal information for ${state}, and more. What would you like to know?`,
          timestamp: new Date()
        };
        setMessages([welcomeMessage]);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Verification error:', error);
      alert('Failed to verify age. Please try again.');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: inputValue
        })
      });

      const data = await response.json();

      const assistantMessage = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Message error:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="cannabis-chat-widget" style={{ '--primary-color': primaryColor }}>
      {/* Chat Button */}
      <button
        className={`chat-toggle-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window" role="dialog" aria-label="Cannabis chat assistant">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-content">
              <span className="chat-icon">🌿</span>
              <div>
                <h2 className="chat-title">Cannabis Assistant</h2>
                <p className="chat-subtitle">Educational information only</p>
              </div>
            </div>
          </div>

          {/* Age Verification */}
          {!isVerified ? (
            <div className="chat-verification">
              <div className="verification-content">
                <h3>Age Verification Required</h3>
                <p>You must be 21 or older to use this service.</p>
                
                <form onSubmit={handleVerifyAge} className="verification-form">
                  <div className="form-group">
                    <label htmlFor="age-input">Your Age</label>
                    <input
                      id="age-input"
                      type="number"
                      min="1"
                      max="120"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Enter your age"
                      required
                      aria-required="true"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="state-select">Your State</label>
                    <select
                      id="state-select"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                      aria-required="true"
                    >
                      <option value="">Select your state</option>
                      {states.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" className="verify-button">
                    Verify & Continue
                  </button>
                </form>

                <p className="verification-disclaimer">
                  By continuing, you confirm you are 21+ and agree to receive educational information only.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="chat-messages" role="log" aria-live="polite" aria-atomic="false">
                {stateInfo && (
                  <div className="state-info-banner" role="status">
                    <strong>{state} Status:</strong> {stateInfo.status}
                    {stateInfo.notes && <span> • {stateInfo.notes}</span>}
                  </div>
                )}

                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`message ${msg.role}`}
                    role="article"
                    aria-label={`${msg.role === 'user' ? 'You' : 'Assistant'} said`}
                  >
                    <div className="message-content">
                      {msg.content}
                    </div>
                    <div className="message-time">
                      {new Date(msg.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="message assistant" aria-live="polite" aria-busy="true">
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSendMessage} className="chat-input-form">
                <div className="chat-input-wrapper">
                  <label htmlFor="message-input" className="sr-only">
                    Type your message
                  </label>
                  <textarea
                    id="message-input"
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about cannabis..."
                    rows="1"
                    disabled={isLoading}
                    aria-label="Message input"
                  />
                  <button
                    type="submit"
                    className="send-button"
                    disabled={!inputValue.trim() || isLoading}
                    aria-label="Send message"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </div>
              </form>

              {/* Disclaimer */}
              <div className="chat-disclaimer">
                Educational information only. Not medical or legal advice.
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;