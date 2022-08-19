import { StatsContainer, ChartsContainer, Loading } from '../../components';
import { useAppContext } from '../../context/appContext';
import { useEffect } from 'react';

const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useAppContext();

  useEffect(() => {
    showStats();
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
