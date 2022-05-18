import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Grid, TextField } from '@mui/material';
import firebase from 'firebase/app';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Values {
  email: string;
  password: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(12, 'Password should be of minimum 12 characters length')
    .required('Password is required'),
});

const LoginForm: React.FC<{ errorHandler: any }> = ({ errorHandler }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSend, setIsSend] = useState<boolean>(false);

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values: Values) => {
      try {
        setIsSend(true);
        await firebase
          .auth()
          .signInWithEmailAndPassword(values.email, values.password);
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
            margin: '25px 0',
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
        LOGIN
      </Button>
    </form>
  );
};

export default LoginForm;
