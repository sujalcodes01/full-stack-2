import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { CalendarApp } from './CalendarApp';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CalendarApp />
  </React.StrictMode>,
);
