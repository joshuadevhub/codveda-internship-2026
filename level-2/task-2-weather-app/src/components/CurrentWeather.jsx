import { CloudSunRain } from "lucide-react";

export function CurrentWeather({ cityName, temp, weatherCode }) {
  function getWeatherCodeMessage() {
    if (weatherCode === undefined) {
      return "Search for a city";
    }

    let message = "Clear Sky";

    if (weatherCode === 0) {
      message = "Clear sky";
    } else if (weatherCode === 1 || weatherCode === 2 || weatherCode === 3) {
      message = "Mainly clear, partly cloudy, and overcast";
    } else if (weatherCode === 45 || weatherCode === 48) {
      message = "Fog and depositing rime fog";
    } else if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55) {
      message = "Drizzle: Light, moderate, and dense intensity";
    } else if (weatherCode === 56 || weatherCode === 57) {
      message = "Freezing Drizzle: Light and dense intensity";
    } else if (weatherCode === 61 || weatherCode === 63 || weatherCode === 65) {
      message = "Rain: Slight, moderate and heavy intensity";
    } else if (weatherCode === 66 || weatherCode === 67) {
      message = "Freezing Rain: Light and heavy intensity";
    } else if (weatherCode === 71 || weatherCode === 73 || weatherCode === 75) {
      message = "Snow fall: Slight, moderate, and heavy intensity";
    } else if (weatherCode === 77) {
      message = "Snow grains";
    } else if (weatherCode === 80 || weatherCode === 81 || weatherCode === 82) {
      message = "Rain showers: Slight, moderate, and violent";
    } else if (weatherCode === 85 || weatherCode === 86) {
      message = "Snow showers slight and heavy";
    } else if (weatherCode === 95 || weatherCode === 96 || weatherCode === 99) {
      message = "Thunderstorm with slight and heavy hail";
    }

    return message;
  }

  return (
    <>
      <section>
        <p className="country">
          <span>{cityName || "Weather App"}</span>
        </p>
      </section>

      <section>
        <CloudSunRain className="weather-icon" />
      </section>

      <section>
        <div className="weather-details">
          <h1>{temp !== undefined ? `${temp}°C` : "--°C"}</h1>

          <p>{getWeatherCodeMessage()}</p>
        </div>
      </section>
    </>
  );
}