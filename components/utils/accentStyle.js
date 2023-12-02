export const changeAccentStyle = (accentOption) => 
{
    if (accentOption !== null && accentOption !== '0') 
    {
      let backColor;
      if (accentOption === '1') {
        backColor = "#c4ffba"; // light green
      } else if (accentOption === '2') {
        backColor = '#ffc7f8'; // light pink
      } else if (accentOption === '3') {
        backColor = '#FFBB54'; // light orange
      }
  
      const styleElement = document.createElement('style');
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
        }
      `;
      return styleElement;
    }
    return document.createElement('style'); // Return an empty style element
  };
  