import React from 'react';
import NeedPage from './NeedPage';
import './NeedPage.css';

function MainPage() {

  return (
    <div className='MainPage'>
      <div className='mainTitle'>ICYING SAVES GREEN🧊</div>
      <div className='mainTxt'>
        <p>누군가는 사고, 누군가는 버리는 아이스팩. <br />
        아이싱은 전 세계가 직면한 기후 변화 문제의 쿠키 위에<br />
        아이스팩 리사이클링을 올려 지속 가능한 자원 순환 경제를 실현하고자 합니다.</p>
        집에 남아도는 아이스팩으로 나만의 환경 리워드를 쌓아나가 볼까요?
      </div>
      <NeedPage />
    </div>
  )
}

export default MainPage;
