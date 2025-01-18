import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { logIn } from '../../../../store/api-actions';
import { isValidValues } from './utils';
import { notify } from '../../../../utils/utils';
import { Path } from '../../../../const';
import { AuthorizationData } from '../../../../types/user';
import { selectErrorMessage } from '../../../../store/selectors';
import styles from './style.module.css';
import { processErrorHandle } from '../../../../services/process-error-handle';

const initialUser: AuthorizationData = {
  login: '',
  password: '',
};

function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errorMessage = useAppSelector(selectErrorMessage);
  const isError = !!errorMessage;

  const [signIn, setSignIn] = useState<AuthorizationData>(initialUser);
  const [isValid, setValid] = useState<boolean>(false);

  const handleValueChange = ({
    target,
  }: ChangeEvent<HTMLInputElement>): void => {
    setSignIn((prev) => {
      const updated = { ...prev, [target.name]: target.value };

      setValid(isValidValues(updated.login, updated.password));

      return updated;
    });
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    if (!isValid) {
      notify('Invalid email or password');
      return;
    }

    dispatch(logIn(signIn))
      .unwrap()
      .then(() => {
        setSignIn(initialUser);
        navigate(Path.Root);
      })
      .catch(({ message }) => processErrorHandle(message as string));
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="login__form form"
      action="#"
      method="post"
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          onChange={handleValueChange}
          className="login__input form__input"
          type="email"
          name="login"
          placeholder="Email"
          required
          value={signIn.login}
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          onChange={handleValueChange}
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          value={signIn.password}
          pattern="^.*(?=.*[a-zA-Z])(?=.*\d).*$"
          title="Пароль состоит минимум из одной латинской буквы и цифры."
          required
        />
      </div>
      <button
        className="login__submit form__submit button"
        disabled={!isValid}
        type="submit"
      >
        Sign in
      </button>
      {isError && (
        <p className={`${styles.error}`}>{errorMessage}. Try again later.</p>
      )}
    </form>
  );
}

export { SignIn };
