import React, { useEffect } from 'react';
import { useState } from "react";
import "./RewardPage.css";

function RewardPage() {
    const posts1 = [
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
        }
      ];

      const renderPosts1 = posts1 && posts1.map(post => {
          return (
              <div className = 'post' key={post.index}>
                <div className="recordContainer">
                <img className="resimg" src={post.logo_image_url}/>               
                <div className="icenum">{post.ice_number}개</div>
                <div className="resname">{post.restaurant.name}</div>
                <div className="icedate">{post.created_at}</div>
                
                </div>
              </div>
          )
      })

      const posts2 = [
          {
            "index": 1,
            "code": "re1",
            "content": "아기 뱃지 획득!",
            "number": 1,
            "is_exist": true,
            "created_at": "2021-06-25"
          },
          {
            "index": 2,
            "code": "re1",
            "content": "기부 10개",
            "number": 10,
            "is_exist": false,
            "created_at": "null"
          },
          {
            "index": 3,
            "code": "re1",
            "content": "기부 10개",
            "number": 10,
            "is_exist": false,
            "created_at": "null"
          },
          {
            "index": 4,
            "code": "re1",
            "content": "기부 10개",
            "number": 10,
            "is_exist": false,
            "created_at": "null"
          },
          {
            "index": 5,
            "code": "re1",
            "content": "기부 10개",
            "number": 10,
            "is_exist": false,
            "created_at": "null"
          },
          {
            "index": 6,
            "code": "re1",
            "content": "기부 10개",
            "number": 10,
            "is_exist": false,
            "created_at": "null"
          }
        ]

        const renderPosts2 = posts2 && posts2.map(post => {
            return (
                <div className = 'post' key={post.index}>
                  <div className="recordContainer">
                  <img className="medalimg" src={post.logo_image_url}/>               
                  <div className="badgename">{post.content}</div>
                  <div className='icedate'>{post.created_at}</div>
                  </div>
                </div>
            )
        })

    return (
      <div className="App">
        <div className="flexcenter">
        <div className="bigcontainer">
            <div className='reward-title'>마이 아이싱 리워드</div>
            <div className="topcontainer">
                <div className="sidetoside">
                    <div className="see"></div>
                    <div className='reward-title' style={{textAlign: "center"}} >아이싱 레코드</div>
                    <a href={"/reward/myicying"}>
                    <button className="seemore">더보기</button>
                    </a>
                </div>
                <div className='postContainer1'>{renderPosts1}</div>
            </div>
            <div className="bottomcontainer">
                <div className='reward-title' style={{textAlign: "center"}}>아이싱 메달</div>
                <div className='postContainer2'>{renderPosts2}</div>
            </div>
        </div>
        </div>
      </div>
    );
  }
  
  export default RewardPage;