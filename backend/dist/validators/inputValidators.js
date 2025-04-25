"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorLoginSchema = exports.EnrollmentUpdateSchema = exports.EnrollmentRegistrationSchema = exports.ProgramUpdateSchema = exports.ProgramRegistrationSchema = exports.ClientSoftDeleteSchema = exports.ClientSearchSchema = exports.ClientUpdateSchema = exports.ClientRegistrationSchema = exports.DoctorChangePasswordSchema = exports.DoctorUpdateSchema = exports.DoctorRegistrationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.DoctorRegistrationSchema = joi_1.default.object({
    email: joi_1.default.string().required().email().messages({
        'string.required': 'Email is required',
        'string.email': 'Please enter a valid email address'
    }),
    password: joi_1.default.string().min(8).max(30).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')).required().messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password must not exceed 30 characters',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        'string.required': 'Password is required'
    }),
    firstName: joi_1.default.string().min(3).max(50).required().messages({
        'string.required': 'First name is required',
        'string.min': 'First name should have 3 or more characters',
        'string.max': 'First name should have 50 characters or less'
    }),
    lastName: joi_1.default.string().min(3).max(50).required().messages({
        'string.required': 'Last name is required',
        'string.min': 'Last name should have 3 or more characters',
        'string.max': 'Last name should have 50 characters or less'
    })
});
exports.DoctorUpdateSchema = joi_1.default.object({
    email: joi_1.default.string().required().email().messages({
        'string.required': 'Email is required',
        'string.email': 'Please enter a valid email address'
    }),
    firstName: joi_1.default.string().min(3).max(50).required().messages({
        'string.required': 'First name is required',
        'string.min': 'First name should have 3 or more characters',
        'string.max': 'First name should have 50 characters or less'
    }),
    lastName: joi_1.default.string().min(3).max(50).required().messages({
        'string.required': 'Last name is required',
        'string.min': 'Last name should have 3 or more characters',
        'string.max': 'Last name should have 50 characters or less'
    })
});
exports.DoctorChangePasswordSchema = joi_1.default.object({
    oldPassword: joi_1.default.string().min(8).max(30).required().messages({
        'string.min': 'Old password must be at least 8 characters long',
        'string.max': 'Old password must not exceed 30 characters',
        'string.required': 'Old password is required'
    }),
    newPassword: joi_1.default.string().min(8).max(30).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')).required().messages({
        'string.min': 'New password must be at least 8 characters long',
        'string.max': 'New password must not exceed 30 characters',
        'string.pattern.base': 'New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        'string.required': 'New password is required'
    })
});
exports.ClientRegistrationSchema = joi_1.default.object({
    firstName: joi_1.default.string().min(3).max(50).required().messages({
        'string.required': 'First name is required',
        'string.min': 'First name should have 3 or more characters',
        'string.max': 'First name should have 50 characters or less'
    }),
    lastName: joi_1.default.string().min(3).max(50).required().messages({
        'string.required': 'Last name is required',
        'string.min': 'Last name should have 3 or more characters',
        'string.max': 'Last name should have 50 characters or less'
    }),
    dateOfBirth: joi_1.default.date().required().messages({
        'date.required': 'Date of birth is required'
    }),
    phone: joi_1.default.string().min(10).max(10).pattern(new RegExp('^[0-9]{10}$')).required().messages({
        'string.required': 'Phone number is required',
        'string.min': 'Phone number should be strictly 10 digits',
        'string.max': 'Phone number should be strictly 10 digits',
        'string.pattern.base': 'Phone number should only contain numbers'
    }),
    email: joi_1.default.string().required().email().messages({
        'string.required': 'Email is required',
        'string.email': 'Please enter a valid email address'
    })
});
exports.ClientUpdateSchema = joi_1.default.object({
    firstName: joi_1.default.string().min(3).max(50).required().messages({
        'string.required': 'First name is required',
        'string.min': 'First name should have 3 or more characters',
        'string.max': 'First name should have 50 characters or less'
    }),
    lastName: joi_1.default.string().min(3).max(50).required().messages({
        'string.required': 'Last name is required',
        'string.min': 'Last name should have 3 or more characters',
        'string.max': 'Last name should have 50 characters or less'
    }),
    dateOfBirth: joi_1.default.date().required().messages({
        'date.required': 'Date of birth is required'
    }),
    gender: joi_1.default.string().min(3).max(10).required().messages({
        'string.required': 'Gender is required',
        'string.min': 'Gender should have 3 or more characters',
        'string.max': 'Gender should have 10 characters or less'
    }),
    phone: joi_1.default.string().min(10).max(10).pattern(new RegExp('^[0-9]{10}$')).required().messages({
        'string.required': 'Phone number is required',
        'string.min': 'Phone number should be strictly 10 digits',
        'string.max': 'Phone number should be strictly 10 digits',
        'string.pattern.base': 'Phone number should only contain numbers'
    }),
    email: joi_1.default.string().required().email().messages({
        'string.required': 'Email is required',
        'string.email': 'Please enter a valid email address'
    })
});
exports.ClientSearchSchema = joi_1.default.object({
    query: joi_1.default.string().min(1).max(50).required().messages({
        'string.required': 'Search query is required',
        'string.min': 'Search query must be at least 1 character',
        'string.max': 'Search query must not exceed 50 characters'
    })
});
exports.ClientSoftDeleteSchema = joi_1.default.object({
    clientId: joi_1.default.string().uuid().required().messages({
        'string.required': 'Client ID is required',
        'string.uuid': 'Client ID must be a valid UUID'
    })
});
exports.ProgramRegistrationSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(100).required().messages({
        'string.required': 'Program name is required',
        'string.min': 'Program name should have 3 or more characters',
        'string.max': 'Program name should have 100 characters or less'
    }),
    description: joi_1.default.string().min(3).max(500).required().messages({
        'string.required': 'Description is required',
        'string.min': 'Description should have 3 or more characters',
        'string.max': 'Description should have 500 characters or less'
    })
});
exports.ProgramUpdateSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(100).required().messages({
        'string.required': 'Program name is required',
        'string.min': 'Program name should have 3 or more characters',
        'string.max': 'Program name should have 100 characters or less'
    }),
    description: joi_1.default.string().min(3).max(500).required().messages({
        'string.required': 'Description is required',
        'string.min': 'Description should have 3 or more characters',
        'string.max': 'Description should have 500 characters or less'
    })
});
exports.EnrollmentRegistrationSchema = joi_1.default.object({
    clientId: joi_1.default.string().uuid().required().messages({
        'string.required': 'Client ID is required',
        'string.uuid': 'Client ID must be a valid UUID'
    }),
    programId: joi_1.default.string().uuid().required().messages({
        'string.required': 'Program ID is required',
        'string.uuid': 'Program ID must be a valid UUID'
    }),
    enrollmentDate: joi_1.default.date().required().messages({
        'date.required': 'Enrollment date is required'
    }),
    status: joi_1.default.string().valid('Active', 'Completed', 'Dropped').required().messages({
        'string.required': 'Status is required',
        'string.valid': 'Status must be Active, Completed, or Dropped'
    })
});
exports.EnrollmentUpdateSchema = joi_1.default.object({
    status: joi_1.default.string().valid('Active', 'Completed', 'Dropped').required().messages({
        'string.required': 'Status is required',
        'string.valid': 'Status must be Active, Completed, or Dropped'
    })
});
exports.DoctorLoginSchema = joi_1.default.object({
    email: joi_1.default.string().required().email().messages({
        'string.required': 'Email is required',
        'string.email': 'Please enter a valid email address'
    }),
    password: joi_1.default.string().min(8).max(30).required().messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password must not exceed 30 characters',
        'string.required': 'Password is required'
    })
});
