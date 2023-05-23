import { useEffect, useState } from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { FunnelFill, SortDownAlt } from "react-bootstrap-icons";
import { fetchWeatherData } from "../utils/WeatherAPI";
import { useLocalStorage } from "react-use";

const CardHeader = ({ dispatch }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [lastFetchDate, setLastFetchDate] = useLocalStorage("lastFetchDate", 0);

  const sortByDueDate = () => {
    dispatch({ type: "SORT_BY_DUE_DATE" });
  };

  const sortByStatus = () => {
    dispatch({ type: "SORT_BY_STATUS" });
  };

  
  useEffect(() => {
    const fetchAndSetWeatherData = async () => {
      const currentTime = Date.now();
      const oneHour = 60 * 60 * 1000;
  
      // only fetching weather data every hour
      if (currentTime - lastFetchDate >= oneHour || localStorage.getItem("closed")) {
        const data = await fetchWeatherData();
        setWeatherData(data);
        setLastFetchDate(currentTime);
        localStorage.removeItem("closed");
      }
    };

    fetchAndSetWeatherData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleCloseEvent = () => {
      localStorage.setItem("closed", true);
    };

    window.addEventListener("beforeunload", handleCloseEvent);

    return () => {
      window.removeEventListener("beforeunload", handleCloseEvent);
    };
  }, []);

  const iconFetcher = () => {
    let iconCode = weatherData.weather[0].icon;
    let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    return iconUrl;
  };

  return (
    <Card.Header className="text-center sticky-top">
      <h1>ToDo List</h1>
      <ListGroup>
        <ListGroup.Item>
          <div className="d-flex justify-content-between align-items-center overflow-auto">
            <div className="d-flex overflow-auto ">
              <Button variant="outline-secondary" onClick={sortByDueDate}>
                Date <SortDownAlt size={16} />
              </Button>
              <Button variant="outline-secondary" onClick={sortByStatus}>
                Status <FunnelFill size={16} />
              </Button>
            </div>
            <div className="d-flex justify-content-center align-items-center flex-column overflow-auto">
              {weatherData && (
                <>
                  <p>{weatherData.name}</p>
                  <img
                    id="weather-icon"
                    src={iconFetcher()}
                    alt="Weather icon"
                  />
                  <p>
                    {Math.floor(weatherData.main.temp_max)}/
                    {Math.floor(weatherData.main.temp_min)} C{" "}
                  </p>
                 <p> {weatherData.weather[0].description} </p>
                </>
              )}
            </div>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Card.Header>
  );
};

export default CardHeader;
