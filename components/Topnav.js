import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const TopNav = ({toggleSideBar, weather }) => {

    const handleSidebarClick = () => {
        toggleSideBar();
      };

      const isDay = weather?.current?.is_day;
      let day_night="";

      if(isDay==1)
        day_night="Day";
      else if(isDay==0)
        day_night="Night";
      else
        day_night="--";

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
