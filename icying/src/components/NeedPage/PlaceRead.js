import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { token } from '../Config'
import './NeedPage.css';
import MapAPI from './MapAPI';

const PlaceRead = (props) => {
  let { id } = useParams();
  console.log("넘어오는 데이터: ", id);

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [place, setPlace] = useState("");
  const getData = async () => {
    const headers = {
      'Authorization': token
    }  

    const response = await axios.get(
      baseUrl + "/restaurant/"+id, {headers}     
    );
    setPlace(response.data.response)
    console.log(response.data.response)
  };  
  useEffect(() => {
    getData();
  }, []);

  const ice_num = place.ice_need_number == "free" ? "많이" : place.ice_need_number+"개";
  
  return (
    <div className='MainPage topCont'>
      <div className='mainTitle'>ICYING SAVES GREEN🧊</div>
      <div className='mainTxt'>
        <p>누군가는 사고, 누군가는 버리는 아이스팩. <br />
        아이싱은 전 세계가 직면한 기후 변화 문제의 쿠키 위에<br />
        아이스팩 리사이클링을 올려 지속 가능한 자원 순환 경제를 실현하고자 합니다.</p>
        집에 남아도는 아이스팩으로 나만의 환경 리워드를 쌓아나가 볼까요?
      </div>
      <div className='blueContainer'>
        <div className='flexBetween'>
          <div className='blueTxt'>내 주변 아이스팩 필요 매장</div>
          <a href={"/register/need"}>
          <button className='whiteBtn'>매장 등록</button>
          </a>
        </div>
        <div className='flexRow flexWrap'>
          <div className='PlaceRead'>
            <div>
              <div className='PlaceReadContainer' key={place.restaurant_id}>
                <img className='readImg' src={place.logo_image_url}></img>
                <div className='placeReadName'>{place.name}</div>
                <div className='placeAddr'>{place.address}</div>
                <div className='needNumTxt'><p>{ice_num}</p> 필요해요!</div>          
                <div className='needDescript'>{place.descript}</div>
              </div>
            </div>
          </div>
          <div className="mapApi"><MapAPI /></div>        
        </div>
      </div>
    </div>

    
    
  )
}

export default PlaceRead;
