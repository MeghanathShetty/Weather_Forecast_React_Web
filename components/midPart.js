const MidPart = ({ weather }) => 
{
    return (
      <>
        {/* middle part */}
        <div className="mid-main">
          <div className="mid-main-img">
            <img
              src={weather?.current?.condition?.icon ?? "/dummy/path"}
              alt="Weather Forecast"
            />
            <div className="mid-temp">
              {weather?.current?.temp_c? `${weather.current.temp_c}°C`: weather?.current?.temp_f ? `${weather.current.temp_f}°F` : "--"}
            </div>
            <div className="mid-text">
                {weather?.current?.condition?.text ??  "--"}
            </div>
            <div className="mid-loc">
                {weather?.location?.name ?? "--"},
                {weather?.location?.region ?? "--"},
                {weather?.location?.country ?? "--"}
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default MidPart;
  