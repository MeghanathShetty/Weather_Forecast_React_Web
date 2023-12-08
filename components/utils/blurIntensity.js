export const changeBlurIntensity=(blurOption)=>
{
    if (blurOption !== null) 
    {
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        .top-main,.mid-hourly-sets,.mid-right{ backdrop-filter: blur(${blurOption}px); }
      `;
      document.head.appendChild(styleElement);
  
      return () => {
        // Cleanup: Remove the style element when the component unmounts
        document.head.removeChild(styleElement);
      };
    }
}