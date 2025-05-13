import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App.tsx';
import Auth from './components/Auth.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Auth/>
  </StrictMode>,
);
