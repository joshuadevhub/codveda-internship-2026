import { SearchIcon } from "lucide-react";

export function SearchBar() {
  return (
    <section className="search-input">
      <SearchIcon size={18} className="search-icon" />
      <input type="text" placeholder="Search City..." />
    </section>
  );
}