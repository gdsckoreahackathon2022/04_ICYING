import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { token } from '../Config'
import "./RewardPage.css";

function RewardPage() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [records, setRecords] = useState("");
    const getData = async () => {
      const headers = {
        'Authorization': token
      }
      const response = await axios.get(
        baseUrl + "/rewards/record/?display=10&query=biggest", {headers}     
      );
      setRecords(response.data.response.records)
      console.log(response.data.response.records)
    };  
    useEffect(() => {
      getData();
    }, []);

      const renderPosts = records && records.map(post => {
          return (
              <div className = 'post' key={post.donation_id}>
                <div className="reslistContainer">
                <img className="resimg2" src={post.restaurant.logo_image_url}/>               
                <div className="resname2">{post.restaurant.name}</div>
                <div className="columnContainer">
                <div className="icenum2">{post.ice_pack_number}개</div>
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