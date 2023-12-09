import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const TopNav = ({toggleSideBar, weather }) => {

    const handleSidebarClick = () => {
        toggleSideBar();
      };

      let day_night="";
      const dt_time=weather?.location?.localtime;
      const currentTime = new Date(dt_time); 
      const currentHour = currentTime.getHours();

      if((currentHour >= 6 && currentHour <19))  // day
        day_night="Day";
      else
        day_night="Night";

    return (
        <>
            {/* top section */}
            <div className="top-main">
                <div className="top-day-night">
                    <b>
                        {day_night}
                    </b>
                </div>
                <div className="top-head">
                    <b>
                        Weather Forecast
                    </b>
                </div>
                <div className="top-sidebar-icon" onClick={handleSidebarClick}>
                    <FontAwesomeIcon icon={faBars} className="sidebar-icon" style={{ fontSize: '1.3em' }}/>
                </div>
            </div>
        </>
    );
}

export default TopNav;
