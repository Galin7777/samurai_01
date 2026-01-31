import { useForm } from 'react-hook-form';
import { useWatch } from 'react-hook-form';
import { requiredForm } from '../../../utils/validationRules';

export const TextareaForm = ({
  name,
  placeholder,
  onSubmitForm,
  buttontext,
  defaultValue = '',
  showButton = true,
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
  } = useForm({
    defaultValues: {
      [name]: defaultValue,
    },
  });

  const value = useWatch({ control, name });

  const onSubmit = (data) => {
    onSubmitForm(data[name]);
    reset({ [name]: '' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <textarea {...register(name, requiredForm)} placeholder={placeholder} />
      </div>
      {showButton && value && (
        <button type="submit">{buttontext}</button>
      )}
    </form>
  );
};
