import React, { useState } from 'react';
import classes from './ProfileInfo.module.scss';

export const ProfileStatus = ({ status }) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <div>
      {!editMode ? (
        <div>
          <span onDoubleClick={() => setEditMode(true)}>{status}</span>
        </div>
      ) : (
        <div>
          <input
            autoFocus
            onBlur={() => setEditMode(false)}
            value={status}
            readOnly
          />
        </div>
      )}
    </div>
  );
};
