import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { token } from '../Config'
import './NeedPage.css';

function PlaceRead() {
  const places = [
    {
      restaurant_id: 1,
      name: "몬스터플레이스 숙대점",
      address: "서울특별시 용산구 청파동 청파로43길 70",
      latitude: 126.19893898,
      longitude: 36.1231412,
      ice_need_number: "800",
      logo_image_url: "https://example.com/image.png",
      descript: "안녕하세요! 몬스터플레이스입니다~"
    }
  ];
  const baseUrl = process.env.REACT_APP_BASE_URL;
  // const [places, setPlaces] = useState("");
  const getData = async () => {
    const headers = {
      'Authorization': token
    }
    const response = await axios.get(
      baseUrl + "/restaurant/1", {headers}     
    );
    console.log(response.data.response)
    console.log(response.data.response.name)
    // setPlaces(places, ...response.data.response)
  };  
  useEffect(() => {
    getData();
  }, []);
  const renderPlaces = places && places.map(place => {
    const ice_num = place.ice_need_number == "free" ? "많이" : place.ice_need_number+"개";
    return (
      <div className='PlaceReadContainer' key={place.restaurant_id}>
        <img className='readImg' src='{place.logo_image_url}'></img>
        <div className='placeReadName'>{place.name}</div>
        <div className='placeAddr'>{place.address}</div>
        <div className='needNumTxt'><p>{ice_num}</p> 필요해요!</div>          
        <div>{place.descript}</div>
      </div>
    )
  })
  return (
    <div className='PlaceRead'>
      <div>{renderPlaces}</div>
    </div>
  )
}

export default PlaceRead;
