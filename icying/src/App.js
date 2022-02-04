import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <NavBar/> */}
        <div>        
          <Routes>
            {/* <Route path="/mypage" element={<MyPage />}></Route> */}
          </Routes>
        </div>
      </BrowserRouter> 
    </div>
  );
}

export default App;
