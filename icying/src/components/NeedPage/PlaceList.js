import React from 'react';
import './NeedPage.css';

function PlaceList() {
  const places = [
    {
      restaurant_id: "1",
      name: "몬스터플레이스 숙대점",
      address: "서울특별시 용산구 청파동 청파로43길 70",
      latitude: 126.19893898,
      longitude: 36.1231412,
      distance: "0.5km",
      // logo_image_url: "https://example.com/image.png",
      logo_image_url: "img",
      is_full: false
    }, {
      restaurant_id: "2",
      name: "몬스터플레이스 숙대점",
      address: "서울특별시 용산구 청파동 청파로43길 70",
      latitude: 126.19893898,
      longitude: 36.1231412,
      distance: "0.5km",
      logo_image_url: "https://example.com/image.png",
      is_full: false
    }, {
      restaurant_id: "3",
      name: "몬스터플레이스 숙대점",
      address: "서울특별시 용산구 청파동 청파로43길 70",
      latitude: 126.19893898,
      longitude: 36.1231412,
      distance: "0.5km",
      logo_image_url: "https://example.com/image.png",
      is_full: false
    }
  ];
  const renderPlaces = places && places.map(place => {
    return (
      <div className='PlaceListContainer' key={place.restaurant_id}>
        <img className='listImg' src='{place.logo_image_url}'></img>
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
    <div className='PlaceList'>
      <div>{renderPlaces}</div>
    </div>
  )
}

export default PlaceList;
