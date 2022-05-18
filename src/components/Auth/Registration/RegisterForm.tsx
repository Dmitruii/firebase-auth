import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';
import firebase from 'firebase/app';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Values {
  email: string;
  password: string;
  fullName: string;
  repeatPassword: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  fullName: yup
    .string()
    .matches(
      /^[A-Z][a-zA-Z]{1,}(?: [A-Z][a-zA-Z]*){0,2}$/,
      'Please enter valid full name',
    )
    .required('Email is required'),
  password: yup
    .string()
    .min(12, 'Password should be of minimum 12 characters length')
    .required('Password is required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const RegisterForm: React.FC<{ errorHandler: any }> = ({ errorHandler }) => {
  const [isSend, setIsSend] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      fullName: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema,
    onSubmit: async (values: Values) => {
      try {
        setIsSend(true);
        await firebase
          .auth()
          .createUserWithEmailAndPassword(values.email, values.password);
        await firebase
          .auth()
          .currentUser?.updateProfile({ displayName: values.fullName });
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        errorHandler(errorCode, errorMessage);
      } finally {
        setIsSend(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: '375px' }}>
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        id="fullName"
        name="fullName"
        label="Full name"
        type="text"
        value={formik.values.fullName}
        onChange={formik.handleChange}
        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
        helperText={formik.touched.fullName && formik.errors.fullName}
        style={{
          margin: '25px 0 0 0',
        }}
      />
      <div style={{ position: 'relative' }}>
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          style={{
            margin: '25px 0 0 0',
          }}
        />
        {showPassword ? (
          <Visibility
            style={{ position: 'absolute', top: '40px', right: '10px' }}
            onClick={handlePassword}
          />
        ) : (
          <VisibilityOff
            style={{ position: 'absolute', top: '40px', right: '10px' }}
            onClick={handlePassword}
          />
        )}
      </div>
      <div style={{ position: 'relative' }}>
        <TextField
          fullWidth
          id="repeatPassword"
          name="repeatPassword"
          label="Repeat Password"
          type={showRepeatPassword ? 'text' : 'password'}
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.repeatPassword &&
            Boolean(formik.errors.repeatPassword)
          }
          helperText={
            formik.touched.repeatPassword && formik.errors.repeatPassword
          }
          style={{
            margin: '25px 0',
          }}
        />
        {showRepeatPassword ? (
          <Visibility
            style={{ position: 'absolute', top: '40px', right: '10px' }}
            onClick={handleRepeatPassword}
          />
        ) : (
          <VisibilityOff
            style={{ position: 'absolute', top: '40px', right: '10px' }}
            onClick={handleRepeatPassword}
          />
        )}
      </div>
      <Button
        fullWidth
        variant="contained"
        type="submit"
        disabled={isSend}
        style={{
          backgroundColor: '#F50057',
          opacity: isSend ? '0.7' : '1',
          color: '#fff',
        }}
      >
        REGISTER
      </Button>
    </form>
  );
};

export default RegisterForm;
