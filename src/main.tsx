import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Gracefully handle unhandled rejections and errors from browser extensions like MetaMask
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason?.message || String(event.reason || '');
    if (
      reason.includes('MetaMask') || 
      reason.includes('ethereum') || 
      reason.includes('wallet') || 
      reason.includes('RPC') || 
      reason.includes('provider')
    ) {
      console.info(
        'Injected extension (such as MetaMask) connection attempt handled inside the sandbox iframe:',
        reason
      );
      event.preventDefault(); // Prevent standard error propagation
    }
  });

  window.addEventListener('error', (event) => {
    const message = event.message || '';
    if (
      message.includes('MetaMask') || 
      message.includes('ethereum') || 
      message.includes('wallet') || 
      message.includes('provider')
    ) {
      console.info(
        'Injected extension runtime event captured and handled inside the sandbox iframe:',
        message
      );
      event.preventDefault(); // Prevent standard error propagation
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

