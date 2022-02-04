import React from 'react';

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
    }, {
      restaurant_id: 2,
      name: "몬스터플레이스 숙대점",
      address: "서울특별시 용산구 청파동 청파로43길 70",
      latitude: 126.19893898,
      longitude: 36.1231412,
      ice_need_number: "800",
      logo_image_url: "https://example.com/image.png",
      descript: "안녕하세요! 몬스터플레이스입니다~"
    }, {
      restaurant_id: 3,
      name: "몬스터플레이스 숙대점",
      address: "서울특별시 용산구 청파동 청파로43길 70",
      latitude: 126.19893898,
      longitude: 36.1231412,
      ice_need_number: "free",
      logo_image_url: "https://example.com/image.png",
      descript: "안녕하세요! 몬스터플레이스입니다~"
    }
  ];
  const renderPlaces = places && places.map(place => {
    const ice_num = place.ice_need_number == "free" ? "많이" : place.ice_need_number+"개";
    return (
      <div className='place' key={place.restaurant_id}>
        <div>{place.logo_image_url}</div>
        <div>{place.name}</div>
        <div>{place.address}</div>
        <div><p>{ice_num}</p> 필요해요!</div>          
        {/* free */}
        <div>{place.descript}</div>
      </div>
    )
  })
  return (
    <div>
      <div>{renderPlaces}</div>
    </div>
  )
}

export default PlaceRead;
