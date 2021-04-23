import { useEffect, useState } from "react";

export const useValidation = (value, validations) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [minLength, setMinLength] = useState(false);
  const [maxLength, setMaxLength] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isInputValid, setIsInputValid] = useState(false);

  useEffect(() => {
    const setMessage = (isError, params) => (isError ? params.message : "");

    Object.entries(validations).some(([validation, params]) => {
      let hasError = false;
      switch (validation) {
        case "isEmpty":
          hasError = value.length === 0;
          setIsEmpty(hasError);
          setErrorMessage(setMessage(hasError, params));
          break;
        case "minLength":
          hasError = value.length < validations[validation].length;
          setMinLength(hasError);
          setErrorMessage(setMessage(hasError, params));
          break;
        case "maxLength":
          hasError = value.length > validations[validation].length;
          setMaxLength(hasError);
          setErrorMessage(setMessage(hasError, params));
          break;
        case "isEmail":
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          hasError = !re.test(String(value).toLowerCase());
          setIsEmail(hasError);
          setErrorMessage(setMessage(hasError, params));
          break;
        default:
          break;
      }

      return hasError;
    });
  }, [value]);

  useEffect(() => {
    setIsInputValid(!(isEmpty || minLength || maxLength || isEmail));
  }, [isEmpty, minLength, maxLength, isEmail]);

  return {
    errorMessage,
    isEmpty,
    minLength,
    maxLength,
    isEmail,
    isInputValid,
  };
};
