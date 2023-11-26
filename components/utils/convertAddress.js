import { toast } from "react-toastify";

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
          // // Extract latitude and longitude for the first result
          // const u_lat = data[0].lat;
          // const u_lon = data[0].lon;

          // Create an array to store nearby locations
          const nearbyLocations = [];

          // Add the coordinates of the first result
          // nearbyLocations.push({ latitude: u_lat, longitude: u_lon });

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
          toast.error("No Location Found, Please type something else");
        }
      })
      .catch((error) => {
        reject(`Error converting address to LatLng: ${error.message}`);
      });
  });
};
