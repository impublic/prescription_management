// index.js
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import { BrowserRouter } from "react-router-dom";
// import AdmincontextProvider from "./context/Admincontext.jsx";
// import AppContextProvider from "./context/Appcontext.jsx";
//  import DoctorContextProvider from "./context/Doctorcontext.jsx";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <BrowserRouter>
//       <AdmincontextProvider>
//          <DoctorContextProvider> 
//         <AppContextProvider>
//           <App />
//         </AppContextProvider>
//         </DoctorContextProvider>
//       </AdmincontextProvider>
//     </BrowserRouter>
//   </StrictMode>
// );
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AdminContextProvider from "./context/Admincontext.jsx";
import AppContextProvider from "./context/Appcontext.jsx";
import DoctorContextProvider from "./context/Doctorcontext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AdminContextProvider>
      <DoctorContextProvider>
          <AppContextProvider>
            <App />
          </AppContextProvider>
          </DoctorContextProvider>
      </AdminContextProvider>
    </BrowserRouter>
  </StrictMode>
);
