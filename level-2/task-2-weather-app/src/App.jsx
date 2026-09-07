import { Header } from "./components/Header";
import "./App.css";
import { SearchBar } from "./components/SearchBar";
import { CurrentWeather } from "./components/CurrentWeather";
import { WeatherDetails } from "./components/WeatherDetails";
import { HourlyForecast } from "./components/HourlyForecast";
import { DailyForecast } from "./components/DailyForecast";

function App() {
  return (
    <>
      <Header/>
      <main>
        <SearchBar />
        <CurrentWeather />
        <WeatherDetails />
        <HourlyForecast />
        <DailyForecast/>
      </main>
    </>
  );
}

export default App;
