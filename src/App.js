import { useState, useEffect, useCallback } from "react";
import "./App.css";

function App() {
  const key_weather = "857c9713e8955051b03bba131a833160";

  const [weather, setWeather] = useState([]);
  const [date, setDate] = useState("");
  console.log(date);

  const updatedDate = () => {
    const myDate = new Date();
    console.log(myDate.toLocaleString());
    const hours = myDate.getHours();
    const minutes = myDate.getMinutes();
    const seconds = myDate.getSeconds();
    setDate(`${hours}:${minutes}:${seconds}`);
  };

  //Get api request
  const getWeatherInfo = useCallback( () => {
    navigator.geolocation.getCurrentPosition((success) => {
      const { latitude, longitude } = success.coords;
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${key_weather}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setWeather([data]);
          updatedDate();
        });
    });
  }, [])

  useEffect(() => {
    getWeatherInfo();
  }, [getWeatherInfo]);

  return (
    <div className="App">
      <h1 className="main_title">Weather forecast</h1>
      {weather.map((item) => (
        <div className="weather_container" key={item.timezone}>
          <div className="main_sector">
            <div className="main_upper">
              <h2>{date}</h2>
              <h2>{item.timezone}</h2>
            </div>
            <div className="main_lower">
              <h2 className="temperature">{item.current.temp}°C</h2>
              <h2>{item.current.weather[0].main}</h2>
            </div>
          </div>

          <div className="side_sector">
            <div className="side_upper">
              <div>
                <span className="title">HUMIDITY</span>
                <span>{item.current.humidity}%</span>
              </div>
              <div>
                <span className="title">PRESSURE</span>
                <span>{item.current.pressure}</span>
              </div>
              <div>
                <span className="title">WIND</span>
                <span>{item.current.wind_speed}km/h</span>
              </div>
              <div>
                <span className="title">VISIBILITY</span>
                <span>{item.current.visibility}m</span>
              </div>
              <div>
                <span className="title">SUNRICE</span>
                <span>{item.current.sunrise}m</span>
              </div>
              <div>
                <span className="title">SUNSET</span>
                <span>{item.current.sunset}m</span>
              </div>
            </div>
            <div className="side_lower">
              {item.daily.map((item) => (
                <div className="weather_future" key={item.dt}>
                  <div><img src={`http://openweathermap.org/img/wn//${item.weather[0].icon}@4x.png`} alt={item.weather[0].description} className="weather_icon"/></div>
                  <div>{Math.round(item.temp.day)}°C</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
