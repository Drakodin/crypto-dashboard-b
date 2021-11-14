import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import Holdings from './Holdings';
import Browse from './Browse';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route path='dashboard/*' element={<Dashboard />} />
        <Route path='holdings/*' element={<Holdings />} />
        <Route path='browse/*' element={<Browse />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
