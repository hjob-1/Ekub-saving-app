// hooks/useValidation.js
import { useState, useCallback } from 'react';

const useValidation = (initialValues, rules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback(
    (name, value) => {
      if (!rules[name]) {
        return null; // No rule for this field
      }

      const fieldRules = rules[name];
      let error = null;

      if (fieldRules.required && !value.trim()) {
        error = `${fieldRules.label || name} is required`;
      } else if (
        fieldRules.minLength &&
        value.trim().length < fieldRules.minLength
      ) {
        error = `${fieldRules.label || name} must be at least ${
          fieldRules.minLength
        } characters`;
      } else if (
        fieldRules.maxLength &&
        value.trim().length > fieldRules.maxLength
      ) {
        error = `${fieldRules.label || name} must be at most ${
          fieldRules.maxLength
        } characters`;
      } else if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
        error =
          fieldRules.message ||
          `Please enter a valid ${fieldRules.label || name.toLowerCase()}`;
      } else if (
        fieldRules.minItems &&
        Array.isArray(value) &&
        value.length < fieldRules.minItems
      ) {
        error = `${fieldRules.label || name} must have at least ${
          fieldRules.minItems
        } items`;
      }

      return error;
    },
    [rules],
  );

  const validateForm = useCallback(
    (currentValues) => {
      const newErrors = {};
      for (const name in rules) {
        const value = currentValues[name] || '';
        const error = validateField(name, value);
        if (error) {
          newErrors[name] = error;
        }
      }
      return newErrors;
    },
    [rules, validateField],
  );

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setValues((prevValues) => ({ ...prevValues, [name]: value }));
      if (touched[name]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: validateField(name, value) || undefined,
        }));
      }
    },
    [validateField, touched],
  );

  const handleBlur = useCallback(
    (event) => {
      const { name, value } = event.target;
      setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
      setErrors((prevErrors) => {
        const error = rules[name]?.validate
          ? rules[name].validate(value, values) === true
            ? undefined // If validate returns true, clear the error
            : rules[name].validate(value, values) // Otherwise use the returned error
          : validateField(name, value);

        return {
          ...prevErrors,
          [name]: error || undefined, // Ensure falsy values become undefined
        };
      });
    },
    [validateField],
  );

  const handleSubmit = useCallback(
    (event, submitCallback) => {
      event.preventDefault();
      const newErrors = validateForm(values);
      setErrors(newErrors);
      setTouched(
        Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
      );

      if (Object.keys(newErrors).length === 0 && submitCallback) {
        submitCallback(values);
      }
    },
    [validateForm, values],
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setTouched,
    resetForm,
    validateField,
  };
};

export default useValidation;
