import React, { useState } from 'react';
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);

  const { monthlyApplications: data } = useSelector((store) => store.allJobs);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>

      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;

const Wrapper = styled.section`
  margin-top: 3rem;
  text-align: center;

  button {
    display: inline-block;
    border: transparent;
    background: transparent;
    color: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;
  }
`;
