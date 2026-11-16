import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { McpAwarenessProvider } from './data/mcpAwareness'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <McpAwarenessProvider>
      <App />
    </McpAwarenessProvider>
  </React.StrictMode>,
)
