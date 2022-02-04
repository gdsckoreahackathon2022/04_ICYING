import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { token } from '../Config'
import './NeedPage.css';

function PlaceRead() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [place, setPlace] = useState("");
  const getData = async () => {
    const headers = {
      'Authorization': token
    }
    const response = await axios.get(
      baseUrl + "/restaurant/3", {headers}     
    );
    setPlace(response.data.response)
  };  
  useEffect(() => {
    getData();
  }, []);

  const ice_num = place.ice_need_number == "free" ? "많이" : place.ice_need_number+"개";
  
  return (
    <div className='PlaceRead'>
      <div>
        <div className='PlaceReadContainer' key={place.restaurant_id}>
          <img className='readImg' src={place.logo_image_url}></img>
          <div className='placeReadName'>{place.name}</div>
          <div className='placeAddr'>{place.address}</div>
          <div className='needNumTxt'><p>{ice_num}</p> 필요해요!</div>          
          <div>{place.descript}</div>
        </div>
      </div>
    </div>
  )
}

export default PlaceRead;
