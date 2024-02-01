// App.js
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Resentments from './pages/Resentments';
import Fear from './pages/Fear';
import SexConduct from './pages/SexConduct';
import HarmToOthers from './pages/HarmToOthers';

function App() {
  return (
    <Router>
      <nav className="nav-links">
        <Link to="/resentments">Resentments</Link>
        <Link to="/fear">Fear</Link>
        <Link to="/sex-conduct">Sex Conduct</Link>
        <Link to="/harm-to-others">Harm to Others</Link>
      </nav>
      <Routes>
        <Route path="/resentments" element={<Resentments />} />
        <Route path="/fear" element={<Fear />} />
        <Route path="/sex-conduct" element={<SexConduct />} />
        <Route path="/harm-to-others" element={<HarmToOthers />} />
      </Routes>
    </Router>
  );
}

export default App;
