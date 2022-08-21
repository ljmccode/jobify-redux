import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StatsContainer, ChartsContainer, Loading } from '../../components';
import { showStats } from '../../features/allJobs/allJobsSlice';

const Stats = () => {
  const dispatch = useDispatch();
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  );

  useEffect(() => {
    dispatch(showStats());
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    <Loading />;
  }
  return (
    <section>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </section>
  );
};
export default Stats;
