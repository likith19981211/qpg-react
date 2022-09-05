import React, {createContext, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from 'shared/constants/ActionTypes';
import jwtAxios, {setAuthToken} from './index';
import axios from 'axios';

axios.defaults.withCredentials = true;
const ServerAuthContext = createContext();
const ServerAuthActionsContext = createContext();

export const useServerAuth = () => useContext(ServerAuthContext);

export const useServerAuthActions = () => useContext(ServerAuthActionsContext);

// const setToken = (token) => {
//     console.log(token);
//     if (token) {
//         axios.defaults.headers.common['Authorization'] = token;
//     } else {
//         delete axios.defaults.headers.common['Authorization'];
//     }
//     return 1;
// };

const ServerAuthAuthProvider = ({children}) => {
  const [serverAuthData, setServerAuthData] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const getAuthUser = () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setServerAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }
      setAuthToken(token);
      jwtAxios
        .get('/account', {withCredentials: true})
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .then()
        .then(({data}) =>
          setServerAuthData({
            user: data,
            isLoading: false,
            isAuthenticated: true,
          }),
        )
        .catch(() =>
          setServerAuthData({
            user: undefined,
            isLoading: false,
            isAuthenticated: false,
          }),
        );
    };

    getAuthUser();
  }, []);

  const signInServerUser = async (formdata) => {
    dispatch({type: FETCH_START});
    try {
      await axios
        .post('http://localhost:8080/api/authentication', formdata)
        .then((response) => {
          axios.get('http://localhost:8080/api/account').then((res) => {
            console.log(res.data);
         //   console.log(res.headers);
            console.log(response);
            setServerAuthData({
              user: res.data,
              isAuthenticated: true,
              isLoading: false,
            });
            dispatch({type: FETCH_SUCCESS});
          });
        });
          //.then(resp => console.log(resp.headers.get('Set-cookie')));
    } catch (error) {
      setServerAuthData({
        ...serverAuthData,
        isAuthenticated: false,
        isLoading: false,
      });
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || 'Something went wrong',
      });
    }
  };

  const signUpUser = async ({name, email, password}) => {
    dispatch({type: FETCH_START});
    try {
      const {data} = await jwtAxios.post('users', {name, email, password});
      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
      const res = await jwtAxios.get('/auth');
      setServerAuthData({
        user: res.data,
        isAuthenticated: true,
        isLoading: false,
      });
      dispatch({type: FETCH_SUCCESS});
    } catch (error) {
      setServerAuthData({
        ...serverAuthData,
        isAuthenticated: false,
        isLoading: false,
      });
      console.log('error:', error.response.data.error);
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || 'Something went wrong',
      });
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setAuthToken();
    setServerAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return (
    <ServerAuthContext.Provider
      value={{
        ...serverAuthData,
      }}
    >
      <ServerAuthActionsContext.Provider
        value={{
          signUpUser,
          signInServerUser,
          logout,
        }}
      >
        {children}
      </ServerAuthActionsContext.Provider>
    </ServerAuthContext.Provider>
  );
};
export default ServerAuthAuthProvider;

ServerAuthAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
