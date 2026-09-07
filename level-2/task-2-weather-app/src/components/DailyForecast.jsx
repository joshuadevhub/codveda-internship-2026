import { CloudSunRainIcon, CalendarDaysIcon, SunIcon } from "lucide-react";

export function DailyForecast() {
  return (
    <section>
      <div className="daily-heading">
        <CalendarDaysIcon size={20} className="clock-icon" />
        <h2>Daily Forecast</h2>
      </div>

      <div className="daily-forecast">
        <div className="daily-info">
          <p className="day">Today</p>
          <CloudSunRainIcon size={35} />
          <p className="condition">Rainy</p>
          <p className="temperature">29° / 24°</p>
        </div>

        <div className="daily-info">
          <p className="day">Tomorrow</p>
          <CloudSunRainIcon size={35} />
          <p className="condition">Rainy</p>
          <p className="temperature">28° / 23°</p>
        </div>

        <div className="daily-info">
          <p className="day">Wednesday</p>
          <SunIcon size={35} />
          <p className="condition">Sunny</p>
          <p className="temperature">31° / 25°</p>
        </div>

        <div className="daily-info">
          <p className="day">Thursday</p>
          <CloudSunRainIcon size={35} />
          <p className="condition">Cloudy</p>
          <p className="temperature">30° / 24°</p>
        </div>
      </div>
    </section>
  );
}
