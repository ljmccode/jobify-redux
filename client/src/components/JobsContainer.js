import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { getJobs } from '../features/allJobs/allJobsSlice';
import Loading from './Loading';
import Job from './Job';
import styled from 'styled-components';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = () => {
  const {
    jobs,
    isLoading,
    page,
    totalJobs,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((store) => store.allJobs);

  useEffect(() => {
    // getJobs();
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort]);

  if (isLoading) {
    return <Loading center />;
  }
  if (totalJobs === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{totalJobs > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }

  .jobs {
    display: grid;
    gap: 2rem;
  }

  @media (min-width: 992px) {
    .jobs {
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;
