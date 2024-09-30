import React from "react";
import'./Home.css'
import Navbar from "../../components/Navbar/Navbar";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";
import hero_banner from '/hero_banner.jpg';
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';

const Home = () => {
    return (
        <div className="home">
            <Navbar />
            <div className="hero">
                <img src={hero_banner} alt="" className="banner-img" />
                <div className="hero-caption">
                    <img src={hero_title} alt="" className="caption-img" />
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos 
                        dolores ipsam magnam, libero molestiae voluptates, quisquam itaque 
                        consequatur, officiis facilis voluptatum error perferendis obcaecati 
                        nam. Quae sint ducimus labore iure!</p>
                        <div className="hero-btns">
                            <button className="btn"><img src={play_icon} alt="" />Play</button>
                            <button className="btn dark-btn"><img src={info_icon} alt="" />More Info</button>
                        </div>
                        <TitleCards title={"Popular on Netflix"} category={"now_playing"}/>
                </div>
            </div>
            <div className="more-cards">
                <TitleCards title={"Blockbuster Movies"} category={"popular"}/>
                <TitleCards title={"Only on Netflix"} category={"top_rated"}/>
                <TitleCards title={"Upcoming"} category={"upcoming"}/>
                <TitleCards title={"Top picks for you"} category={"now_playing"}/>
            </div>
            <Footer />
        </div>
    )
}

export default Home;