import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { UIContext } from '../../Unknown/UIContext';
import img from '../../../assets/images/loginImg.jpg';
import logo from '../../../assets/images/logo.png';
import LoginForm from './LoginForm';

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
              Login
            </Typography>
            <LoginForm errorHandler={handleSignIn} />
            <Typography
              variant="h6"
              align="center"
              style={{
                margin: '200px 0 20px 0',
                fontWeight: 700,
                fontSize: '14px',
              }}
            >
              Don’t have an account?
            </Typography>
            <Link
              to="/register"
              style={{
                color: '#F50057',
                fontSize: '13px',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              REGISTER
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignInScreen;
