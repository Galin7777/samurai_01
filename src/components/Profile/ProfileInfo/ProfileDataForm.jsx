import classes from './ProfileInfo.module.scss';
import { useForm } from 'react-hook-form';

export const ProfileDataForm = ({ profile, onSave }) => {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      fullName: profile.fullName,
      aboutMe: profile.aboutMe,
      lookingForAJobDescription: profile.lookingForAJobDescription,
      lookingForAJob: profile.lookingForAJob,
    },
  });

  const lookingForAJob = watch('lookingForAJob');

  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button type="submit">Save</button>

      <h2>
        <textarea {...register('fullName')} placeholder='Full name'/>
      </h2>

      <p>
        <strong>About me:</strong>
        <textarea {...register('aboutMe')}  placeholder='About me'/>
      </p>

      <p>
        <strong>Looking for a job:</strong>{' '}
        <input type='checkbox' {...register('lookingForAJob')} />
      </p>

      {lookingForAJob && (
        <p>
          <strong>My skills:</strong>
          <textarea {...register('lookingForAJobDescription')} placeholder='My skills'/>
        </p>
      )}

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
    </form>
  );
};

// /**чек бокс сделать для работы , логику прописать для кнопок отмены и сохранить и решить что делать с контактами */
