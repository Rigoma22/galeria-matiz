import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AccesibilidadProvider } from './context/AccesibilidadContext';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import './styles/accesibilidad.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AccesibilidadProvider>
      <App />
    </AccesibilidadProvider>
  </StrictMode>
)
