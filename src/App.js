import React from 'react';
import classes from './App.module.scss';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { Profile } from './components/Profile';
import { Dialogs } from './components/Dialogs';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';

export const App = (props) => {
  return (
    <BrowserRouter>
      <div className={classes.appWrapper}>
        <Header />
        <Navbar state={props.state.sidebar}/>
        <div className={classes.appWrapperContent}>
          <Routes>
            <Route path='/profile' element={<Profile
              state={props.state.profilePage} 
              addPost={props.addPost}/>} />
            <Route path='/dialogs' element={<Dialogs state={props.state.dialogsPage} />} />
            {/* <Route path='/news' element={<News />} />
            <Route path='/music' element={<Music />} />
            <Route path='/settings' element={<Settings />} /> */}
          </Routes>
        </div>
      </div >
    </BrowserRouter>
  );
};
