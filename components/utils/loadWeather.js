import axios from "axios";
import { toast } from "react-toastify";

export const loadWeather = async (lat, long) => {
  try {
    let location = `${lat},${long}`;
    // location="19.23,34.0";
    const response = await axios.get(
      "https://weatherapi-com.p.rapidapi.com/current.json",
      {
        params: { q: location }, // put location here
        headers: {
          "X-RapidAPI-Key": "21ae68e8d8msha056b38aed1dbf5p1ed457jsn8fea35201379",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      }
    );
    console.log(response.data);
    return response.data; // Return the weather data
  } catch (error) {
    console.error("Error getting the weather:", error);
    toast.error("Apocalypse is near! Couldn't load weather");
    return null;
  }
};
