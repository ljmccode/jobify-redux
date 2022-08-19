import moment from 'moment';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import { JobInfo } from '../components';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';

const Job = ({
  company,
  createdAt,
  position,
  jobType,
  jobLocation,
  status,
  _id,
}) => {
  let date = moment(createdAt);
  date = date.format('MMM Do, YYYY');
  const { setEditJob, deleteJob } = useAppContext();

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-job'
              onClick={() => setEditJob(_id)}
              className='btn edit-btn'
            >
              Edit
            </Link>
            <button
              type='button'
              onClick={() => deleteJob(_id)}
              className='btn delete-btn'
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);

  header {
    display: grid;
    grid-template-columns: auto 1fr;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    align-items: center;

    h5 {
      letter-spacing: 0;
    }
  }

  .main-icon {
    color: white;
    font-size: 1.5rem;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    height: 60px;
    width: 60px;
    margin-right: 2rem;
  }

  .info {
    h5 {
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
    }
  }

  .content {
    padding: 1rem 1.5rem;
  }

  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .status {
    text-align: center;
    text-transform: capitalize;
    border-radius: var(--borderRadius);
    width: 100px;
    height: 30px;
    letter-spacing: var(--letterSpacing);
  }

  .pending {
    background: #fcefc7;
    color: #e9b949;
  }

  .interview {
    background: #e0e8f9;
    color: #647acb;
  }

  .declined {
    color: #d66a6a;
    background: #ffeeee;
  }

  footer {
    margin-top: 1rem;
  }

  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
  }

  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }
`;
