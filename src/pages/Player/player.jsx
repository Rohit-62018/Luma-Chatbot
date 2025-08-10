import React, { useEffect, useState } from "react";
import './player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from "react-router-dom";

export default function Player(){

    const { id } = useParams();
    const navigate = useNavigate();
    const [apiData, setApiData] = useState({
        name:"",
        key:"",
        published_at:"",
        type:""
    })

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTM1Yjk0YTMwYTJjNjU5NDliMzZiM2I5ODk0ZDM1ZCIsIm5iZiI6MTc1NDc0MzAxMy4wNTc5OTk4LCJzdWIiOiI2ODk3NDBlNWJhMDUzMDM2YTY2ZDYzOTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.22LRaQve4wtXyaPdn9JXYcLhua3hll-JbV4LoJHI6qk'
      }
    }
    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results[0]))
      .catch(err => console.error(err));
    }, []);
    return (
        <div className="player">
            <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}}/>
            <iframe
                width="90%"
                height="90%"
                src={`https://www.youtube.com/embed/${apiData.key}`}
                title="trailer"
                frameBorder="0"
                allowFullScreen
            ></iframe>
            <div className="player-info">
                <p>{apiData.published_at ? apiData.published_at.slice(0,10) : ""}</p>
                <p>{apiData.name}</p>
                <p>{apiData.type}</p>
            </div>
        </div>
    )
}