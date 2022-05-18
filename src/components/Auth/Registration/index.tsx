import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { UIContext } from '../../Unknown/UIContext';
import img from '../../../assets/images/loginImg.jpg';
import logo from '../../../assets/images/logo.png';
import RegisterForm from './RegisterForm';

const SignInScreen: React.FC = () => {
  const { setAlert } = useContext(UIContext);

  const handleSignIn = React.useCallback(
    async (code: string, message: string) => {
      setAlert({
        show: true,
        severity: 'error',
        message: `${code} ${message}`,
      });
    },
    [setAlert],
  );

  return (
    <Container>
      <Grid container>
        <Grid item xs={6}>
          <img
            src={img}
            alt="login img"
            style={{
              width: '100%',
              height: '100vh',
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
          >
            <img
              src={logo}
              alt="logo"
              style={{
                width: '172px',
                height: '37px',
              }}
            />
            <Typography
              variant="h3"
              align="center"
              style={{
                margin: '30px 0 40px 0',
                fontWeight: 700,
              }}
            >
              Register
            </Typography>
            <RegisterForm errorHandler={handleSignIn} />
            <Typography
              variant="h6"
              align="center"
              style={{
                margin: '100px 0 20px 0',
                fontWeight: 700,
                fontSize: '14px',
              }}
            >
              Already have account?
            </Typography>
            <Link
              to="/login"
              style={{
                color: '#F50057',
                fontSize: '13px',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              LOGIN
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignInScreen;
