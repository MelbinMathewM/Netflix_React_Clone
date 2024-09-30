import React, { useEffect, useRef, useState } from "react";
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';
import { Link } from "react-router-dom";

interface TitleCardProps {
    title : string,
    category : string
}

interface Movie {
    backdrop_path: string;
    original_title: string;
    id:string;
}

const TitleCards : React.FC<TitleCardProps> = ({title,category}) => {

    const [apiData, setApiData] = useState<Movie[]>([]);
    const cardsRef = useRef<HTMLDivElement>(null);

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDE2MDljOWI4MWZjMTRhZDgwMjM0NWY5OTY5MGI2YiIsIm5iZiI6MTcyNzY5MzY5NC4yNjYyMzQsInN1YiI6IjY2ZmE4MWY1NzA1NDAwNmY2MGQwMDQ1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Dm-aCMToh7G2LwSE1BDTDkzEEYOB7TB9HeAqtPgwlz4'
        }
      };
      

    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response => setApiData(response.results))
        .catch(err => console.error(err));

        if (cardsRef.current) {
            cardsRef.current.addEventListener('wheel', handleWheel as unknown as EventListener)
        }

        return () => {
            if (cardsRef.current) {
                cardsRef.current.removeEventListener('wheel', handleWheel as unknown as EventListener)
            }
        }
    }, []);

    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (cardsRef.current) {
            cardsRef.current.scrollLeft += event.deltaY;
        }
    }

    return (
        <div className="title-cards">
            <h2>{title ? title : "Popular on Netflix"}</h2>
            <div className="card-list" ref={cardsRef}>
                {apiData.map((card, index) => {
                    return <Link to={`/player/${card.id}`} className="card" key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
                        <p>{card.original_title}</p>
                    </Link>
                })}
            </div>
        </div>
    )
}

export default TitleCards;