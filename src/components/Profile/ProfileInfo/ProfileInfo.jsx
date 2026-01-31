import classes from './ProfileInfo.module.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Preloader } from '../../common/Preloader/Preloader';
import { ProfileStatus } from '../ProfileInfo/ProfileStatus';
import { ProfileDataForm } from './ProfileDataForm';
import userPhoto from '../../../assets/images/avatar.jpg';
import { updateUserProfile } from '../../../redux/profile-reducer';

export const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto }) => {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (event) => {
    if (event.target.files.length) {
      savePhoto(event.target.files[0]);
    }
  };

  // минимальная замена saveProfile: просто используем dispatch
  const handleSaveProfile = (data) => {
    dispatch(updateUserProfile({ ...profile, ...data }));
    setEditMode(false); // закрываем editMode после сохранения
  };

  return (
    <div className={classes.profileInfo}>
      <div className={classes.avatarBlock}>
        <img
          src={profile.photos.large || userPhoto}
          alt="User Avatar"
        />

        {isOwner && (
          <>
            <label htmlFor="fileUpload" className={classes.editPhotoButton}>
              <svg viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71
                         7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003
                         1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75
                         1.84-1.82z" />
              </svg>
            </label>
            <input
              id="fileUpload"
              type="file"
              onChange={onMainPhotoSelected}
              className={classes.hiddenFileInput}
            />
          </>
        )}

        <ProfileStatus status={status} updateStatus={updateStatus} />

        {editMode ? (
          <ProfileDataForm
            profile={profile}
            onSave={handleSaveProfile}
            goToEditMode={() => setEditMode(true)} // здесь теперь корректная функция
          />
        ) : (
          <ProfileData
            goToEditMode={() => setEditMode(true)}
            profile={profile}
            isOwner={isOwner}
          />
        )}
      </div>
    </div>
  );
};

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (
    <>
      {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}

      <div className={classes.descriptionBlock}>
        <h2 className={classes.fullName}>{profile.fullName}</h2>
        <p className={classes.aboutMe}>
          <strong>About me:</strong>{' '}
          {profile.aboutMe ? profile.aboutMe : 'No information about user.'}
        </p>
        <p className={classes.jobStatus}>
          <strong>Looking for a job:</strong>{' '}
          {profile.lookingForAJob ? 'Yes' : 'No'}
        </p>
        {profile.lookingForAJob && (
          <p className={classes.skills}>
            <strong>My skills:</strong> {profile.lookingForAJobDescription}
          </p>
        )}
      </div>

      <div className={classes.contactsBlock}>
        <h3>Contacts</h3>
        {Object.entries(profile.contacts).map(([key, value]) => (
          <p key={key} className={classes.contactItem}>
            <strong>{key}:</strong>{' '}
            {value ? (
              <a href={value} target="_blank" rel="noreferrer">
                {value}
              </a>
            ) : (
              <span> - </span>
            )}
          </p>
        ))}
      </div>
    </>
  );
};
