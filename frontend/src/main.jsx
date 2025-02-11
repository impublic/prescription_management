// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import {BrowserRouter} from 'react-router-dom'
// import AppContextProvider from './context/AppContext.jsx';
// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//    <AppContextProvider> 
//   <App />
//   </AppContextProvider> 
    
//   </BrowserRouter>,
// );
import { StrictMode } from 'react'; // Import StrictMode for development checks
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from './Context/AppContext.jsx'; // Ensure this path is correct

// Render the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider> 
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </StrictMode>
);
