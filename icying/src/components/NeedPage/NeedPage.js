import React from 'react';
import PlaceList from './PlaceList';
import PlaceRead from './PlaceRead';

function NeedPage() {

  return (
    <div>
      <div>내 주변 아이스팩 필요 매장</div>
      <button>매장 등록</button>
      <PlaceList />
      <PlaceRead />
    </div>
  )
}

export default NeedPage;
