import classes from './ProfileInfo.module.scss';
import { Preloader } from '../../common/Preloader/Preloader';
import { ProfileStatus } from '../ProfileInfo/ProfileStatus';

export const ProfileInfo = ({ profile, status, updateStatus }) => {
  if (!profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div>
        {/* <img
          src='https://avatars.mds.yandex.net/i?id=c85e9599c8cbbff810260e0081cf57454b817d14-10981924-images-thumbs&n=13'
          alt='background'
          /> */}
      </div>
      <div className={classes.descriptionBlock}>
        <img src={profile.photos.large} alt='avatar' />
        <ProfileStatus status={status} updateStatus={updateStatus} />

        <h2>{profile.fullName}</h2>
        <p><strong>About me:</strong> {profile.aboutMe ? profile.aboutMe : 'No information about user.'}</p>
        <p><strong>Looking for a job:</strong> {profile.lookingForAJob ? 'Yes' : 'No'}</p>
        {profile.lookingForAJob && (
          <p><strong>My skills:</strong> {profile.lookingForAJobDescription}</p>
        )}

        <div>
          <h3>Contacts: </h3>
          {Object.values(profile.contacts).some(Boolean) ? (
            Object.entries(profile.contacts).map(([key, value]) =>
              value ? (
                <p key={key}>
                  <strong>{key}:</strong>{' '}
                  <a href={value} target='_blank'>
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
    </div>
  );
};
