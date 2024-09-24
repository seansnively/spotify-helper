import { NavLink } from "react-router-dom";

const NavBar = () => {
  function toggleNavbar() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('open');
  }

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
          <NavLink to="/switchAccount">Switch Account or Logout</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;