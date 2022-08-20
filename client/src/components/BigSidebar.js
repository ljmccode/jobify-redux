import styled from 'styled-components';
import { Logo, NavLinks } from '../components';
import { useSelector } from 'react-redux';

const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen
            ? 'sidebar-container '
            : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;

const Wrapper = styled.aside`
  display: none;

  @media screen and (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);

    .sidebar-container {
      background: var(--white);
      min-height: 100vh;
      height: 100%;
      width: 250px;
      margin-left: -250px;
      transition: var(--transition);
    }

    .show-sidebar {
      margin-left: 0;
    }

    .content {
      position: sticky;
      top: 0;
    }

    header {
      height: var(--nav-height);
      display: flex;
      align-items: center;
      justify-content: center;
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
      padding-left: 2.5rem;
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
      padding-left: 3rem;
      background: var(--grey-50);
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
  }
`;
