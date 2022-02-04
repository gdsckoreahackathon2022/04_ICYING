import React, { useEffect } from 'react';
import { useState } from "react";
import "./RewardPage.css";
import reward10 from '../../assets/images/아이싱 리워드 10_cut.png';

function RewardPage() {
    const posts = [
        {
          "index": 1,
          "restaurant": {
            "restaurant_id": 1,
            "name": "몬스터플레이스 숙대점",
            "logo_image_url": "https://s3-example.com/bucket/object.png"
          },
          "ice_number": 100,
          "created_at": "2021-06-25"
        },
        {
          "index": 2,
          "restaurant": {
            "restaurant_id": 1,
            "name": "몬스터플레이스 숙대점",
            "logo_image_url": "https://s3-example.com/bucket/object.png"
          },
          "ice_number": 100,
          "created_at": "2021-06-25"
        },
        {
          "index": 3,
          "restaurant": {
            "restaurant_id": 1,
            "name": "몬스터플레이스 숙대점",
            "logo_image_url": "https://s3-example.com/bucket/object.png"
          },
          "ice_number": 100,
          "created_at": "2021-06-25"
        },
        {
            "index": 4,
            "restaurant": {
              "restaurant_id": 1,
              "name": "몬스터플레이스 숙대점",
              "logo_image_url": "https://s3-example.com/bucket/object.png"
            },
            "ice_number": 100,
            "created_at": "2021-06-25"
          },
          {
            "index": 5,
            "restaurant": {
              "restaurant_id": 1,
              "name": "몬스터플레이스 숙대점",
              "logo_image_url": "https://s3-example.com/bucket/object.png"
            },
            "ice_number": 100,
            "created_at": "2021-06-25"
          }
      ];

      const renderPosts = posts && posts.map(post => {
          return (
              <div className = 'post' key={post.index}>
                <div className="reslistContainer">
                <img className="resimg2" src={reward10}/>               
                <div className="resname2">{post.restaurant.name}</div>
                <div className="columnContainer">
                <div className="icenum2">{post.ice_number}개</div>
                <div>{post.created_at}</div>
                </div>
                </div>
              </div>
          )
      })

    return (
      <div className="App">
        <div className="flexcenter">
        <div className="bigcontainer">
            <div className='reward-title'>마이 아이싱 리워드</div>
            <div className="listcontainer">
                <div className="sidetoside2">
                    <div className="seemore"></div>
                    <div className='reward-title' style={{textAlign: "center"}} >아이싱 레코드</div>
                    <div className="sorting">
                    <div className="seemore2">개수순</div>
                    <div className="seemore2"> | </div>
                    <div className="seemore2">최근 방문순</div>
                    <div className="seemore2"> | </div>
                    <div className="seemore2">오래된 방문순</div>
                    </div>
                </div>
                <div className='postContainer'>{renderPosts}</div>
                <div className="paginationcss">
                <div>◀</div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>▶</div>
            </div>
            </div>
        </div>
        </div>
      </div>
    );
  }
  
  export default RewardPage;