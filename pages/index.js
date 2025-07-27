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
    const [weather, setWeather]=useState(null);
    const [bgVideo, setBGVideo]=useState(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    // console.log(weather)

    const getCurrentLocation=async()=>
    {
        try{
            if (navigator.geolocation) 
            {
                navigator.geolocation.getCurrentPosition((position) => {
                    setLat(position.coords.latitude);
                    setLong(position.coords.longitude);
                },
                (error) =>{
                    // set default location to New Delhi
                    setLat(28.6139);
                    setLong(77.2090);
                    console.error("Error getting current location:", error.message ?? "");
                    toast.error("Error getting your current location. Please try giving permission.",toastErrorStyle());
                });
            }
            else{
                // set default location to New Delhi
                setLat(28.6139);
                setLong(77.2090);
                console.error("Geolocation not supported on browser");
                toast.error("Sad! Seems like your browser does not support geolocation.",toastErrorStyle());
            }
        }catch(error){
            // set default location to New Delhi
            setLat(28.6139);
            setLong(77.2090);
            console.error("Couldnt retrieve current location");
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
                    setBGVideo("/anims/snow_day_clear.mp4");
                }
                else
                {
                   // check if it is evening/early morning and weather is not too bad
                    if (
                        ((currentHour >= 6 && currentHour <= 7) || (currentHour >= 18 && currentHour < 19)) &&
                        (weatherCode == 1000 || weatherCode == 1003 || weatherCode == 1006 || weatherCode == 1009)
                    ) {
                        setBGVideo("/anims/day/back_evening_sunny.mp4");
                    }
                    else 
                    {
                        const dayBackgroundPath = weatherDayBackgrounds[weatherCode] || "/anims/day/back_sunny.mp4";
                        setBGVideo(dayBackgroundPath);
                    }
                }
            }
            else // night
            {
                if(tempF<32 &&
                (weatherCode == 1000 || weatherCode == 1003 || weatherCode == 1006 || weatherCode == 1009)) // check if it is snow and weather is not too bad
                {
                    setBGVideo("/anims/snow_night_clear.mp4");
                }
                else
                {
                    const nightBackgroundPath = weatherNightBackgrounds[weatherCode] || "/anims/night/back_sunny.mp4";
                    setBGVideo(nightBackgroundPath);
                }
            }    
        } else {
            setBGVideo(null);
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
            {bgVideo ? (
                <video autoPlay muted loop id="video-bg" playsInline 
                    key={bgVideo + weather?.current?.last_updated_epoch}
                    onLoadStart={() => setIsVideoLoaded(false)}  // reset when new video starts loading
                    onLoadedData={() => setIsVideoLoaded(true)}  // mark as loaded
                >
                    <source src={bgVideo} type="video/mp4" />
                    Sad, Your Browser does not support video tags!!!
                </video>
            ) : (
                <div id="fallback-bg" style={{backgroundColor: "black"}}></div>
            )}

             {/* <div className="blur-overlay"></div> */}
            <div className="sub-main">
                {/* TopNav */}
                <TopNav weather={weather} sidebarVisible={side_barVisible} toggleSideBar={toggleSide_barVisible}/>
                {/* Running process indicator */}
                {((!bgVideo) || (bgVideo && !isVideoLoaded)) && (
                    <div
                        id="process-indicator"
                        style={{
                            backgroundColor: "black",
                            width: "100%",
                            height: "15px",
                            backgroundImage: "linear-gradient(90deg,rgb(0, 0, 0) 25%,rgb(57, 149, 192) 50%,rgb(0, 0, 0) 75%)",
                            backgroundSize: "200% 100%",
                            animation: "loading 1.5s linear infinite"
                        }}
                    ></div>
                )}

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
