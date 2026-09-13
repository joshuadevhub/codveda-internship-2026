export function WeatherDetails({ humidity, feelsLike, windSpeed }) {
  return (
    <section className="weather-details-grid">
      <div>
        <p>
          Humidity
          <br />
          <span>{humidity !== undefined ? `${humidity}%` : "--"}</span>
        </p>
      </div>

      <div>
        <p>
          Feels Like
          <br />
          <span>{feelsLike !== undefined ? `${feelsLike}°C` : "--"}</span>
        </p>
      </div>

      <div>
        <p>
          Wind
          <br />
          <span>{windSpeed !== undefined ? `${windSpeed} km/h` : "--"}</span>
        </p>
      </div>
    </section>
  );
}
