import { CloudSunRainIcon, Clock3Icon } from "lucide-react";

export function HourlyForecast() {
  return (
    <section>
      <div className="forecast-heading">
        <Clock3Icon size={20} className="clock-icon" />
        <h2>Hourly Forecast</h2>
      </div>

      <div className="weather-forecast">
        <div className="forecast-info">
          <CloudSunRainIcon size={50} color="#facc15" />
          <p>Now</p>
          <p>29&deg;</p>
        </div>

        <div className="forecast-info">
          <CloudSunRainIcon size={50} color="#facc15" />
          <p>Now</p>
          <p>29&deg;</p>
        </div>

        <div className="forecast-info">
          <CloudSunRainIcon size={50} color="#facc15" />
          <p>Now</p>
          <p>29&deg;</p>
        </div>

        <div className="forecast-info">
          <CloudSunRainIcon size={50} color="#facc15" />
          <p>Now</p>
          <p>29&deg;</p>
        </div>

        <div className="forecast-info">
          <CloudSunRainIcon size={50} color="#facc15" />
          <p>Now</p>
          <p>29&deg;</p>
        </div>

        <div className="forecast-info">
          <CloudSunRainIcon size={50} color="#facc15" />
          <p>Now</p>
          <p>29&deg;</p>
        </div>
      </div>
    </section>
  );
}