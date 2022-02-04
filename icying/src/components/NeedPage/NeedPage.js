import React from 'react';
import PlaceList from './PlaceList';
import PlaceRead from './PlaceRead';
import './NeedPage.css';

function NeedPage() {
  const hello = 1
  const page = hello ? <PlaceList /> : <PlaceRead />
  return (
    <div className='blueContainer'>
      <div className='flexBetween'>
        <div className='blueTxt'>내 주변 아이스팩 필요 매장</div>
        <button className='whiteBtn'>매장 등록</button>
      </div>
      {page}
    </div>
  )
}

export default NeedPage;
