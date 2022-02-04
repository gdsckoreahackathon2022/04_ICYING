import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { token } from '../Config'
import './NeedPage.css';


function PlaceList() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [places, setPlaces] = useState("");
  const getData = async () => {
    const headers = {
      'Authorization': token
    }
    const response = await axios.get(
      baseUrl + "/restaurant/?latitude=37.5441270&longitude=126.9667812&page=1", {headers}     
    );
    setPlaces(response.data.results)
    console.log(response.data.results)
  };  
  useEffect(() => {
    getData();
  }, []);
  const renderPlaces = places && places.map(place => {
    return (
      <div className='PlaceListContainer' key={place.restaurant_id}>
        <img className='listImg' src={place.logo_image_url}></img>
        <div className='placeTxtContainer'>
          <div className='flexBetween'>
            <div className='placeName'>{place.name}</div>
            <div className='placeDist'>{place.distance}</div>
          </div>
          <div className='placeAddr'>{place.address}</div>
        </div>
      </div>
    )
  })
  return (
    <div className='whiteCont'>
      <div>{renderPlaces}</div>
    </div>
  )
}

export default PlaceList;
