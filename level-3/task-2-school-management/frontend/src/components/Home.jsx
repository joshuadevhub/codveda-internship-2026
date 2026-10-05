import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <header>
        <h1>Daybreak Model College</h1>
      </header>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea hic deleniti
        nemo, quam consequuntur officiis adipisci voluptates natus error qui,
        cumque fugit, veniam culpa numquam. Sit voluptatum molestiae nihil
        temporibus.
      </p>

      <Link to={"/login"} className="login"> Login</Link>
    </>
  );
}
