import React from 'react';
import NeedPage from './NeedPage';
import './NeedPage.css';

function MainPage() {

  return (
    <div className='MainPage topCont'>
      <div className='mainTitle'>ICYING SAVES GREENπ§</div>
      <div className='mainTxt'>
        <p>λκ΅°κ°λ μ¬κ³ , λκ΅°κ°λ λ²λ¦¬λ μμ΄μ€ν©. <br />
        μμ΄μ±μ μ  μΈκ³κ° μ§λ©΄ν κΈ°ν λ³ν λ¬Έμ μ μΏ ν€ μμ<br />
        μμ΄μ€ν© λ¦¬μ¬μ΄ν΄λ§μ μ¬λ € μ§μ κ°λ₯ν μμ μν κ²½μ λ₯Ό μ€ννκ³ μ ν©λλ€.</p>
        μ§μ λ¨μλλ μμ΄μ€ν©μΌλ‘ λλ§μ νκ²½ λ¦¬μλλ₯Ό μμλκ° λ³ΌκΉμ?
      </div>
      <NeedPage />
    </div>
  )
}

export default MainPage;
