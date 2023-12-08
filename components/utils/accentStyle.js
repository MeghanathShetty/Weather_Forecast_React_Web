export const changeAccentStyle = (accentOption) => 
{
    if (accentOption !== null && accentOption !== '0') 
    {
      const styleElement = document.createElement('style');
      let backColor1,backColor2,fcolor1,fcolor2;
      if (accentOption === '1') {
        backColor1 = "#ffffff"; // green
        backColor2 = "#ffffff"; // green
        fcolor1 = "#000";
        fcolor2 = "#000";
      } else if (accentOption === '2') {
        backColor1 = "#F1EFE9"; // green
        backColor2 = "#F1EFE9"; // green
        fcolor1 = "#000";
        fcolor2 = "#000";
      } else if (accentOption === '3') {
        backColor1 = "#ffffff"; // green
        backColor2 = "#F5F7F8"; // green
        fcolor1 = "#000";
        fcolor2 = "#000";
      } else if (accentOption === '4') {
        backColor1 = "#ffffff"; // green
        backColor2 = "#092635"; // green
        fcolor1 = "#ffffff";
        fcolor2 = "#092635";
      }
  
      if (accentOption === '5') {
        styleElement.textContent = `
        .mid-main,.top-main,.sidebar-main {
            background-color: #000000;
            color: #ffffff;
            text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
          }

          .accent-options-sub1 #color0,
          .accent-options-sub1 #color1,
          .accent-options-sub1 #color2,
          .accent-options-sub2 #color3,
          .accent-options-sub2 #color4,
          .accent-options-sub2 #color5 {
            border: 2.5px solid #ffffff;
          }
        `;
      }      
      else
      {
        styleElement.textContent = `

        .mid-main,.top-main,.sidebar-main {
          color:${fcolor1};
          text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
        }

        .search-input
        { color: ${fcolor1}; }
    

          .sub-main
          {
            background-color: ${backColor1};
          }

          .top-main
          {
            background-color: ${backColor2};

          }

          .sidebar-main
          {
            background-color: ${backColor2};
          }

          .mid-right
          {
            background-color: ${backColor2};
            text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
          }

          .mid-hourly-sets
          {
            background-color: ${backColor2};
          }

          .mid-details,.mid-hourly-head
          {
            color:${fcolor2};
          }
        `;
      }
     
      return styleElement;
    }
    return document.createElement('style'); // Return an empty style element
  };
  