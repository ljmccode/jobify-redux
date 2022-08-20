import { useSelector, useDispatch } from 'react-redux';
import { displayAlert, clearAlert } from '../../features/alert/alertSlice';
import { useAppContext } from '../../context/appContext';
import { FormRow, FormRowSelect, Alert } from '../../components';
import Wrapper from './DashboardFormWrapper';

const AddJob = () => {
  const dispatch = useDispatch();
  const { showAlert } = useSelector((store) => store.alert);

  const {
    isEditing,
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

  const startClearAlert = () => {
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      dispatch(
        displayAlert({
          alertText: 'Please provide all values!',
          alertType: 'danger',
        })
      );
      startClearAlert();
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
            <button
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
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
