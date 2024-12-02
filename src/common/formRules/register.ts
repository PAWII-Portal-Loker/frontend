interface PatternRule {
  value: RegExp;
  message: string;
}

interface MinLengthRule {
  value: number;
  message: string;
}

interface ValidateRule {
  (value: string, formValues: { [key: string]: string }): string | boolean;
}

interface FieldRules {
  required: string;
  pattern?: PatternRule;
  minLength?: MinLengthRule;
  validate?: ValidateRule;
}

interface Rules {
  waNumber: FieldRules;
  email: FieldRules;
  password: FieldRules;
  confirmPassword: FieldRules;
}

const rules: Rules = {
  waNumber: {
    required: 'WA Number is required',
    pattern: {
      value: /^\d{10,14}$/,
      message: 'Invalid WA Number',
    },
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
  },
  confirmPassword: {
    required: 'Confirm Password is required',
    validate: (value, formValues) =>
      value === formValues.password || 'Passwords do not match',
  },
};

export default rules;
