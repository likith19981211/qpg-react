import React from 'react';
import Button from '@mui/material/Button';
import {Checkbox} from '@mui/material';
import {Form, Formik} from 'formik';
import * as yup from 'yup';
axios.defaults.withCredentials = true;
import AppInfoView from '@crema/core/AppInfoView';
import {Link, useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import IntlMessages from '@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
//import {useAuthMethod} from '@crema/utility/AuthHooks';
import {Fonts} from 'shared/constants/AppEnums';
import axios from 'axios';
import {useAuthMethod} from '../../../@crema/utility/AuthHooks';

const validationSchema = yup.object({
  username: yup.string().required(),
  password: yup
    .string()
    .required(<IntlMessages id='validation.passwordRequired' />),
});

const SigninServer = () => {
  const navigate = useNavigate();
  //const {signInUser} = useAuthMethod();
  const onGoToForgetPassword = () => {
    navigate('/forget-password', {tab: 'jwtAuth'});
  };

  const {signInServerUser} = useAuthMethod();

  const {messages} = useIntl();

  // const formPost = (endpoint, formdata) => new Promise((resolve, reject ) => {
  //     axios({
  //         method: 'post',
  //         url: 'http://localhost:8080/api/authentication',
  //         data: formdata,
  //        headers: {
  //             'Content-Type': 'application/x-www-form-urlencoded'
  //        }
  //
  //     }).then(function (loginResponse) {
  //         console.log("response from login", loginResponse);
  //         return loginResponse.data;
  //     }).then(loginData => {
  //         axios({
  //             method: 'get',
  //             url: `http://localhost:8080/api/account`,
  //             headers: {
  //                 Authorization: `Bearer ${loginData.access_token}`,
  //                 'Content-Type' : 'application/json',
  //                 'Cookie' : 'XSRF-TOKEN'
  //             }
  //         })
  //
  //             .then(async (userData) => {
  //             const abs= {
  //                 id: userData.id,
  //                 title: `${userData.firstName} ${userData.lastName}`,
  //                 firstName: userData.firstName,
  //                 lastName: userData.lastName,
  //                 isSubscribed:true,
  //                 role: userData.login,
  //
  //                 date: Date.now(),
  //                 tokenLastSeen: Date.now(),
  //                 refreshTokenLastSeen: Date.now(),
  //                 accessToken: loginData.access_token,
  //                 refreshToken: loginData.refresh_token,
  //                 access: userData.authorities
  //             };
  //                 navigate("/sample/page-1");
  //             resolve(abs);
  //             localStorage.setItem('access-token', loginData.access_token);
  //             localStorage.setItem('refresh-token', loginData.refresh_token);
  //
  //         });
  //         }
  //
  //     ).catch(function (error){
  //         console.log(error);
  //         reject(error);
  //     });
  // });

  return (
    <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
      <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', mb: 5}}>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            username: 'admin',
            password: 'admin',
            remember_me: false,
            submit: 'Login',
          }}
          onSubmit={(values) => {
            let formdata = new FormData();
            for (let value in values) {
              formdata.append(value, values[value]);
            }

            signInServerUser(formdata);
            console.log(formdata);
          }}
        >
          {() => (
            <Form style={{textAlign: 'left'}} noValidate autoComplete='off'>
              <Box sx={{mb: {xs: 5, xl: 8}}}>
                <AppTextField
                  placeholder={messages['common.email']}
                  name='username'
                  label={<IntlMessages id='common.email' />}
                  variant='outlined'
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box sx={{mb: {xs: 3, xl: 4}}}>
                <AppTextField
                  type='password'
                  placeholder={messages['common.password']}
                  label={<IntlMessages id='common.password' />}
                  name='password'
                  variant='outlined'
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box
                sx={{
                  mb: {xs: 3, xl: 4},
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox color='primary' sx={{ml: -3}} />
                  <Box
                    component='span'
                    sx={{
                      color: 'grey.500',
                    }}
                  >
                    <IntlMessages id='common.rememberMe' />
                  </Box>
                </Box>
                <Box
                  component='span'
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    fontWeight: Fonts.MEDIUM,
                    cursor: 'pointer',
                    display: 'block',
                    textAlign: 'right',
                  }}
                  onClick={onGoToForgetPassword}
                >
                  <IntlMessages id='common.forgetPassword' />
                </Box>
              </Box>

              <div>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  //   disabled={isSubmitting}
                  sx={{
                    minWidth: 160,
                    fontWeight: Fonts.REGULAR,
                    fontSize: 16,
                    textTransform: 'capitalize',
                    padding: '4px 16px 8px',
                  }}
                >
                  <IntlMessages id='common.login' />
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>

      <Box
        sx={{
          color: 'grey.500',
        }}
      >
        <span style={{marginRight: 4}}>
          <IntlMessages id='common.dontHaveAccount' />
        </span>
        <Box
          component='span'
          sx={{
            fontWeight: Fonts.MEDIUM,
            '& a': {
              color: (theme) => theme.palette.primary.main,
              textDecoration: 'none',
            },
          }}
        >
          <Link to='/signup'>
            <IntlMessages id='common.signup' />
          </Link>
        </Box>
      </Box>

      <AppInfoView />
    </Box>
  );
};

export default SigninServer;
