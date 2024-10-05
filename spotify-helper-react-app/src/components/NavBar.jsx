import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Top Tracks</NavLink>
        </li>
        <li>
          <NavLink to="/vibe">Vibe</NavLink>
        </li>
        <li>
          <NavLink to="/switchAccount">Logout</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;