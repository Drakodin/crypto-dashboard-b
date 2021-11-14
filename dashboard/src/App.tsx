import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import Holdings from './Holdings';
import Browse from './Browse';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route path='dashboard/*' element={<Dashboard />} />
          <Route path='holdings/*' element={<Holdings />} />
          <Route path='browse/*' element={<Browse />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
