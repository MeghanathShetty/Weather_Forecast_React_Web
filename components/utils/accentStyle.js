export const changeAccentStyle = (accentOption) => 
{
    if (accentOption !== null && accentOption !== '0') 
    {
      const styleElement = document.createElement('style');
      let backColor,fcolor;
      if (accentOption === '1') {
        backColor = "#c4ffba"; // green
      } else if (accentOption === '2') {
        backColor = '#fbfafa'; // pink
        fcolor = '#696969';
      } else if (accentOption === '3') {
        backColor = '#FFBB54'; // orange
      } else if (accentOption === '4') {
        backColor = '#e3fcff'; // blue
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
          background-color: ${backColor};
          color: #000;
          text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);

        }`;
      }
     
      return styleElement;
    }
    return document.createElement('style'); // Return an empty style element
  };
  