import { useForm } from 'react-hook-form';
import classes from './LoginForm.module.scss';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Login data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <h2 className={classes.title}>Войти на сайт</h2>
      <div className={classes.field}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Поле обязательно для ввода',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Неверный адрес электронной почты',
            },
          })}
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
          {...register('password', {
            required: 'Поле обязательно для ввода',
            maxLength: { value: 64, message: 'Пароль не должен содержать более 64 символов' },
          })}
          className={errors.password ? classes.inputError : ''}
          placeholder="Password"
        />
        {errors.password && <p className={classes.error}>{errors.password.message}</p>}
      </div>
      <div>
        <input
          id='rememberMe'
          type='checkbox'
          name='rememberMe'
          {...register('rememberMe', { required: 'Запомни меня' })}
        />
        <label htmlFor='rememberMe'>Запомни меня</label>
      </div>
      <button type="submit" className={classes.button}>
        Войти
      </button>
    </form>
  );
};
























//   const {
//     register,
//     handleSubmit,
//     formState: { errors } } = useForm();

//   const onSubmit = (data) => {
//     console.log('Login data:', data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
//       <div className={classes.field}>
//         <label htmlFor="login">Логин:</label>
//         <input
//           id="login"
//           {...register('login', { required: 'Логин обязателен' })}
//           className={errors.login ? classes.inputError : ''}
//         />
//         {errors.login && <p className={classes.error}>{errors.login.message}</p>}
//       </div>

//       <div className={classes.field}>
//         <label htmlFor="password">Пароль:</label>
//         <input
//           id="password"
//           type="password"
//           {...register('password', {
//             required: 'Пароль обязателен',
//             minLength: { value: 6, message: 'Минимум 6 символов' },
//           })}
//           className={errors.password ? classes.inputError : ''}
//         />
//         {errors.password && <p className={classes.error}>{errors.password.message}</p>}
//       </div>

//       <div className={classes.checkbox}>
//         <label>
//           <input type="checkbox" {...register('rememberMe')} />
//           {' '}Запомнить меня
//         </label>
//       </div>

//       <button type="submit" className={classes.button}>
//         Отправить
//       </button>
//     </form>
//   );
// };
