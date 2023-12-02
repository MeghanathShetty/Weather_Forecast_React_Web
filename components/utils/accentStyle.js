export const changeAccentStyle = (accentOption) => 
{
    if (accentOption !== null && accentOption !== '0') 
    {
      const styleElement = document.createElement('style');
      let backColor;
      if (accentOption === '1') {
        backColor = "#c4ffba"; // green
      } else if (accentOption === '2') {
        backColor = '#ff8aa3'; // pink
      } else if (accentOption === '3') {
        backColor = '#FFBB54'; // orange
      } else if (accentOption === '4') {
        backColor = '#e3fcff'; // blue
      }
  
      if (accentOption === '5') {
        styleElement.textContent = `
          .sub-main,
          .top-main,
          .bot-inner,
          .side-bar-container-open,
          .search-result-loc,
          .search-input,
          .mid-main-img,
          .mid-temp,
          .mid-text,
          .mid-loc,
          h5,
          h3,
          p,
          b,
          label {
            background-color: #000000;
            color: #ffffff;
            text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.9);
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
        .sub-main,
        .top-main,
        .bot-inner,
        .side-bar-container-open,
        .search-result-loc,
        .search-input,
        .mid-main-img,
        .mid-temp,
        .mid-text,
        .mid-loc,
        h5,
        h3,
        p,
        b,
        label {
          background-color: ${backColor};
          color: #000;
          text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.9);
        }`;
      }
     
      return styleElement;
    }
    return document.createElement('style'); // Return an empty style element
  };
  