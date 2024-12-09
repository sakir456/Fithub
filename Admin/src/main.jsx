import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminContextProvider from './context/AdminContext.jsx'
import TrainerContextProvider from './context/TrainerContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AdminContextProvider>
  <TrainerContextProvider>
    <App />
    </TrainerContextProvider>
    </AdminContextProvider>
  </BrowserRouter>,
)
