import Wrapper from './DashboardFormWrapper';
import { useAppContext } from '../../context/appContext';
import { FormRow, FormRowSelect, Alert } from '../../components';

const AddJob = () => {
  const {
    displayAlert,
    isEditing,
    showAlert,
    position,
    company,
    jobLocation,
    status,
    jobType,
    jobTypeOptions,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
    isLoading,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editJob();
      return;
    }
    createJob();
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            type='text'
            name='jobLocation'
            labelText='job location'
            value={jobLocation}
            handleChange={handleJobInput}
          />
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleJobInput}
            options={statusOptions}
          />
          <FormRowSelect
            name='jobType'
            value={jobType}
            labelText='Job Type'
            handleChange={handleJobInput}
            options={jobTypeOptions}
          />
          <div className='btn-container'>
            <button className='btn btn-block submit-btn' onClick={handleSubmit} disabled={isLoading}>
              submit
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
