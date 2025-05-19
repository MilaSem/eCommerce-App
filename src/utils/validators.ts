import { RuleObject } from 'antd/es/form';

export const validateAge = (
  _rule: RuleObject,
  value: Date | null,
): Promise<void> => {
  if (value) {
    const birthDate = new Date(value.toISOString());

    const today = new Date();
    const ageDifMs = today.getTime() - birthDate.getTime();

    const ageDate = new Date(ageDifMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (age < 12) {
      return Promise.reject(new Error('age must be over 12 years'));
    }
  }

  return Promise.resolve();
};

export const validatePassword = (
  _rule: RuleObject,
  value: string | undefined,
): Promise<void> => {
  if (value && value !== value.trim()) {
    return Promise.reject(new Error('remove spaces from the ends'));
  }
  if (value && value.length < 8) {
    return Promise.reject(new Error('minimum 8 characters'));
  }
  if (value && !/[A-Z]/.test(value)) {
    return Promise.reject(new Error('add an uppercase letter'));
  }
  if (value && !/[a-z]/.test(value)) {
    return Promise.reject(new Error('add an lowercase letter'));
  }
  if (value && !/\d/.test(value)) {
    return Promise.reject(new Error('add a digit'));
  }
  return Promise.resolve();
};

export const validateStreet = (
  _rule: RuleObject,
  value?: string,
): Promise<void> => {
  if (value !== undefined && value !== value.trim()) {
    return Promise.reject(new Error('remove spaces from the ends'));
  }
  return Promise.resolve();
};

export const validatePostalCode = (
  _rule: RuleObject,
  value?: string,
  country?: string,
): Promise<void> => {
  if (!value) {
    return Promise.reject(new Error('enter the postal code'));
  }

  if (!country) {
    return Promise.reject(new Error('select country first'));
  }

  switch (country) {
    case 'RU':
      if (/^\d{6}$/.test(value)) {
        return Promise.resolve();
      } else {
        return Promise.reject(new Error('must be 6 digits'));
      }
    case 'BY':
      if (/^2\d{5}$/.test(value)) {
        return Promise.resolve();
      } else {
        return Promise.reject(new Error('must be 6 digits, first "2'));
      }
    case 'KZ': {
      const pattern = /^[ABCDEFHLMNPRSTXZ][0-9]{2}[A-Z0-9]{4}$/;
      if (pattern.test(value)) {
        return Promise.resolve();
      } else {
        return Promise.reject(new Error('enter valid postal code'));
      }
    }
    default:
      return Promise.reject(new Error('unknown country'));
  }
};
