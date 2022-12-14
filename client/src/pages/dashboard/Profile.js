import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormRow, Alert } from '../../components';
import { updateUser } from '../../features/user/userSlice';
import { displayAlert, clearAlert } from '../../features/alert/alertSlice';
import Wrapper from './DashboardFormWrapper';

const Profile = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.user);
  const { showAlert } = useSelector((store) => store.alert);

  const [name, setName] = useState(user?.name);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [location, setLocation] = useState(user?.location);

  const startClearAlert = () => {
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !lastName || !email || !location) {
      dispatch(
        displayAlert({
          alertText: 'Please provide all values!',
          alertType: 'danger',
        })
      );
      startClearAlert();
      return;
    }
    dispatch(updateUser({ name, lastName, email, location }));
    startClearAlert();
  };

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type='text'
            labelText='last name'
            name='lastName'
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type='email'
            name='email'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type='text'
            name='location'
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />
          <button className='btn btn-block' type='sumbit' disabled={isLoading}>
            {isLoading ? 'Please Wait' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
