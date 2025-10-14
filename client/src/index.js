import React from 'react';
import ReactDOM from 'react-dom/client';
import './ChatWidget.css';
import ChatWidget from './ChatWidget';

const root = ReactDOM.createRoot(
  document.getElementById('root') || document.getElementById('cannabis-chat-widget')
);

root.render(
  <React.StrictMode>
    <ChatWidget config={window.CannabisChat?.config} />
  </React.StrictMode>
);