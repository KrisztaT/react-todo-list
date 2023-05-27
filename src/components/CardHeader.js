import { useEffect, useState } from "react";
import { Card, ListGroup, Dropdown } from "react-bootstrap";
import { fetchWeatherData } from "../utils/WeatherAPI";
import { useLocalStorage } from "react-use";
import { FunnelFill, SortDownAlt } from "react-bootstrap-icons";

const CardHeader = ({ dispatch }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [lastFetchDate, setLastFetchDate] = useLocalStorage("lastFetchDate", 0);

  const handleDropdownSelect = (eventKey) => {
    if (eventKey === "dueDate") {
      sortByDueDate();
    } else if (eventKey === "status") {
      sortByStatus();
    }
  };

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
      if (
        currentTime - lastFetchDate >= oneHour ||
        localStorage.getItem("closed")
      ) {
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
    <Card.Header className="text-center bg-white sticky-top">
      <p className="fs-1 text-secondary mb-0">ToDo List</p>
      <ListGroup className="overflow auto">
        <ListGroup.Item className="p-0 m-0">
          <div class="container">
            <div class="row justify-content-evenly align-items-center">
              <div class="col-auto">
                {weatherData && (
                  <div className="d-flex align-items-center">
                    <p className="mb-0 mr-2">{weatherData.name}</p>
                    <img
                      id="weather-icon"
                      src={iconFetcher()}
                      alt="Weather icon"
                      className="weather-icon mr-2"
                    />
                    <p className="mb-0 mr-2">
                      {Math.floor(weatherData.main.temp_max)}/
                      {Math.floor(weatherData.main.temp_min)} C
                    </p>
                  </div>
                )}
              </div>
              <div class="col-auto">
                <Dropdown onSelect={handleDropdownSelect}>
                  <Dropdown.Toggle
                    variant="outline-secondary"
                    id="sorting-dropdown"
                    className="btn-sm"
                  >
                    Sort by
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="dueDate">
                      Due date <SortDownAlt size={20} />
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="status">
                      Status <FunnelFill size={18} />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Card.Header>
  );
};

export default CardHeader;
