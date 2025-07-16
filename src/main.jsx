import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Error handling for React 18
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Error handler for React errors
window.addEventListener('error', (event) => {
  if (event.message.includes('WebGL') || event.message.includes('THREE')) {
    console.warn('WebGL error caught:', event.message);
    // Let the error boundary in the component handle the error
    event.preventDefault();
  }
});

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
