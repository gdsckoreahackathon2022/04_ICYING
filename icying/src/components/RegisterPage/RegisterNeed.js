import React from 'react';
import './RegisterPage.css'

function RegisterNeed() {
  return (
    <div className='RegisterNeed topCont'>
      <div className='blueContainer'>
        <div className='blueTxt'>아이스팩 필요 매장 등록하기</div>
        <div className='whiteCont'>
          <div className='labelInput'>
            <div className='rightTxt'>상호명</div>
            <input></input>
          </div>
          <div className='labelInput'>
            <div className='rightTxt'>주소</div>
            <div className='flexCol'>
              <input></input>
              <input placeholder='상세 주소를 입력해 주세요.'></input>
            </div>
          </div>
          <div className='labelInput'>
            <div className='rightTxt'>필요 개수</div>
            <input placeholder='숫자 입력'></input>
            <div className='flexRow'>
              <input type="checkbox"></input>
              <div>상관 없어요</div>
            </div>
          </div>
          <div className='labelInput'>
            <div className='rightTxt'>로고 이미지</div>
            <input></input>
          </div>
          <div className='labelInput'>
            <div className='rightTxt'>설명</div>
            <textarea rows={5} 
              placeholder='필수 포함 요소: 영업 시간, 아이스팩 개당 리워드 (ex. 아이스팩 10개에 500원 할인 쿠폰)'>
            </textarea>
          </div>
          <button className='btnBlue'>매장 등록</button>
        </div>
      </div>
    </div>
  )
}

export default RegisterNeed;
