import { Link } from "react-router-dom";
import {Menu} from 'lucide-react'

export function Home() {
  return (
    <>
      <header>
        <span className="logo">Daybreak Model College</span>
        <button>
          <Menu/>
        </button>
      </header>

      <main>
        <section className="hero">
          <div className="heroContent">
            <h1>
              Inspiring Excellence, Building <span>Futures</span>
            </h1>
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
