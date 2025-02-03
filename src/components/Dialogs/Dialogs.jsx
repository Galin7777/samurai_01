import  classes from './Dialogs.module.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';

const DialogItem = (props) => {
  const path = `${/dialogs/}${props.id}`;

  return (
    <div className={classes.dialog + classes.active}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
};

const Message = (props) => {
  return (
    <div className={classes.dialog}>{props.message}</div>
  );
};

export const Dialogs = (props) => {

const dialogs = [
  {id: 1, name: 'Andrey'},
  {id: 2, name: 'Maks'},
  {id: 3, name: 'Anton'},
  {id: 4, name: 'Sveta'},
  {id: 5, name: 'Stas'},
  {id: 6, name: 'Sasha'},
];

const messages = [
  {id: 1, message: 'Hi'},
  {id: 2, message: 'Hi is your kamasutra'},
  {id: 3, message: 'Yo'} ,
];

const dialogsElements = dialogs
  .map( dialog => <DialogItem name={dialog.name} id={dialog.id}/> );

const messegesElements = messages
  .map( message => <Message message={message.message}/> );

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogs__Items}>
        { dialogsElements }
        {/* <DialogItem name={dialogsData[0].name} id={dialogsData[0].id}/>
        <DialogItem name={dialogsData[1].name} id={dialogsData[1].id}/>
        <DialogItem name={dialogsData[2].name} id={dialogsData[2].id}/> */}
        {/* <DialogItem name='Maks' id='2'/>
        <DialogItem name='Anton' id='3'/>
        <DialogItem name='Sveta' id='4'/>
        <DialogItem name='Stas' id='5'/>
        <DialogItem name='Sasha' id='6'/> */}
    
        {/* <NavLink to='/dialogs/2'>
          Maks
        </NavLink> */}
        {/* <div className={classes.dialog}>
           <NavLink to='/dialogs/2' className={({ isActive }) => isActive ? `${classes.dialog} ${classes.active}` : classes.dialog}>
            Maks
          </NavLink>
        </div> */}
        {/* <div className={classes.dialog}> 
          <NavLink to='/dialogs/3' >
            Anton
          </NavLink>
        </div> */}
      </div>
      <div className={classes.messages}>
        { messegesElements } 
      </div>
    </div>
  );
};
