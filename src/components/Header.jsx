import { NavLink } from 'react-router-dom';

export default function Header() {
  return (    
    <NavLink to={'/'}>
      <h1 className="text-5xl md:text-6xl tracking-[0.2em] md:tracking-[0.3em] font-bold text-center">
        GRACES MEWS
      </h1>
    </NavLink>
  );
}
