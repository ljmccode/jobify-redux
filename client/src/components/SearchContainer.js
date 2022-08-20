import { useSelector } from 'react-redux';
import { FormRow, FormRowSelect } from './index';
import Wrapper from '../pages/dashboard/DashboardFormWrapper';

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    handleChange,
    clearFilters,
  } = useSelector((store) => store.allJobs);

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };

  return (
    <Wrapper>
      <form className='form'>
        <h3>search form</h3>
        <div className='form-center'>
          <FormRow
            name='search'
            type='text'
            value={search}
            handleChange={handleSearch}
          />
          <FormRowSelect
            labelText='job status'
            name='searchStatus'
            value={searchStatus}
            options={['all', ...statusOptions]}
            handleChange={handleSearch}
          />
          <FormRowSelect
            labelText='job type'
            name='searchType'
            value={searchType}
            options={['all', ...jobTypeOptions]}
            handleChange={handleSearch}
          />
          <FormRowSelect
            name='sort'
            value={sort}
            options={sortOptions}
            handleChange={handleSearch}
          />
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
