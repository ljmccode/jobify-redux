import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../features/user/userSlice';
import { Logo, NavLinks } from '../components';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

const SmallSidebar = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((store) => store.user);

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className='content'>
          <button type='button' className='close-btn' onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggle} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;

const Wrapper = styled.aside`
  @media (min-width: 992px) {
    display: none;
  }

  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: var(--transition);
  }

  .show-sidebar {
    z-index: 99;
    opacity: 1;
  }

  .content {
    background: var(--white);
    width: var(--fluid-width);
    height: 95vh;
    border-radius: var(--borderRadius);
    padding: 4rem 2rem;
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .close-btn {
    color: var(--red-dark);
    border: none;
    background: transparent;
    font-size: 2rem;
    cursor: pointer;
    position: absolute;
    top: 12px;
    left: 12px;
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
  }

  .nav-link {
    color: var(--grey-500);
    text-transform: capitalize;
    display: flex;
    align-items: center;
    padding: 1.3rem 0;
    transition: var(--transition);
  }

  .icon {
    margin-right: 1rem;
    font-size: 1.5rem;
    display: grid;
    place-items: center;
    transition: var(--transition);
  }

  .nav-link:hover {
    color: var(--grey-900);
  }

  .nav-link:hover .icon {
    color: var(--primary-500);
  }

  .active {
    color: var(--grey-900);
  }

  .active .icon {
    color: var(--primary-500);
  }
`;
