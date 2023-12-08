export const getAirQuality=(air)=>
{

    // Based on us-epa-index 
      let airQuality = '';
      
      if (air == 1) {
        airQuality = ' Good';
      } else if (air == 2) {
        airQuality = ' Moderate';
      } else if (air == 3) {
        airQuality = ' Moderate';
      } else if (air == 4) {
        airQuality = ' Unhealthy';
      } else if (air == 5) {
        airQuality = ' Very Unhealthy';
      }  else if (air == 6) {
        airQuality = ' Hazardous';
      }
      
      return airQuality;
      
}