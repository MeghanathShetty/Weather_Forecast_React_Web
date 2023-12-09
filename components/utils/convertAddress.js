import { toast } from "react-toastify";
import { toastErrorStyle } from "./toastStyle";

export const convertAddressToLatLng = (address) => 
{
  return new Promise((resolve, reject) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      address
    )}&format=json`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          
          // Create an array to store nearby locations
          const nearbyLocations = [];

          // Add coordinates of up to 4 additional nearby locations
          for (let i = 0; i < Math.min(5, data.length); i++) {
            nearbyLocations.push({
              latitude: data[i].lat,
              longitude: data[i].lon,
            });
          }

          resolve(nearbyLocations);
        } else {
          reject('No results found for the address');
          toast.error("No location found. Please try typing something else.",toastErrorStyle());
        }
      })
      .catch((error) => {
        reject(`Error converting address to LatLng: ${error.message}`);
      });
  });
};
