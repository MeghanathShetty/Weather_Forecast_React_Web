import axios from "axios";
import { toast } from "react-toastify";

export const loadWeather = async (lat, long) => {
  try {
    const apiKey=process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const apihost=process.env.NEXT_PUBLIC_WEATHER_API_HOST;

    let location = `${lat},${long}`;
    // location="19.23,34.0";
    const response = await axios.get(
      "https://weatherapi-com.p.rapidapi.com/current.json",
      {
        params: { q: location }, // put location here
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": apihost,
        },
      }
    );

    console.log("Weather API Response:", response.data);
    return response.data; // Return the weather data
  } catch (error) {
    console.error("Error getting the weather:", error);
    toast.error("Apocalypse is near! Couldn't load weather");
    return null;
  }
};
