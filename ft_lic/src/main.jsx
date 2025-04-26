import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GlobalProvider } from "./GlobalContext"; // importă Provider-ul

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider> {/* Înconjoară App-ul cu Provider */}
      <App />
    </GlobalProvider>
  </React.StrictMode>
);
