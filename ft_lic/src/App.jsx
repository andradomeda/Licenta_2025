import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './GlobalContext';
import Homepage from './Screens/Homepage/Homepage';
import About from './Screens/About/About';
import Events from './Screens/Events/Events';
import Auth from './Screens/Authentification/Auth';
import MyProfile from './Screens/MyProfile/MyProfile';
import General from './Screens/General/General';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/general" element={<General />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;


