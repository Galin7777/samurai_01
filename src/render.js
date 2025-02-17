import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { addPost } from './redux/state';

export const renderEntireTree = (state) => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
  <React.StrictMode>
    <App state={state} addPost={addPost} />
  </React.StrictMode> 
);
};

