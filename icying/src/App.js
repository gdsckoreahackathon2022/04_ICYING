import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from './components/NeedPage/MainPage';
import PlaceRead from './components/NeedPage/PlaceRead';
import RegisterGet from './components/RegisterPage/RegisterGet';
import RegisterNeed from './components/RegisterPage/RegisterNeed';
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
            <Route exact path="/" element={<MainPage />}></Route>
            <Route path="/detail/:id" element={<PlaceRead />}></Route>
            <Route path="/register/need" element={<RegisterNeed />}></Route>
            <Route path="/register/get" element={<RegisterGet />}></Route>
            <Route path="/reward" element={<RewardPage />}></Route>
            <Route path="/reward/myicying" element={<Myicying />}></Route>
          </Routes>
        </div>
      </BrowserRouter> 
    </div>
  );
}

export default App;
