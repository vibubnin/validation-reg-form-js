import classNames from "classnames";
import "./App.css";
import { InputField } from "./components/InputField";
import { useInput } from "./hooks/useInput";

export const App = () => {
  const email = useInput("", {
    isEmpty: { message: "Поле должно быть заполнено" },
    isEmail: { message: "Некорректный e-mail" },
  });

  const password = useInput("", {
    isEmpty: { message: "Поле должно быть заполнено" },
    minLength: { length: 4, message: "Длина пароля должна быть от 4 символов" },
    maxLength: {
      length: 8,
      message: "Длина пароля не должна превышать 8 символов",
    },
  });

  return (
    <div className="app">
      <div className="registration">
        <h1 className="title">Регистрация</h1>
        <form className="form">
          <InputField
            type="text"
            name="email"
            value={email.value}
            placeholder="Введите e-mail..."
            isDirty={email.isDirty}
            errorText={email.errorMessage}
            onChange={email.onChange}
            onBlur={email.onBlur}
          />

          <InputField
            type="password"
            name="password"
            value={password.value}
            placeholder="Введите пароль..."
            isDirty={password.isDirty}
            errorText={password.errorMessage}
            onChange={password.onChange}
            onBlur={password.onBlur}
          />

          <button
            className={classNames("button", {
              disabledButton: !email.isInputValid || !password.isInputValid,
            })}
            disabled={!email.isInputValid || !password.isInputValid}
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};
