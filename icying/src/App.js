import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Myicying from './components/RewardPage/Myicying';
import RewardPage from './components/RewardPage/RewardPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
        <div>        
          <Routes>
            <Route path="/reward" element={<RewardPage />}></Route>
            <Route path="/reward/myicying" element={<Myicying />}></Route>
          </Routes>
        </div>
      </BrowserRouter> 
    </div>
  );
}

export default App;
