import {
  AlignLeftIcon,
  CalendarDaysIcon,
  CloudSunRain,
  DropletIcon,
  SunIcon,
  WindIcon,
  Clock3Icon,
  SearchIcon,
  CloudSunRainIcon,
} from "lucide-react";
import "./App.css";

function App() {
  return (
    <>
      <header className="header">
        <AlignLeftIcon className="menu-icon" size={20} />
        <CalendarDaysIcon className="calender-icon" size={20} />
      </header>

      <main>
        <section className="search-input">
          <SearchIcon size={18} className="search-icon" />
          <input type="text" placeholder="Search City..." />
        </section>

        <section>
          <p className="country">
            <span>Mumbai</span>, India
          </p>
        </section>

        <section>
          <CloudSunRain className="weather-icon" />
        </section>

        <section>
          <div className="weather-details">
            <h1>29&deg;C</h1>
            <p>Expect high rain today</p>
          </div>
        </section>

        <section>
          <div className="weather-details-grid">
            <div>
              <WindIcon size={20} className="wind-icon" color="#f8fafc" />
              <p>
                <span>11</span>Km/hr
              </p>
            </div>

            <div>
              <DropletIcon size={20} className="droplet-icon" />
              <p>
                <span>0.2</span>%
              </p>
            </div>

            <div>
              <SunIcon size={20} className="sun-icon" color="#facc15" />
              <p>
                <span>8</span>hr
              </p>
            </div>
          </div>
        </section>

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
      </main>
    </>
  );
}

export default App;
