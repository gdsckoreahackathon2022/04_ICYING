import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { token } from '../Config'
import "./RewardPage.css";

function RewardPage() {
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const [posts1, setPosts1] = useState("");
      const [posts2, setPosts2] = useState("");
      const getData = async () => {
        const headers = {
          'Authorization': token
        }
        const response = await axios.get(
          baseUrl + "/rewards/medal/", {headers}     
        );
        setPosts2(response.data.response.rewards)
        console.log(response.data.response.rewards)

        const response2 = await axios.get(
          baseUrl + "/rewards/record/?display=3&query=biggest", {headers}     
        );
        setPosts1(response2.data.response.records)
        console.log(response2.data.response.records)
      };  
      useEffect(() => {
        getData();
      }, []);

      const renderPosts1 = posts1 && posts1.map(post => {
          return (
              <div className = 'post' key={post.index}>
                <div className="recordContainer">
                <img className="resimg" src={post.restaurant.logo_image_url}/>               
                <div className="icenum">{post.ice_pack_number}개</div>
                <div className="resname">{post.restaurant.name}</div>
                <div className="icedate">{post.created_at}</div>
                
                </div>
              </div>
          )
      })


        const renderPosts2 = posts2 && posts2.map(post => {
            return (
                <div className = 'post' key={post.index}>
                  <div className="recordContainer">
                  <img className="medalimg" src={post.badge}/>               
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