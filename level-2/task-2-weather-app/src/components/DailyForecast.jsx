export function DailyForecast({ daily }) {
  if (!daily) {
    return null;
  }

  return (
    <section>
      <div className="daily-heading">
        <h2>7-Day Forecast</h2>
      </div>

      <div className="daily-forecast">
        {daily.time.map((date, index) => {
          const day = new Date(date);

          return (
            <div className="daily-info" key={date}>
              <p className="day">
                {day.toLocaleDateString([], {
                  weekday: "short",
                })}
              </p>

              <p className="condition">🌤️</p>

              <p className="temperature">{daily.temperature_2m_max[index]}°C</p>

              <p className="temperature">{daily.temperature_2m_min[index]}°C</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
