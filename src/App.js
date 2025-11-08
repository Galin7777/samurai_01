import { useEffect } from 'react';
import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Navigate } from 'react-router-dom';
import { UsersContainer } from './components/Users/UsersContainer';
import { HeaderContainer } from './components/Header/HeaderContainer';
import { LoginForm } from './components/Login/LoginForm';
import { Preloader } from './components/common/Preloader/Preloader';
import { initializeApp } from './redux/app-reduser';
import classes from './App.module.scss';

const DialogsContainer = React.lazy(() =>
  import('./components/Dialogs/DialogsContainer').then((module) => ({ default: module.DialogsContainer })));

const ProfileContainer = React.lazy(() =>
  import('./components/Profile/ProfileContainer').then((module) => ({ default: module.ProfileContainer })));

export const App = () => {
  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.sidebar);
  const initialized = useSelector((state) => state.app.initialized);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  if (!initialized) {
    return <Preloader />;
  }

  return (
    <BrowserRouter>
      <div className={classes.appWrapper}>
        <HeaderContainer />
        <Navbar state={sidebar} />
        <div className={classes.appWrapperContent}>
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route
                path='/profile' element={userId ? <Navigate to={`/profile/${userId}`} /> : <Navigate to='/login' />}
              />
              <Route path='/profile/:userId' element={<ProfileContainer />} />
              {/* <Route path='/profile' element={<Navigate to='/profile/32285' />} />
              <Route path='/profile/:userId' element={<ProfileContainer />} /> */}
              <Route path='/dialogs' element={<DialogsContainer />} />
              <Route path='/users' element={<UsersContainer />} />
              <Route path='/login' element={<LoginForm />} />
              {/* <Route path='/news' element={<News />} />
            <Route path='/music' element={<Music />} />
            <Route path='/settings' element={<Settings />} /> */}
            </Routes>
          </Suspense>
        </div>
      </div >
    </BrowserRouter>
  );
};

