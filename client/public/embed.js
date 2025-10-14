(function() {
  window.CannabisChat = {
    init: function(config) {
      const defaultConfig = {
        apiUrl: 'http://localhost:3001',
        position: 'bottom-right',
        primaryColor: '#10b981'
      };
      
      const finalConfig = { ...defaultConfig, ...config };
      
      // Create container
      const container = document.createElement('div');
      container.id = 'cannabis-chat-widget';
      document.body.appendChild(container);
      
      // Load React app
      const script = document.createElement('script');
      script.src = finalConfig.apiUrl.replace('/api', '') + '/static/js/main.js';
      script.onload = function() {
        window.CannabisChat.config = finalConfig;
      };
      document.body.appendChild(script);
      
      // Load styles
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = finalConfig.apiUrl.replace('/api', '') + '/static/css/main.css';
      document.head.appendChild(link);
    }
  };
})();