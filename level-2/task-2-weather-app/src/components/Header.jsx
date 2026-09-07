import { AlignLeftIcon, CalendarDaysIcon } from "lucide-react";

export function Header() {
  return (
    <header className="header">
      <AlignLeftIcon className="menu-icon" size={20} />
      <CalendarDaysIcon className="calender-icon" size={20} />
    </header>
  );
}
