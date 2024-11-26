import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight  } from '@fortawesome/free-solid-svg-icons';
import { convertAddressToLatLng } from './utils/convertAddress';
import { loadWeather } from "./utils/loadWeather";
// import { changeBlurIntensity } from './utils/blurIntensity';
import { changeAccentStyle } from './utils/accentStyle';
import { getAirQuality } from './utils/airQuality';
import { toast } from 'react-toastify';
import { toastErrorStyle } from './utils/toastStyle';
import { searchAutoComplete } from './utils/searchAutoComplete';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

let search_flag=0;

const Sidebar = ({toggleSideBar,setHomePageWeather,weatherMain}) => 
{
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [weather,setWeather]=useState(null);
  // const [blurOption, setBlurOption] = useState(null);
  const [accentOption, setAccentOption] = useState('1');
  const [loading, setLoading] = useState(false);
  const [suggestionArray,setSuggestionArray]=useState([false]);


  const sky_details=weatherMain?.forecast?.forecastday[0]?.astro;

  const handleSidebarClick = () => {
    toggleSideBar();
  };

  // When user clicks a suggestion
  const handleSuggestionClick = async (data) =>
  {
    // setSearchQuery(data.name); // set input value to the name of location
    // setSearchQuery(data.name+","+data.region); // set input value to the name of location
    setSearchQuery(""); // clear input
    setSearchResults([]); // clear the previous search results
    try {
      setLoading(true);
      fetchData(data.lat,data.lon);
    }catch(error) {
      setLoading(false);
      console.log(error);
    }
  }

  const searchSuggestions = async () => {
    setSuggestionArray([]);
    try {
      const result = await searchAutoComplete(searchQuery);
      // console.log(result);
      if (result !== null && result.length>0) {
        const suggests = result.map((sug, index) => (
          <div className="suggestion-set" key={index} onClick={()=>handleSuggestionClick(sug)}>
            {sug.name}, {sug.region}
          </div>
        ));
  
        setSuggestionArray(suggests);
      } else {
        setSuggestionArray([]);
      }
    } catch (error) {
      setLoading(false); // just for safety ( maybe )
      setSuggestionArray([]);
      console.error(error);
    }
  };
  
  // Search autoComplete
  useEffect(()=>
  {
    // searchSuggestions  functikjn
    searchSuggestions();

  },[searchQuery])

  useEffect(()=>
  {
    if(search_flag!=0)
    {
      let day_night="";
      const dt_time=weather?.location?.localtime;
      const currentTime = new Date(dt_time); 
      const currentHour = currentTime.getHours();

      if((currentHour >= 6 && currentHour <19))  // day
        day_night="Day";
      else
        day_night="Night";

      setSearchResults((prevResults) => [
        ...prevResults,
        <div className='search-result' key={search_flag} onClick={() => setHomePageWeather(weather)}>  {/*Send clicked Weather details to home page*/}
          <div className='search-result-sub1'>
            <div className="search-result-day-night">
              <b>
                  {day_night}
              </b>
            </div>
            <div className='search-result-text'>
              <b>{weather?.current?.condition?.text ??  "--"}</b>
            </div>
            <div className='search-result-loc'>
              {weather?.location?.name ?? "--"},
              {weather?.location?.region ?? "--"},
              {weather?.location?.country ?? "--"}
            </div> 
          </div>
          <div className='search-result-sub2'>
            <div className='search-result-img'>
              <img
                  src={weather?.current?.condition?.icon ?? "--"}
                  alt="Weather Forecast"
                />
            </div>
            <div className='search-result-temp'>
              <b>
                {weather?.current?.temp_c? `${weather.current.temp_c}°C`: weather?.current?.temp_f ? `${weather.current.temp_f}°F` : "--"}
              </b>
            </div>
          </div>
        </div>
      ].reverse()); 
    }
    setSuggestionArray([]);
  },[weather])

  const handleSearch = async (str) => 
  {
    setSearchResults([]); // clear the previous search results
    setSearchQuery(str);
    setLoading(true);
    try 
    {
      const result = await convertAddressToLatLng(searchQuery);
      if(result.length>0)
      {
        for(let i=0;i<result.length;i++)
        { 
          const loc=result[i];
          const lat=loc.latitude;
          const long=loc.longitude;
          // setLat(la);
          // setLong(lo);
          // console.log('Latitude:', lat);
          // console.log('Longitude:', long);

          if (lat !== null && long !== null)
          {
            fetchData(lat,long);
          }
          else
            setLoading(false);
       }
      }
    } catch (error) {
      setLoading(false);
      if(error !== "No results found for address")
        toast.error("Uh oh, looks like something's wrong. Try checking your internet.", toastErrorStyle());
      console.error(error);
    }
  };

  const fetchData = async (lat,long) => {
    try{
      const weatherData = await loadWeather(lat, long);
      if (weatherData) {
        setWeather(weatherData);
        setLoading(false);
        search_flag++;
      }
      else{
        setLoading(false);
      }
    }catch(error)
    {
      setLoading(false);
      console.log(error);
    }
  };

  // Set Blur Intensity Change
  // const handleBlurOptionChange = (event) => 
  // {
  //   setBlurOption(event.target.value);
  // };
  // Apply dynamic blur change effect
  // useEffect(() => 
  // {
  //   changeBlurIntensity(blurOption);
  // }, [blurOption]);

  // Set Accent Color Change
  const handleAccentOptionChange = (event) => 
  {
    setAccentOption(event.target.value);
  };
  // Apply dynamic accent color change effect
  useEffect(() => 
  {
        const accentStyle=changeAccentStyle(accentOption);
        document.head.appendChild(accentStyle);
        return () => {
          // Cleanup: Remove the style element when the component unmounts
          document.head.removeChild(accentStyle);
        };

  }, [accentOption]);

  return (
    <div className="sidebar-main">
       <div className="top-sidebar-close-icon" onClick={handleSidebarClick}>
            <FontAwesomeIcon icon={faArrowRight} className="sidebar-close-icon" style={{ fontSize: '1.8em'}}/>
        </div>
      <h3>Search</h3>
      <div className="search-bar">
        <input
          type="text" className="search-input"
          placeholder="Search location"
          value={searchQuery || ''}
          onChange={(e) => {
            if (e.target.value === '' || e.target.value === null)  // if search input is empty then clear prev results
            {
              setSearchResults([]);
            }
            setSearchQuery(e.target.value);
          }}
          onKeyDown={(e) => e.key === 'Enter'? handleSearch() : e.isDefaultPrevented(false)}
        />
        <div className="location-suggestion-box">
          {suggestionArray}
        </div>
         {/* <button className="search-btn" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </button> */}
      </div>
      <div className='search-result-container'>
      {!loading ? (
        searchResults.length > 0 ? (searchResults) : 
        (
          <h2 style={{ textAlign: "center", marginTop: "15px" }}>
          Please enter a location to search...
          </h2>
        ))
        : (
          <>
              <h2 style={{textAlign:'center', marginTop : '15px'}}>Loading weather data<br /></h2>
              <h2 style={{textAlign:'center', marginTop : '10px'}}><FontAwesomeIcon icon={faSpinner} spin /></h2>
          </>
      )}
      </div>

      {/* Change accent */}
      <h5 style={{margin:'2%'}}>Theme</h5>

        <div className='accent-options-main'>
            <div className='accent-options-sub1'> 
                <label  style={{marginRight:'1%'}}>
                  <input
                    id='color0'
                    type="radio"
                    value="0"
                    checked={accentOption === '0'} 
                    onChange={handleAccentOptionChange}
                    style={{marginRight:'1%'}}
                  />
                </label>
                <label style={{marginRight:'1%'}}>
                  <input
                    id='color1'
                    type="radio"
                    value="1"
                    checked={accentOption === '1' || accentOption === null} // by default set as checked
                    onChange={handleAccentOptionChange}
                    style={{marginRight:'1%'}}
                  />
              </label>
            </div>  
        
          <div className='accent-options-sub2'>
            <label style={{marginRight:'1%'}}>
              <input
                id='color2'
                type="radio"
                value="2"
                checked={accentOption === '2'}
                onChange={handleAccentOptionChange}
                style={{marginRight:'1%'}}
              />
            </label>
            <label style={{marginRight:'1%'}}>
              <input
                id='color3'
                type="radio"
                value="3"
                checked={accentOption === '3'}
                onChange={handleAccentOptionChange}
                style={{marginRight:'1%'}}
              />
            </label>         
          </div>
      </div>


        {/* Change Blur Intensity
        <h5 id='blur-head-text' style={{margin:'2%'}}>Blur Intensity</h5>
        
        <div className='blur-options-main'>
            <div className='blur-options-sub1'> 
                <label  style={{marginRight:'1%'}}>
                  <input
                    type="radio"
                    value="0"
                    checked={blurOption === '0'}
                    onChange={handleBlurOptionChange}
                    style={{marginRight:'1%'}}
                  />
                  0%
                </label>

                <label style={{marginRight:'1%'}}>
                  <input
                    type="radio"
                    value="1"
                    checked={blurOption === '1'} // by default set as checked
                    onChange={handleBlurOptionChange}
                    style={{marginRight:'1%'}}
                  />
                  10%
              </label>
            </div>  
        
          <div className='blur-options-sub2'>
            <label style={{marginRight:'1%'}}>
              <input
                type="radio"
                value="2"
                checked={blurOption === '2'}
                onChange={handleBlurOptionChange}
                style={{marginRight:'1%'}}
              />
              20%
            </label>
            <label style={{marginRight:'1%'}}>
              <input
                type="radio"
                value="5"
                checked={blurOption === '5' || blurOption === null}
                onChange={handleBlurOptionChange}
                style={{marginRight:'1%'}}
              />
              50%
            </label>
          </div>
      </div> */}



      {/* air details and sky/Astro details */}
      <div className="sidebar-mid-right">
            <div className="mid-right-part1">
                <div className="mid-right-part1-heading">
                    <h4 style={{fontWeight: "bold",marginTop :"10px"}}>Air Quality</h4>
                    <h4 style={{fontWeight: "bold",marginTop :"10px"}}>{getAirQuality(weatherMain?.current?.air_quality['us-epa-index'])}</h4>
                </div>
                <b>
                  <div className="mid-right-part1-row">
                    <div className="mid-right-part1-air-left">CO</div>
                    <div className="mid-right-part1-air-right">{weatherMain?.current?.air_quality?.co} µg/m³</div>
                  </div>
                  <div className="mid-right-part1-row">
                    <div className="mid-right-part1-air-left">NO2</div>
                    <div className="mid-right-part1-air-right">{weatherMain?.current?.air_quality?.no2} µg/m³</div>
                  </div>
                  <div className="mid-right-part1-row">
                    <div className="mid-right-part1-air-left">SO2</div>
                    <div className="mid-right-part1-air-right">{weatherMain?.current?.air_quality?.so2} µg/m³</div>
                  </div>
                  <div className="mid-right-part1-row">
                    <div className="mid-right-part1-air-left">O3</div>
                    <div className="mid-right-part1-air-right">{weatherMain?.current?.air_quality?.o3} µg/m³</div>
                  </div>
                  <div className="mid-right-part1-row">
                    <div className="mid-right-part1-air-left">PM2.5</div>
                    <div className="mid-right-part1-air-right">{weatherMain?.current?.air_quality?.pm2_5} µg/m³</div>
                  </div>
                  <div className="mid-right-part1-row">
                    <div className="mid-right-part1-air-left">PM10</div>
                    <div className="mid-right-part1-air-right">{weatherMain?.current?.air_quality?.pm10} µg/m³</div>
                  </div>
                  <div className="mid-right-part1-row">
                    <div className="mid-right-part1-air-left">GB Defra Index</div>
                    <div className="mid-right-part1-air-right">{weatherMain?.current?.air_quality['gb-defra-index']}</div>
                  </div>
                  <div className="mid-right-part1-row" style={{ borderBottom: "0px"}}>
                    <div className="mid-right-part1-air-left">US EPA Index</div>
                    <div className="mid-right-part1-air-right">{weatherMain?.current?.air_quality['us-epa-index']}</div>
                  </div>
                </b>
              </div>

              {/* <div className="mid-right-part1" style={{ borderBottom: "0px",marginTop:"20px"}}>   
              <div className="mid-right-part1-heading">
                  <h4 style={{fontWeight: "bold",marginLeft:"10px"}}>Celestial Details</h4>
              </div>
              <b>
                <div className="mid-right-part1-row">
                  <div className="mid-right-part1-air-left">Moon Illumination</div>
                  <div className="mid-right-part1-air-right">{sky_details?.moon_illumination}</div>
                </div>
                <div className="mid-right-part1-row">
                  <div className="mid-right-part1-air-left" style={{overflow:"visible"}}>Moon Phase</div>
                  <div className="mid-right-part1-air-right" style={{marginLeft:"10px"}}>{sky_details?.moon_phase}</div>
                </div>
                <div className="mid-right-part1-row">
                  <div className="mid-right-part1-air-left">Sun Rise</div>
                  <div className="mid-right-part1-air-right">{sky_details?.sunrise}</div>
                </div>
                <div className="mid-right-part1-row">
                  <div className="mid-right-part1-air-left">Sun Set</div>
                  <div className="mid-right-part1-air-right">{sky_details?.sunset}</div>
                </div>
                <div className="mid-right-part1-row">
                  <div className="mid-right-part1-air-left">Moon Rise</div>
                  <div className="mid-right-part1-air-right">{sky_details?.moonrise}</div>
                </div>
                <div className="mid-right-part1-row" style={{ borderBottom: "0px"}}>
                  <div className="mid-right-part1-air-left">Moon Set</div>
                  <div className="mid-right-part1-air-right">{sky_details?.moonset}</div>
                </div>
              </b>
            </div>  */}
            
          </div>


    </div>
  );
};

export default Sidebar;