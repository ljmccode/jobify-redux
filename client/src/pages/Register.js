import { useState, useEffect } from 'react';
import { Logo, FormRow, Alert } from '../components';
import styled from 'styled-components';
// import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';
import { displayAlert, clearAlert } from '../features/alert/alertSlice';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.user);
  const { showAlert } = useSelector((store) => store.alert);
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  // const { user, isLoading, showAlert, displayAlert, setupUser } =
  //   useAppContext();

  const startClearAlert = () => {
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      dispatch(
        displayAlert({
          alertText: 'Please provide all values!',
          alertType: 'danger',
        })
      );
      // displayAlert();
      return;
    }
    if (isMember) {
      // setupUser({
      //   currentUser,
      //   endpoint: 'login',
      //   alertText: 'Login Successful! Redirecting...',
      // });
      // dispatch(
      //   displayAlert({
      //     alertText: 'Login Successful! Redirecting...',
      //     alertType: 'success',
      //   })
      // );
      dispatch(loginUser({ email, password }));
      startClearAlert();
      return;
    }
    // } else {
    //   setupUser({
    //     currentUser,
    //     endpoint: 'register',
    //     alertText: 'User Created! Redirecting...',
    //   });
    // }
    // dispatch(
    //   displayAlert({
    //     alertText: 'User Created! Redirecting...',
    //     alertType: 'success',
    //   })
    // );
    dispatch(registerUser({ name, email, password }));
    startClearAlert();
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {/* name input */}
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
        )}
        {/* email input */}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          Submit
        </button>
        {/* Login/Register toggle btn */}

        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type='button' className='member-btn' onClick={toggleMember}>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }
  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .member-btn {
    color: var(--primary-500);
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    background: transparent;
    border: transparent;
  }
`;

export default Register;
