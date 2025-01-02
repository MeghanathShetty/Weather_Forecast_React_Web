import { useEffect, useState } from "react";
import { getAirQuality } from "./utils/airQuality";

const MidPart = ({ weather }) => 
{
  const hourlyWeather=weather?.forecast?.forecastday[0]?.hour;
  const sky_details=weather?.forecast?.forecastday[0]?.astro;

  // Shuffle temperature metric
  const [temperature, setTemperature] = useState("--");
  const [tempMetric, setTempMetric] = useState('-');

  const [isCelcius,setIsCelcius] = useState(true);

  const shuffleTempMetric = () => {
    setIsCelcius(prevIsCelcius => !prevIsCelcius);
  };
  
  useEffect(() => {
  
    if (isCelcius) {
      setTemperature(weather?.current?.temp_c ? `${weather.current.temp_c}°` : "--");
      setTempMetric(weather?.current?.temp_c ? 'C' : '-');
    } else {
      setTemperature(weather?.current?.temp_f ? `${weather.current.temp_f}°` : "--");
      setTempMetric(weather?.current?.temp_f ? 'F' : '-');
    }
  }, [isCelcius, weather]);
  

  // Extract & Convert time to 12 Hour format function.
  const convertTime = (dateTimeString, returnOnlyHour = true) => {
    if(!dateTimeString)
      return "--"
    // const dateTimeString = "2023-12-05 14:00";
    const dateTime = new Date(dateTimeString);

    // Get the hour from the Date object
    const hour = dateTime.getHours();
    const minutes = dateTime.getMinutes();

    // Convert to AM/PM format
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const period = hour < 12 ? 'AM' : 'PM';

    // Format minutes with leading zero if less than 10
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Combine the hour and period
    const formattedTimeHour = `${formattedHour}${period}`;
    // Construct the full time string with AM/PM
    const formattedTimeFull = `${dateTimeString.substring(0, 11)}${formattedHour}:${formattedMinutes} ${period}`;

    if (returnOnlyHour)
      return formattedTimeHour;
    else
      return formattedTimeFull;
  }



  // console.log(hourlyWeather);
    return (
      <>
        {/* middle main part */}
        <div className="mid-main">

          {/* left part */}
          <div className="mid-left">

            {/* Main details */}
            <div className="mid-details">
              <div className="mid-details-sub1">
                <div className="img-div">
                  <img
                      src={weather?.current?.condition?.icon ?? "/dummy/path"}
                      alt="Weather Forecast"
                    />
                </div>
                <div className="mid-sub1-current-temp">
                  <p>
                    {temperature}
                    {/* {weather?.current?.temp_c? `${weather.current.temp_c}°C`: weather?.current?.temp_f ? `${weather.current.temp_f}°F` : "--"} */}
                  </p>
                  <p>
                    {tempMetric}
                    <span  className="metricSubscript" onClick={shuffleTempMetric} style={{ fontSize:"25px" }}>
                     /{tempMetric === '-' ? '-' : ` ${tempMetric === 'C' ? 'F' : 'C'}`}
                    </span>
                  </p>
                </div>
                <div className="mid-sub1-current-text">
                    {weather?.current?.condition?.text ??  "--"}
                </div>
                <div className="mid-sub1-Details">

                  <div style={{margin:"5px"}}>
                    <div className="mid-sub1-current-loc">
                        {weather?.location?.name ?? "--"},
                        {weather?.location?.region === undefined 
                          ? "--," 
                          : weather?.location?.region.trim() === "" 
                          ? " " 
                          : `${weather?.location?.region},`}
                        {weather?.location?.country ?? "--"}
                    </div>
                    <div className="mid-sub1-current-loc" style={{margin:"0",padding:"0"}}>
                        {convertTime(weather?.location?.localtime,false)}
                    </div>
                  </div>

                  <div className="mid-other">
                  <div className="mid-other-inner" >
                                  <center>
                                      <div>
                                          <b>
                                          Wind Now
                                          </b>
                                      </div>
                                      <div >
                                          <b>
                                              {weather?.current?.wind_kph ?? "--"} kph
                                          </b>
                                      </div>
                                  </center>
                              </div>

                              <div className="mid-other-inner" >
                                  <center>
                                      <div>
                                          <b>
                                              Humidity
                                          </b>
                                      </div>
                                      <div >
                                          <b>
                                              {weather?.current?.humidity ?? "--"} %
                                          </b>
                                      </div>
                                  </center>
                              </div>

                              <div className="mid-other-inner" >
                                  <center>
                                      <div>
                                          <b>
                                              Wind Direction
                                          </b>
                                      </div>
                                      <div >
                                          <b>
                                      {weather?.current?.wind_dir ?? "--"} 
                                          </b>
                                      </div>
                                  </center>
                              </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hourly forecast */}
            {/* <div className="mid-hourly-main">
              <h4 className="mid-hourly-head" style={{ marginLeft: "10px", fontWeight: "bold" }}>Hourly Forecast</h4>
              <div className="mid-hourly">
              {
                hourlyWeather && hourlyWeather.map((hourlyData, index) => (
                <div key={index} className="mid-hourly-sets">
                  <b>{convertTime(hourlyData?.time)}</b>
                  <img
                      src={hourlyData?.condition?.icon ?? "/dummy/path"}
                      alt="Weather Forecast"
                    />
                    <b>{hourlyData?.temp_c? `${hourlyData.temp_c}°C`: hourlyData?.temp_f ? `${hourlyData.temp_f}°F` : "--"}</b>
                </div>
              ))}
              </div>
            </div> */}
          </div>   

          {/* right part */}
          <div className="mid-right">
            <div className="mid-right-part1">
                <div className="mid-right-part1-heading">
                    <h4 style={{fontWeight: "bold"}}>Air Quality</h4>
                    <h4 style={{fontWeight: "bold"}}>{getAirQuality(weather?.current?.air_quality['us-epa-index'])}</h4>
                </div>
                <b>
                  <div className="mid-right-part1-row">
                    <div className="mid-right-part1-air-left">CO</div>
                    <div className="mid-right-part1-air-right">{weather?.current?.air_quality?.co} µg/m³</div>
                  </div>
                  <div className="mid-right-part1-row">
                    <div className="mid-right-part1-air-left">NO2</div>
                    <div className="mid-right-part1-air-right">{weather?.current?.air_quality?.no2} µg/m³</div>
                  </div>
                  <div className="mid-right-part1-row">
                    <div className="mid-right-part1-air-left">SO2</div>
                    <div className="mid-right-part1-air-right">{weather?.current?.air_quality?.so2} µg/m³</div>
                  </div>
                  <div className="mid-right-part1-row">
                    <div className="mid-right-part1-air-left">O3</div>
                    <div className="mid-right-part1-air-right">{weather?.current?.air_quality?.o3} µg/m³</div>
                  </div>
                  <div className="mid-right-part1-row">
                    <div className="mid-right-part1-air-left">PM2.5</div>
                    <div className="mid-right-part1-air-right">{weather?.current?.air_quality?.pm2_5} µg/m³</div>
                  </div>
                  <div className="mid-right-part1-row">
                    <div className="mid-right-part1-air-left">PM10</div>
                    <div className="mid-right-part1-air-right">{weather?.current?.air_quality?.pm10} µg/m³</div>
                  </div>
                  <div className="mid-right-part1-row">
                    <div className="mid-right-part1-air-left">GB Defra Index</div>
                    <div className="mid-right-part1-air-right">{weather?.current?.air_quality['gb-defra-index']}</div>
                  </div>
                  <div className="mid-right-part1-row" style={{ borderBottom: "0px"}}>
                    <div className="mid-right-part1-air-left">US EPA Index</div>
                    <div className="mid-right-part1-air-right">{weather?.current?.air_quality['us-epa-index']}</div>
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
                  <div className="mid-right-part1-air-left">Moon Phase</div>
                  <div className="mid-right-part1-air-right">{sky_details?.moon_phase}</div>
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

      </>
    );
  };
  
  export default MidPart;
  