import React, { useContext, useEffect } from 'react';
import './App.scss';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Navigation from '@components/Navigation';
import Main from '@components/Main';
import Login from '@components/Login';
import Map from '@components/Map';
import Profile from '@components/Profile';
import SignUp from '@components/SignUp';
import SignUpComplete from '@components/SignUpComplete';
import Loading from '@components/Loading';
import Friends from '@components/Friends';
import DebugZone from '@components/DebugZone';
import { Routes as AppRoutes } from '@src/types';
import { useAuth0 } from '@auth0/auth0-react';
import { isDevelopment } from '../util';

function App() {
  const { logout, isLoading, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const appContent = (
    <div className="App bg-main" data-testid="App">
      {isAuthenticated ? (
        <>
          <div className="body">
            <Routes>
              <Route path={AppRoutes.Main} element={<Main />} />
              <Route path={AppRoutes.Map} element={<Map />} />
              <Route path={AppRoutes.Profile} element={<Profile />} />
              <Route path={AppRoutes.Friends} element={<Friends />} />
            </Routes>
          </div>

          <Navigation />
          <div className="spacer"></div>
        </>
      ) : (
        <Routes>
          <Route path={AppRoutes.Login} element={<Login />} />
          <Route path={AppRoutes.SignUp} element={<SignUp />} />
          <Route path={AppRoutes.SignUpComplete} element={<SignUpComplete />} />
          {isDevelopment() && (
            <Route path={AppRoutes.DebugZone} element={<DebugZone />} />
          )}
          <Route path="*" element={<Navigate to={AppRoutes.Login} replace />} />
        </Routes>
      )}
    </div>
  );

  return (
    <>
      <div id="portal-root" />
      {isLoading ? <Loading /> : appContent}
    </>
  );
}

export default App;
