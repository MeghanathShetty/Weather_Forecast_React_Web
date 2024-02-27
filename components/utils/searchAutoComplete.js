import axios from "axios";
import { toast } from "react-toastify";
import { toastErrorStyle } from "./toastStyle";

export const searchAutoComplete = async (str) => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const apihost = process.env.NEXT_PUBLIC_WEATHER_API_HOST;

    if (str && str.trim() !== "") {
      // console.log("Str "+str);
      const response = await axios.get(
        "https://weatherapi-com.p.rapidapi.com/search.json",
        {
          params: {
            q: str
          },
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": apihost,
          },
        }
      );
      return response.data; // Return the weather data
    } else {
      return null; 
    }
  } catch (error) {
    console.error("Error trying to search suggestions for locations:", error);
    // toast.error("Oops! Looks like the weather took a day off. Try again",toastErrorStyle());
    return null;
  }
};
