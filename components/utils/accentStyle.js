export const changeAccentStyle = (accentOption) => 
{
    if (accentOption !== null && accentOption !== '0') 
    {
      const styleElement = document.createElement('style');
      let color1,color2;
      if (accentOption === '1') { // black
        color1 = "#ffffff"; 
        color2 = "#000000"; 
      } else if (accentOption === '2') { //white/some
        color1 = "#0F4C75"; 
        color2 = "#ffffff";
      } else if (accentOption === '3') { // black/blue
        color1 = "#3FC1C9"; 
        color2 = "#000000";
      }
  
      styleElement.textContent = `

      .mid-main,.top-main,.sidebar-main {
        color:${color1};
      }

      .search-input,.search-input::placeholder
      { color: ${color1}; }
  

        // .sub-main
        // {
        //   background-color: ${color1};
        // }

        .top-main,.sidebar-main,.mid-hourly-sets,.mid-right
        {
          background-color: ${color2};

        }
      
        .accent-options-main
        {
            border: 1px solid ${color1};
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
  