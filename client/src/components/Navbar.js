import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { useAppContext } from '../context/appContext';
import { Logo } from '../components';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  // const [showLogout, setShowLogout] = useState(false);
  // const { user, toggleSidebar, logoutUser } = useAppContext();

  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggleSidebar}>
          <GiHamburgerMenu />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button
            type='button'
            className='btn'
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle /> {user?.name} <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button type='button' className='dropdown-btn' onClick={logoutUser}>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  background-color: var(--white);

  .nav-center {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: var(--fluid-width);
  }

  .btn-container {
    position: relative;
  }

  .toggle-btn {
    border: none;
    background: transparent;
    color: var(--primary-500);
    font-size: 2rem;
    align-items: center;
    cursor: pointer;
  }

  .logo {
    display: flex;
    align-items: center;
    width: 100px;
  }

  .logo-text {
    display: none;
    margin: 0;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
  }

  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    text-align: center;
    visibility: hidden;
  }

  .show-dropdown {
    visibility: visible;
  }

  .dropdown-btn {
    color: var(--primary-500);
    background: var(--primary-100);
    width: 100%;
    letter-spacing: var(--letterSpacing);
    padding: 0.75rem 0.5rem;
    border: none;
    text-transform: capitalize;
    box-shadow: var(--shadow-2);
    border-radius: var(--borderRadius);
    cursor: pointer;
  }

  @media screen and (min-width: 992px) {
    position: sticky;
    top: 0;

    .nav-center {
      width: 90%;
    }

    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  }
`;
