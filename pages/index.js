import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// custom imports
import { loadWeather } from "../components/utils/loadWeather";

import TopNav from "../components/Topnav";
import MidPart from "../components/midPart";
import BottomPart from "../components/bottomPart";
import SideBar from "../components/sideBar";

// background imports
import { weatherDayBackgrounds,weatherNightBackgrounds,allVideoPaths } from "../components/utils/weatherBackgrounds";

const Index = () => {

    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [weather,setWeather]=useState(null);

    // preload background videos
    useEffect(() => {
        const loadVideosInBackground = async () => 
        {
            for (let i = 0; i < allVideoPaths.length; i++) 
            {
                const videoElement = document.createElement('video');
                videoElement.autoplay = true;
                videoElement.src = allVideoPaths[i];
                videoElement.style.maxWidth = '0';
                videoElement.style.maxHeight = '0';
                videoElement.style.display = 'none';
                document.body.appendChild(videoElement);

                // Wait for some seconds
                await new Promise(resolve => setTimeout(resolve, 1900));
                console.log(allVideoPaths[i]);
            }
        };

        loadVideosInBackground();
    }, []);

    

    const getCurrentLocation=async()=>
    {
        
        try{
            if (navigator.geolocation) 
            {
                navigator.geolocation.getCurrentPosition((position) => 
                {
                    setLat(position.coords.latitude);
                    setLong(position.coords.longitude);
                },
                (error) => 
                {
                    console.error("Error getting location:", error.message);
                    toast.error("Oops!,Error getting your current location!");
                });
            }
            else
            {
                toast.error("Sad!,seems like your browser does not support geolocation");
            }
        }catch(error)
        {
            console.log("Couldnt retrieve current location",error);
            toast.error("Oops!,Something went wrong while getting your current location");
        }
    }

    useEffect(()=>
    {
        getCurrentLocation();
    },[]);
    

    useEffect(()=>
    {
        if(lat !== null && long !== null)
        {   
            const fetchData = async () => {
                const weatherData = await loadWeather(lat,long);
                if (weatherData) {
                  setWeather(weatherData);
                }
              }; 

              fetchData();
        }
    },[lat,long]);


    // side bar things
    const [side_barVisible, setSide_barVisible] = useState(false);

    const toggleSide_barVisible = () => {
        setSide_barVisible(!side_barVisible);
    };

    // different background for different weather
    useEffect(() =>
    {
        const videoElement = document.getElementById("video-bg");
        const weatherCode = weather?.current?.condition?.code;
        const tempF = weather?.current?.temp_f;
    
        const isDay = weather?.current?.is_day;

        const temp_code= [1000,1003,1006,1009]; // WeatherCodes= Sunny,Partly Cloud,Cloudy,Overcast

        if(isDay==1)
        {
            const dt_time=weather?.location?.localtime;
            const currentTime = new Date(dt_time); 
            const currentHour = currentTime.getHours();

            if(tempF<32 && temp_code.includes(weatherCode)) // check if it is snow and weather is not too bad
            {
                videoElement.src = "/anims/snow_day_clear.mp4";
            }
            else
            {
                if (currentHour >= 18 && currentHour < 21 && temp_code.includes(weatherCode)) // check if it is evening and weather is not too bad
                {
                    videoElement.src = "/anims/day/back_evening_sunny.mp4";
                } 
                else 
                {
                    const dayBackgroundPath = weatherDayBackgrounds[weatherCode] || "/anims/day/back_sunny.mp4";
                    videoElement.src = dayBackgroundPath;
                }
            }
        }
        else
        {
            if(tempF<32 && temp_code.includes(weatherCode)) // check if it is snow and weather is not too bad
            {
                videoElement.src = "/anims/snow_night_clear.mp4";
            }
            else
            {
                const nightBackgroundPath = weatherNightBackgrounds[weatherCode] || "/anims/night/back_sunny.mp4";
                videoElement.src = nightBackgroundPath;
            }
        }
  
    }, [weather]); 

    // set clicked weather from search results to home page
    const setHomePageWeather = (weather) => 
    {
        setWeather(weather);
        console.log(weather);
    };
    
    return (
        
        <div className="main">
             <video autoPlay muted loop id="video-bg">
                <source src="/anims/back_sunny.mp4" type="video/mp4/mov" />
                Sad, Your Browser does not support video tags!!!
             </video>
             {/* <div className="blur-overlay"></div> */}
            <div className="sub-main">
                {/* TopNav */}
                <TopNav weather={weather} sidebarVisible={side_barVisible} toggleSideBar={toggleSide_barVisible}/>

                {/* MidPart */}
                <MidPart weather={weather}/>

                {/* BottomPart */}
                <BottomPart weather={weather}/>
            </div>
            {/* sideBar */}
            <div className={`side-bar-container ${side_barVisible ? "side-bar-container-open" : ""}`} >
                <SideBar setHomePageWeather={setHomePageWeather} />
            </div>
        </div>
    );
};

export default Index;
