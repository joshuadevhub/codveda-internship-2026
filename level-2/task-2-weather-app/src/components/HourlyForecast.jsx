export function HourlyForecast({ hourly }) {
  if (!hourly) {
    return null;
  }

  const hours = hourly.time.slice(0, 8);

  return (
    <section>
      <div className="forecast-heading">
        <h2>Hourly Forecast</h2>
      </div>

      <div className="weather-forecast">
        {hours.map((time, index) => {
          const date = new Date(time);

          return (
            <div className="forecast-info" key={time}>
              <p>
                {date.toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>

              <p className="forecast-icon">🌤️</p>

              <p>{hourly.temperature_2m[index]}°C</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
