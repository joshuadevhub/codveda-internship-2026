import { SearchIcon } from "lucide-react";
import { useState } from "react";

export function SearchBar({ onSearch }) {
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState("");

  function validateError(value) {
    if (value === "") {
      return "Please enter a city";
    }
    return "";
  }

  function handleChange(e) {
    const value = e.target.value;
    setCityName(value);
    setError(validateError(value));
  }

  function submitCity(e) {
    e.preventDefault();
    
    const validationError = validateError(cityName);
    setError(validationError);

    if (!validationError) {
      onSearch(cityName);
      setCityName("");
      console.log("Form Submitted Successfully");
    }
  }

  return (
    <form className="search-input" onSubmit={submitCity}>
      <div>
        <SearchIcon size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search City..."
          value={cityName}
          onChange={handleChange}
        />
      </div>
      {error && <p>{error}</p>}
    </form>
  );
}