import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { loadAssetsMap } from './utils/assets.js'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

// Load assets map before first paint so image URLs resolve immediately.
loadAssetsMap()
  .then(() => {
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>,
    )
  })
  .catch((err) => {
    console.error(err)
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>,
    )
  })
