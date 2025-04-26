import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from "./Screens/Authentification/Auth";
import Homepage from './Screens/Homepage/Homepage';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;


