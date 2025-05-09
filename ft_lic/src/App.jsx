import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from "./Screens/Authentification/Auth";
import Homepage from './Screens/Homepage/Homepage';
import About from './Screens/About/About';
import Events from './Screens/Events/Events';
import MyProfile from './Screens/MyProfile/MyProfile';



function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </Router>
  );
}

export default App;


