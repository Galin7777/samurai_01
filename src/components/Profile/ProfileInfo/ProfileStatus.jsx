import { useState, useEffect } from 'react';

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

  const cancelEditMode = () => {
    setEditMode(false);
    setStatus(initialStatus); // возвращаем старый статус
  };

  return (
    <div>
      {!editMode ? (
        <div>
          <span onDoubleClick={activateEditMode}
            style={{ color: status ? 'inherit' : '#888' }}>
            {status || 'No status'}
          </span>
        </div>
      ) : (
        <div>
          <input
            autoFocus
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <button
            type="button"
            onClick={deactivateEditMode}
            style={{ marginLeft: '8px' }}
          >
            ✔
          </button>
          <button
            type="button"
            onClick={cancelEditMode}
            style={{ marginLeft: '8px' }}
          >
            ✖
          </button>
        </div>
      )}
    </div>
  );
};
