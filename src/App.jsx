import MenuBar from './menubar/menubar';
import { Outlet } from 'react-router-dom';
import React from 'react';
import './App.css';




function App() {

  return (
    <div className="App">
      <MenuBar />
      <div className="d-flex w-100 justify-content-center">
      <Outlet />
      </div>
    </div>
  );
}

export default App;
