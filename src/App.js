import classes from './App.module.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navbar } from './components/Navbar';
import { Navigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { DialogsContainer } from './components/Dialogs/DialogsContainer';
import { UsersContainer } from './components/Users/UsersContainer';
import { ProfileContainer } from './components/Profile/ProfileContainer';
import { HeaderContainer } from './components/Header/HeaderContainer';

export const App = () => {
  const sidebar = useSelector((state) => state.sidebar);

  return (
    <BrowserRouter>
      <div className={classes.appWrapper}>
        <HeaderContainer />
        <Navbar state={sidebar} />
        <div className={classes.appWrapperContent}>
          <Routes>
            <Route path='/profile' element={<Navigate to='/profile/2' />} />
            <Route path='/profile/:userId' element={<ProfileContainer />} />
            <Route path='/dialogs' element={<DialogsContainer />} />
            <Route path='/users' element={<UsersContainer />} />
            {/* <Route path='/news' element={<News />} />
            <Route path='/music' element={<Music />} />
            <Route path='/settings' element={<Settings />} /> */}
          </Routes>
        </div>
      </div >
    </BrowserRouter>
  );
};
