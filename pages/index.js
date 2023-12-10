import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// custom imports
import { loadWeather } from "../components/utils/loadWeather";

import TopNav from "../components/Topnav";
import MidPart from "../components/midPart";
import SideBar from "../components/sideBar";

// background imports
import { weatherDayBackgrounds,weatherNightBackgrounds } from "../components/utils/weatherBackgrounds";
import { toastErrorStyle } from "../components/utils/toastStyle";

const Index = () => {

    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [weather,setWeather]=useState(null); 

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
                    toast.error("Oops! Error getting your current location. Try giving permission.",toastErrorStyle());
                });
            }
            else
            {
                toast.error("Sad! Seems like your browser does not support geolocation.",toastErrorStyle());
            }
        }catch(error)
        {
            console.log("Couldnt retrieve current location",error);
            toast.error("Oops! Our weather detectives couldnt get your current location.",toastErrorStyle());
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
        if(weather !== null)
        {

            const weatherCode = weather?.current?.condition?.code;
            const tempF = weather?.current?.temp_f;
    
            const dt_time=weather?.location?.localtime;
            const currentTime = new Date(dt_time); 
            const currentHour = currentTime.getHours();

            if((currentHour >= 6 && currentHour <19))  // day
            {
                if(tempF<32 && 
                (weatherCode == 1000 || weatherCode == 1003 || weatherCode == 1006 || weatherCode == 1009)) // check if it is snow and weather is not too bad
                {
                    videoElement.src = "/anims/snow_day_clear.mp4";
                }
                else
                {
                   // check if it is evening/early morning and weather is not too bad
                    if (
                        ((currentHour >= 6 && currentHour <= 7) || (currentHour >= 18 && currentHour < 19)) &&
                        (weatherCode == 1000 || weatherCode == 1003 || weatherCode == 1006 || weatherCode == 1009)
                    ) {
                        videoElement.src = "/anims/day/back_evening_sunny.mp4";
                    }
                    else 
                    {
                        const dayBackgroundPath = weatherDayBackgrounds[weatherCode] || "/anims/day/back_sunny.mp4";
                        videoElement.src = dayBackgroundPath;
                    }
                }
            }
            else // night
            {
                if(tempF<32 &&
                (weatherCode == 1000 || weatherCode == 1003 || weatherCode == 1006 || weatherCode == 1009)) // check if it is snow and weather is not too bad
                {
                    videoElement.src = "/anims/snow_night_clear.mp4";
                }
                else
                {
                    const nightBackgroundPath = weatherNightBackgrounds[weatherCode] || "/anims/night/back_sunny.mp4";
                    videoElement.src = nightBackgroundPath;
                }
            }    
        }
        
    }, [weather]); 

    // set clicked weather from search results to home page
    const setHomePageWeather = (weather) => 
    {
        setWeather(weather);
        // console.log(weather);
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

            </div>
            {/* sideBar */}
            <div className={`side-bar-container ${side_barVisible ? "side-bar-container-open" : ""}`}>
                <SideBar setHomePageWeather={setHomePageWeather} toggleSideBar={toggleSide_barVisible} weatherMain={weather}/>
            </div>
        </div>
    );
};

export default Index;
