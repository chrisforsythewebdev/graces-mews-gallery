import { NavLink } from 'react-router-dom';

export default function Nav() {
  const activeStyle = 'underline';

  return (
    <nav className="space-x-4 md:space-x-8 text-sm md:text-base font-bold">
      <NavLink
        to="/exhibitions"
        className={({ isActive }) => (isActive ? activeStyle : '')}
      >
        EXHIBITIONS
      </NavLink>

      <NavLink
        to="/news"
        className={({ isActive }) => (isActive ? activeStyle : '')}
      >
        NEWS
      </NavLink>

      <NavLink
        to="/shop"
        className={({ isActive }) => (isActive ? activeStyle : '')}
      >
        SHOP
      </NavLink>

      <NavLink
        to="/info"
        className={({ isActive }) => (isActive ? activeStyle : '')}
      >
        INFO
      </NavLink>
    </nav>
  );
}
