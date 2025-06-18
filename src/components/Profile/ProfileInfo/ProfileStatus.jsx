import { useState, useEffect } from 'react';
import classes from './ProfileInfo.module.scss';

export const ProfileStatus = ({ status: initialStatus, updateStatus }) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(initialStatus || '');

  // обновляем локальный статус, если пришёл новый из props
  useEffect(() => {
    setStatus(initialStatus || '');
  }, [initialStatus]);

  const activateEditMode = () => setEditMode(true);

  const deactivateEditMode = () => {
    setEditMode(false);
    if (status !== initialStatus) {
      updateStatus(status); // 🔁 Сохраняем новый статус на сервер
    }
  };

  const onStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div>
      {!editMode ? (
        <div>
          <span onDoubleClick={activateEditMode}>
            {status || 'No status'}
          </span>
        </div>
      ) : (
        <div>
          <input
            autoFocus
            onBlur={deactivateEditMode}
            onChange={onStatusChange}
            value={status}
          />
        </div>
      )}
    </div>
  );
};
