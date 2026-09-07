import { WindIcon, DropletIcon, SunIcon } from "lucide-react";

export function WeatherDetails() {
  return (
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
  );
}
