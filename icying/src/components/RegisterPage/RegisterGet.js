import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RegisterPage.css'

function RegisterGet() {
  // const restName = "안녕"
  const [restName, setRestName] = useState("");
  const getData = async () => {
    await axios
      .get("/my-restraurant")
      .then((response) => {
        console.log(response.data);
        setRestName(response.data.restaurant_id);
      })
      .catch((error) => {
        console.error(error)
      })
  }
  useEffect(() => {
    getData();
  }, []);
  
  return (
    <div className='RegisterNeed topCont'>
      <div className='blueContainer'>
        <div className='blueTxt'>아이스팩 받았어요</div>
        <div className='whiteCont'>
          <div className='labelInput'>
            <div className='rightTxt'>상호명</div>
            <div>{restName}</div>
          </div>
          <div className='labelInput'>
            <div className='rightTxt'>기부자 ID</div>
            <input></input>
          </div>
          <div className='labelInput'>
            <div className='rightTxt'>받은 개수</div>
            <input placeholder='숫자 입력'></input>
          </div>
          <div className='flexRow'>
            <input type="checkbox"></input>
            <div>충분히 받았어요</div>
            <div>체크해서 필요 매장 목록에서 내리기</div>
          </div>
          <button className='btnBlue'>매장 등록</button>
        </div>
      </div>
    </div>
  )
}

export default RegisterGet;
