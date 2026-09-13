import { Header } from "./components/Header";
import "./App.css";
import { SearchBar } from "./components/SearchBar";
import { CurrentWeather } from "./components/CurrentWeather";
import { WeatherDetails } from "./components/WeatherDetails";
import { HourlyForecast } from "./components/HourlyForecast";
import { DailyForecast } from "./components/DailyForecast";
import { useEffect, useState } from "react";

function App() {
  const [currentCity, setCurrentCity] = useState("");
  const [location, setLocation] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentCity === "") {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setError("");
    setWeatherData({});

    const geoCodingApi = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      currentCity,
    )}&count=1`;

    async function fetchLocation() {
      try {
        const res = await fetch(geoCodingApi);

        if (!res.ok) {
          const errorMessage = await res.text();
          throw new Error(errorMessage);
        }

        const data = await res.json();

        if (!data.results || data.results.length === 0) {
          setCurrentCity("");
          setLocation({});
          throw new Error("City not found");
        }

        setLocation(data.results[0]);
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      }
    }

    fetchLocation();
  }, [currentCity]);

  useEffect(() => {
    if (location.latitude === undefined || location.longitude === undefined) {
      return;
    }

    const latitude = location.latitude;
    const longitude = location.longitude;

    const weatherApi =
      `https://api.open-meteo.com/v1/forecast?` +
      `latitude=${latitude}&longitude=${longitude}` +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
      `&hourly=temperature_2m,weather_code` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
      `&timezone=auto`;

    async function fetchWeather() {
      try {
        const res = await fetch(weatherApi);

        if (!res.ok) {
          const errorMessage = await res.text();
          throw new Error(errorMessage);
        }

        const data = await res.json();

        setWeatherData(data);
      } catch (err) {
        setError("Unable to fetch weather data");
        console.log(err.message);
      }
    }

    fetchWeather();
  }, [location]);

  function displayCity(cityName) {
    setCurrentCity(cityName);
  }

  return (
    <>
      <Header />

      <main>
        <SearchBar onSearch={displayCity} />

        {error && (
          <p
            style={{
              color: "#f87171",
              textAlign: "center",
              fontSize: "0.9rem",
              marginBottom: "0.5rem",
            }}
          >
            {error}
          </p>
        )}

        <CurrentWeather
          cityName={location.name}
          temp={weatherData.current?.temperature_2m}
          weatherCode={weatherData.current?.weather_code}
        />

        <WeatherDetails
          humidity={weatherData.current?.relative_humidity_2m}
          feelsLike={weatherData.current?.apparent_temperature}
          windSpeed={weatherData.current?.wind_speed_10m}
        />

        <HourlyForecast hourly={weatherData.hourly} />

        <DailyForecast daily={weatherData.daily} />
      </main>
    </>
  );
}

export default App;
