import styled from 'styled-components';

const StatsItem = ({ title, count, icon, color, bcg }) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className='count'>{count}</span>
        <span className='icon'>{icon}</span>
      </header>
      <h5 className='title'>{title}</h5>
    </Wrapper>
  );
};

export default StatsItem;

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  padding: 2rem;
  border-bottom: 5px solid ${(props) => props.color};

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .count {
    font-size: 3rem;
    color: ${(props) => props.color};
  }

  .icon {
    font-size: 2rem;
    display: grid;
    place-items: center;
    padding: 1rem;
    border-radius: var(--borderRadius);
    color: ${(props) => props.color};
  }

  .title {
    margin: 0;
    margin-top: 0.5rem;
  }
`;
