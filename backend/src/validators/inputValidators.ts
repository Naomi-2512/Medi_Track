import joi from 'joi';

export const DoctorRegistrationSchema = joi.object({
  email: joi.string().required().email().messages({
    'string.required': 'Email is required',
    'string.email': 'Please enter a valid email address'
  }),
  password: joi.string().min(8).max(30).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')).required().messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.max': 'Password must not exceed 30 characters',
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    'string.required': 'Password is required'
  }),
  firstName: joi.string().min(3).max(50).required().messages({
    'string.required': 'First name is required',
    'string.min': 'First name should have 3 or more characters',
    'string.max': 'First name should have 50 characters or less'
  }),
  lastName: joi.string().min(3).max(50).required().messages({
    'string.required': 'Last name is required',
    'string.min': 'Last name should have 3 or more characters',
    'string.max': 'Last name should have 50 characters or less'
  })
});

export const DoctorUpdateSchema = joi.object({
  email: joi.string().required().email().messages({
    'string.required': 'Email is required',
    'string.email': 'Please enter a valid email address'
  }),
  firstName: joi.string().min(3).max(50).required().messages({
    'string.required': 'First name is required',
    'string.min': 'First name should have 3 or more characters',
    'string.max': 'First name should have 50 characters or less'
  }),
  lastName: joi.string().min(3).max(50).required().messages({
    'string.required': 'Last name is required',
    'string.min': 'Last name should have 3 or more characters',
    'string.max': 'Last name should have 50 characters or less'
  })
});

export const DoctorChangePasswordSchema = joi.object({
  oldPassword: joi.string().min(8).max(30).required().messages({
    'string.min': 'Old password must be at least 8 characters long',
    'string.max': 'Old password must not exceed 30 characters',
    'string.required': 'Old password is required'
  }),
  newPassword: joi.string().min(8).max(30).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')).required().messages({
    'string.min': 'New password must be at least 8 characters long',
    'string.max': 'New password must not exceed 30 characters',
    'string.pattern.base': 'New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    'string.required': 'New password is required'
  })
});


export const ClientRegistrationSchema = joi.object({
  firstName: joi.string().min(3).max(50).required().messages({
    'string.required': 'First name is required',
    'string.min': 'First name should have 3 or more characters',
    'string.max': 'First name should have 50 characters or less'
  }),
  lastName: joi.string().min(3).max(50).required().messages({
    'string.required': 'Last name is required',
    'string.min': 'Last name should have 3 or more characters',
    'string.max': 'Last name should have 50 characters or less'
  }),
  dateOfBirth: joi.date().required().messages({
    'date.required': 'Date of birth is required'
  }),
  phone: joi.string().min(10).max(10).pattern(new RegExp('^[0-9]{10}$')).required().messages({
    'string.required': 'Phone number is required',
    'string.min': 'Phone number should be strictly 10 digits',
    'string.max': 'Phone number should be strictly 10 digits',
    'string.pattern.base': 'Phone number should only contain numbers'
  }),
  email: joi.string().required().email().messages({
    'string.required': 'Email is required',
    'string.email': 'Please enter a valid email address'
  })
});

export const ClientUpdateSchema = joi.object({
  firstName: joi.string().min(3).max(50).required().messages({
    'string.required': 'First name is required',
    'string.min': 'First name should have 3 or more characters',
    'string.max': 'First name should have 50 characters or less'
  }),
  lastName: joi.string().min(3).max(50).required().messages({
    'string.required': 'Last name is required',
    'string.min': 'Last name should have 3 or more characters',
    'string.max': 'Last name should have 50 characters or less'
  }),
  dateOfBirth: joi.date().required().messages({
    'date.required': 'Date of birth is required'
  }),
  gender: joi.string().min(3).max(10).required().messages({
    'string.required': 'Gender is required',
    'string.min': 'Gender should have 3 or more characters',
    'string.max': 'Gender should have 10 characters or less'
  }),
  phone: joi.string().min(10).max(10).pattern(new RegExp('^[0-9]{10}$')).required().messages({
    'string.required': 'Phone number is required',
    'string.min': 'Phone number should be strictly 10 digits',
    'string.max': 'Phone number should be strictly 10 digits',
    'string.pattern.base': 'Phone number should only contain numbers'
  }),
  email: joi.string().required().email().messages({
    'string.required': 'Email is required',
    'string.email': 'Please enter a valid email address'
  })
});

export const ClientSearchSchema = joi.object({
    query: joi.string().min(1).max(50).required().messages({
        'string.required': 'Search query is required',
        'string.min': 'Search query must be at least 1 character',
        'string.max': 'Search query must not exceed 50 characters'
    })
});

export const ClientSoftDeleteSchema = joi.object({
  clientId: joi.string().uuid().required().messages({
    'string.required': 'Client ID is required',
    'string.uuid': 'Client ID must be a valid UUID'
  })
});

export const ProgramRegistrationSchema = joi.object({
  name: joi.string().min(3).max(100).required().messages({
    'string.required': 'Program name is required',
    'string.min': 'Program name should have 3 or more characters',
    'string.max': 'Program name should have 100 characters or less'
  }),
  description: joi.string().min(3).max(500).required().messages({
    'string.required': 'Description is required',
    'string.min': 'Description should have 3 or more characters',
    'string.max': 'Description should have 500 characters or less'
  })
});

export const ProgramUpdateSchema = joi.object({
  name: joi.string().min(3).max(100).required().messages({
    'string.required': 'Program name is required',
    'string.min': 'Program name should have 3 or more characters',
    'string.max': 'Program name should have 100 characters or less'
  }),
  description: joi.string().min(3).max(500).required().messages({
    'string.required': 'Description is required',
    'string.min': 'Description should have 3 or more characters',
    'string.max': 'Description should have 500 characters or less'
  })
});

export const EnrollmentRegistrationSchema = joi.object({
  clientId: joi.string().uuid().required().messages({
    'string.required': 'Client ID is required',
    'string.uuid': 'Client ID must be a valid UUID'
  }),
  programId: joi.string().uuid().required().messages({
    'string.required': 'Program ID is required',
    'string.uuid': 'Program ID must be a valid UUID'
  }),
  enrollmentDate: joi.date().required().messages({
    'date.required': 'Enrollment date is required'
  }),
  status: joi.string().valid('Active', 'Completed', 'Dropped').required().messages({
    'string.required': 'Status is required',
    'string.valid': 'Status must be Active, Completed, or Dropped'
  })
});

export const EnrollmentUpdateSchema = joi.object({
  status: joi.string().valid('Active', 'Completed', 'Dropped').required().messages({
    'string.required': 'Status is required',
    'string.valid': 'Status must be Active, Completed, or Dropped'
  })
});