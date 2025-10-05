import classes from './LoginForm.module.scss';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { login } from '../../redux/auth-reduser';
import { emailForm, passwordForm } from '../../utils/validationRules';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  if (isAuth) {
    return <Navigate to='/profile' />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <h2 className={classes.title}>Войти на сайт</h2>
      <div className={classes.field}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          {...register('email', emailForm)}
          className={errors.email ? classes.inputError : ''}
          placeholder="Email"
        />
        {errors.email && <p className={classes.error}>{errors.email.message}</p>}
      </div>
      <div className={classes.field}>
        <label htmlFor="password">Пароль:</label>
        <input
          id="password"
          type="password"
          {...register('password', passwordForm)}
          className={errors.password ? classes.inputError : ''}
          placeholder="Password"
        />
        {errors.password && <p className={classes.error}>{errors.password.message}</p>}
      </div>
      <div>
        <input
          id='rememberMe'
          type='checkbox'
          {...register('rememberMe')}
        />
        <label htmlFor='rememberMe'>Запомни меня</label>
      </div>
      <button type="submit" disabled={isSubmitting} className={classes.button} >
        Войти
      </button>
    </form>
  );
};
