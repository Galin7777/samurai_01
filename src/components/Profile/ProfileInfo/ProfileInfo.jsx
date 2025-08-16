import classes from './ProfileInfo.module.scss';
import { Preloader } from '../../common/Preloader/Preloader';
import { ProfileStatus } from '../ProfileInfo/ProfileStatus';
import userPhoto from '../../../assets/images/avatar.jpg';

export const ProfileInfo = ({ profile, status, updateStatus }) => {
  if (!profile) {
    return <Preloader />;
  }

  return (
    <div className={classes.profileInfo}>
      {/* Аватар */}
      <div className={classes.avatarBlock}>
        <img src={profile.photos.large || userPhoto}
          alt='User Avatar'/>
      </div>

      {/* Основная информация */}
      <div className={classes.descriptionBlock}>
        <ProfileStatus status={status} updateStatus={updateStatus}/>

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

      {/* Контакты */}
      <div className={classes.contactsBlock}>
        <h3>Contacts:</h3>
        {Object.values(profile.contacts).some(Boolean) ? (
          Object.entries(profile.contacts).map(([key, value]) =>
            value ? (
              <p key={key} className={classes.contactItem}>
                <strong>{key}:</strong>{' '}
                <a href={value} target='_blank' rel='noreferrer'>
                  {value}
                </a>
              </p>
            ) : null,
          )
        ) : (
          <p>No contacts available.</p>
        )}
      </div>
    </div>
  );
};
