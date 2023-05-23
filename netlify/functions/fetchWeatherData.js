
const axios = require('axios');

exports.handler = async function (event, context) {
  try {
    const { lat, lon, cityName } = event.queryStringParameters;
   console.log( process.env.WEATHER_API_KEY)
    let response;
    if (lat && lon) {
      response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&units=metric`
      );
    } else {
      response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?APPID=${process.env.WEATHER_API_KEY}&q=${cityName}&units=metric`
      );
    }

    const data = response.data;

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};