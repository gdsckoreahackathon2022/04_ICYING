import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from './components/NeedPage/MainPage';
import RegisterGet from './components/RegisterPage/RegisterGet';
import RegisterNeed from './components/RegisterPage/RegisterNeed';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <NavBar/> */}
        <div>        
          <Routes>
            <Route exact path="/" element={<MainPage />}></Route>
            <Route path="/register/need" element={<RegisterNeed />}></Route>
            <Route path="/register/get" element={<RegisterGet />}></Route>
          </Routes>
        </div>
      </BrowserRouter> 
    </div>
  );
}

export default App;
