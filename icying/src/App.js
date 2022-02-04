import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from './components/NeedPage/MainPage';
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
          </Routes>
        </div>
      </BrowserRouter> 
    </div>
  );
}

export default App;
