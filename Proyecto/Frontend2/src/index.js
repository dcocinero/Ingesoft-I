import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Make sure the DOM is fully loaded before rendering
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('root');
  
  // Check if the element exists before creating root
  if (container) {
    const root = createRoot(container);
    root.render(
      //<React.StrictMode>
        <App />
      //</React.StrictMode>
    );
  } else {
    console.error("Root element not found! Make sure there's a <div id='root'></div> in your HTML file");
  }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
