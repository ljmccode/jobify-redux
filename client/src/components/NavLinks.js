import links from '../utils/links';
import { NavLink } from 'react-router-dom';

const NavLinks = ({toggleSidebar}) => {
  return (
      <div className='nav-links'>
        {links.map((link) => {
          const {id, path, text, icon} = link
          return (
            <NavLink
              to={path}
              key={id}
              className='nav-link'
              onClick={toggleSidebar}
            >
              <span className='icon'>{icon}</span>
              {text}
            </NavLink>
          )
        })}
      </div>    
  )
};

export default NavLinks;
