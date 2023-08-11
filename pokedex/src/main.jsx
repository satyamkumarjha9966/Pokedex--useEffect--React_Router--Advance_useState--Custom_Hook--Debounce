import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    // From this we can enable Routes for whole page
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
