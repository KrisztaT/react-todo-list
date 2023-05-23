
export async function fetchWeatherData() {

  try {
    const getPosition = () =>
      new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

    const position = await getPosition();
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const response = await fetch(
      `/.netlify/functions/fetchWeatherData?lat=${lat}&lon=${lon}&units=metric`
    );
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return fetchDefaultWeatherData();
  }
}

export async function fetchDefaultWeatherData() {
 let cityName = "Brisbane";

  try {
    const response = await fetch(
      `/.netlify/functions/fetchWeatherData?q=${cityName}&units=metric`
    );
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return {
      name: "Brisbane",
      main: {
        temp_max: "23",
        temp_min: "15",
      },
      weather: [
        {
          description: "moderate rain",
          icon: "10d",
        },
      ],
    };
  }
}
