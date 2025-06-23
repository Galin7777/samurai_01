import classes from './App.module.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Navbar } from './components/Navbar';
import { Navigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import { UsersContainer } from './components/Users/UsersContainer';
import { ProfileContainer } from './components/Profile/ProfileContainer';
import { HeaderContainer } from './components/Header/HeaderContainer';
import { LoginForm } from './components/Login/LoginForm';
import { Preloader } from './components/common/Preloader/Preloader';
import { initializeApp } from './redux/app-reduser';

export const App = () => {
  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.sidebar);
  const initialized = useSelector((state) => state.app.initialized);

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
          <Routes>
            <Route path='/profile' element={<Navigate to='/profile/32285' />} />
            <Route path='/profile/:userId' element={<ProfileContainer />} />
            <Route path='/dialogs' element={<DialogsContainer />} />
            <Route path='/users' element={<UsersContainer />} />
            <Route path='/login' element={<LoginForm />} />
            {/* <Route path='/news' element={<News />} />
            <Route path='/music' element={<Music />} />
            <Route path='/settings' element={<Settings />} /> */}
          </Routes>
        </div>
      </div >
    </BrowserRouter>
  );
};

