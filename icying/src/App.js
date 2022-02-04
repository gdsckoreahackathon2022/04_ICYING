import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from './components/NeedPage/MainPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <NavBar/> */}
        <div>        
          <Routes>
            <Route exact path="/" element={<MainPage />}></Route>
            {/* <Route path="/mypage" element={<MyPage />}></Route> */}
          </Routes>
        </div>
      </BrowserRouter> 
    </div>
  );
}

export default App;
