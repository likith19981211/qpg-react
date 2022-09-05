import React from 'react';
import AppFooter from '../AppLayout/components/AppFooter';
import AppErrorBoundary from '../AppErrorBoundary';
import {useAuthUser} from '../../utility/AuthHooks';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import AppContentViewWrapper from './AppContentViewWrapper';
import AppSuspense from '../AppSuspense';
import {Navigate, Route, Routes, useRoutes} from 'react-router-dom';
import generateRoutes from '../../utility/RouteGenerator';
import {
  anonymousStructure,
  authorizedStructure,
  unAuthorizedStructure,
} from '../../../pages';
import {initialUrl} from 'shared/constants/AppConst';

const AppContentView = ({sxStyle}) => {
  const {user, isAuthenticated} = useAuthUser();
  const routes = useRoutes(
    generateRoutes({
      isAuthenticated: isAuthenticated,
      userRole: user?.role,
      unAuthorizedStructure,
      authorizedStructure,
      anonymousStructure,
    }),
  );
  return (
    <AppContentViewWrapper>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          p: {xs: 5, md: 7.5, xl: 12.5},
          ...sxStyle,
        }}
        className='app-content'
      >
        <AppSuspense>
          <AppErrorBoundary>
            {routes}
            <Routes>
              <Route path='/' element={<Navigate to={initialUrl} />} />
            </Routes>
          </AppErrorBoundary>
        </AppSuspense>
      </Box>
      <AppFooter />
    </AppContentViewWrapper>
  );
};

export default AppContentView;

AppContentView.propTypes = {
  sxStyle: PropTypes.object,
};
