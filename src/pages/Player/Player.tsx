import React, { useEffect, useState } from "react";
import back_arrow from '../../assets/back_arrow_icon.png'
import './Player.css'
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [apiData,setApiData] = useState({
        name : '',
        key : '',
        published_at : '',
        type : ''
    })

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDE2MDljOWI4MWZjMTRhZDgwMjM0NWY5OTY5MGI2YiIsIm5iZiI6MTcyNzY5MzY5NC4yNjYyMzQsInN1YiI6IjY2ZmE4MWY1NzA1NDAwNmY2MGQwMDQ1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Dm-aCMToh7G2LwSE1BDTDkzEEYOB7TB9HeAqtPgwlz4'
        }
      };

      useEffect(() => {
          fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
            .then(response => response.json())
            .then(response => setApiData(response.results[0]))
            .catch(err => console.error(err));
      },[])
      
    return (
        <div className="player">
            <img src={back_arrow} alt="" onClick={() => {navigate(-2)}} />
            <iframe width="90%" height="90%" src={`https://www.youtube.com/embed/${apiData.key}`} title="trailer" frameBorder='0' allowFullScreen></iframe>
            <div className="player-info">
                <p>{apiData.published_at.slice(0,10)}</p>
                <p>{apiData.name}</p>
                <p>{apiData.type}</p>
            </div>
        </div>
    )
}

export default Player;