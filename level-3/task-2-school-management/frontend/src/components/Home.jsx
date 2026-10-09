import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Navbar } from "./Navbar";
import { useState } from "react";

export function Home() {
  const [menu, setMenu] = useState(false);

  function handleOpenMenu() {
    setMenu(true);
  }
  function handleCloseMenu() {
    setMenu(false);
  }
  return (
    <>
      <header>
        <span className="logo">Daybreak Model College</span>
        <button onClick={handleOpenMenu} className="menu">
          <Menu />
        </button>
      </header>

      <Navbar openMenu={menu} closeMenu={handleCloseMenu} />

      <main>
        <section className="hero">
          <div className="heroContent">
            <div className="heroHeader">
              <h1>
                Inspiring Excellence,
              </h1>
              <p>Building <span>Futures</span></p>
            </div>

            <p>
              At DayBreak School, we nurture young minds with strong values,
              modern learning and boundless opportunities
            </p>
            <div className="cta">
              <Link to={"/registration"} className="register">
                Admission Open
              </Link>
              <Link to={"/login"} className="login">
                Login
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
