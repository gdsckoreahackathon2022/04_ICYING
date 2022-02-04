import React from 'react';

function PlaceList() {
  const places = [
    {
      restaurant_id: "1",
      name: "몬스터플레이스 숙대점",
      address: "서울특별시 용산구 청파동 청파로43길 70",
      latitude: 126.19893898,
      longitude: 36.1231412,
      distance: "0.5km",
      logo_image_url: "https://example.com/image.png",
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
      <div className='place' key={place.restaurant_id}>
        <div>{place.logo_image_url}</div>
        <div>{place.name}</div>
        <div>{place.distance}</div>
        <div>{place.address}</div>
      </div>
    )
  })
  return (
    <div>
      <div>{renderPlaces}</div>
    </div>
  )
}

export default PlaceList;
