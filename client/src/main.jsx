import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'        // ← this line is mandatory

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);
