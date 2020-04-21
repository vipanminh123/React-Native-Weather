const url = 'http://api.openweathermap.org/data/2.5/forecast/daily';
const appId = 'da9d6e14bf1eddc0eb773a327de2661c';

// export const fetchLocationId = async city => {
//   const response = await fetch(
//     `https://www.metaweather.com/api/location/search/?query=${city}`,
//   );
//   const locations = await response.json();
//   return locations[0].woeid;
// };

export const fetchWeather = async location => {
  const response = await fetch(
    `${url}?q=${location}&cnt=7&appid=${appId}`,
  );
  const { city, list } = await response.json();

  return {
    location: city.name,
    list_weather: list
  };
};

export const fetchWeatherByPosition = async (lat, lon) => {
  const response = await fetch(
    `${url}?lat=${lat}&lon=${lon}&cnt=7&appid=${appId}`,
  );
  const { city, list } = await response.json();

  return {
    location: city.name,
    list_weather: list
  };
};
