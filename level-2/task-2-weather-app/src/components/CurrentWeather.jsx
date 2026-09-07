import { CloudSunRain } from "lucide-react";

export function CurrentWeather() {
  return (
    <>
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
    </>
  );
}