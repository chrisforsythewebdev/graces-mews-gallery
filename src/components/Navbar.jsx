import { NavLink, useLocation } from 'react-router-dom';

export default function Nav() {
  const { pathname } = useLocation();
  const activeStyle = 'underline';

  return (
    <nav className="space-x-4 md:space-x-8 text-2xl font-bold md:mb-8">
      <NavLink
        to="/exhibitions"
        className={({ isActive }) =>
          isActive || pathname.startsWith('/artist') ? activeStyle : ''
        }
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
