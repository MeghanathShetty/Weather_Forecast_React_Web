export const changeAccentStyle = (accentOption) => 
{
    if (accentOption !== null && accentOption !== '0') 
    {
      const styleElement = document.createElement('style');
      let color1,color2,shadowPixel;
      if (accentOption === '1') { // black
        color1 = "#dddddd"; 
        color2 = "#000000";
        shadowPixel=3; 
      } else if (accentOption === '2') { //white/darkgreen
        color1 = "#006400"; 
        color2 = "#ffffff";
        shadowPixel=0; 
      } else if (accentOption === '3') { // black/lighterCyan
        color1 = "#00cccc"; 
        color2 = "#000000";
        shadowPixel=3; 
      }
  
      styleElement.textContent = `

      .mid-main,
      .top-main,
      .location-suggestion-box,
      .sidebar-main,
      .search-input,
      .search-input::placeholder {
          color: ${color1};
      }
  

        // .sub-main
        // {
        //   background-color: ${color1};
        // }

        .sidebar-main,.mid-hourly-sets,.mid-right,
        .top-main,.top-sidebar-close-icon
        {
          background-color: ${color2};
        }

        .location-suggestion-box
        {
          // box-shadow: 0px ${shadowPixel}px 7px 0px ${color1};
        }

        .suggestion-set
        {
          border-bottom: 1px solid ${color1};
        }

        .mid-sub1-Details
        {
          color: ${color1};
          background-color: ${color2};
          border-radius: 8px;
          border: 3px solid ${color1};
        }

        .top-sidebar-close-icon
        {
          border-bottom: 2px solid ${color1};
          box-shadow: 0px ${shadowPixel}px 7px 0px ${color1};
        }

        .search-input,.sidebar-main,.top-main,.mid-right,.mid-hourly-sets
        {
            border: 2px solid ${color1};
        }

        .mid-right-part1 {
          border-bottom: 3px solid ${color1};
        }

        .mid-right-part1-row {
          border-bottom: 1px solid ${color1};
        }
      
        .accent-options-main,.search-result-container,.search-result,.search-input
        {
            border: 1px solid ${color1};
            box-shadow: 0px ${shadowPixel}px 7px 0px ${color1};
        }

        .accent-options-sub1 #color0,
        .accent-options-sub1 #color1,
        .accent-options-sub2 #color2,
        .accent-options-sub2 #color3
        {
          border: 2.5px solid ${color1};
        }

      `;
      return styleElement;
    }
    return document.createElement('style'); // Return an empty style element
  };
  