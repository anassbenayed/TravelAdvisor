import axios from "axios";

//Travel Advisor API
export const getPlacesDetails = async (type, sw, ne) => {
  try {
    const response = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
          "x-rapidapi-key":
            "3ffc8970d5msh18636df72ed61ebp1d6393jsn495f87bc7217", //process.env.TRAVEL_ADVISOR_API_KEY,
        },
      }
    );

    return response?.data?.data;
  } catch (error) {
    console.log("getPlacesDetails error: ", error);
  }
};
