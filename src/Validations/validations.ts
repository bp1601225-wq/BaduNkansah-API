import Joi from "joi";

export const UserSchema = Joi.object({
  userName: Joi.string().required(),

  email: Joi.string().email().required(),

  password: Joi.string().required(),

  contact: Joi.string().optional(),

  address: Joi.string().optional(),

  status: Joi.string()
    .valid("ACTIVE")
    .optional(),

employeeId: Joi.string().allow("").optional(),
});



// Loans Schema

export const CreateLoanSchema = Joi.object({
  id: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Loan type is required",
      "any.required": "Loan type is required",
    }),

  type: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Loan type is required",
      "any.required": "Loan type is required",
    }),

  personName: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Person name is required",
      "string.min": "Person name must be at least 2 characters",
      "string.max": "Person name cannot exceed 100 characters",
      "any.required": "Person name is required",
    }),

  phone: Joi.string()
    .trim()
    .pattern(/^[0-9+\-\s()]+$/)
    .min(10)
    .max(10)
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base": "Invalid phone number format",
      "string.min": "Phone number is too short",
      "string.max": "Phone number is too long",
      "any.required": "Phone number is required",
    }),

  amount: Joi.number()
    .positive()
    .precision(2)
    .required()
    .messages({
      "number.base": "Amount must be a number",
      "number.positive": "Amount must be greater than 0",
      "any.required": "Loan amount is required",
    }),

  loanDate: Joi.date()
    .required()
    .messages({
      "date.base": "Invalid loan date",
      "any.required": "Loan date is required",
    }),

  dueDate: Joi.date()
    .required()
    .custom((dueDate, helpers) => {
      const loanDate = helpers.state.ancestors[0].loanDate;

      if (loanDate && new Date(dueDate) <= new Date(loanDate)) {
        return helpers.error("date.dueBeforeLoan");
      }

      return dueDate;
    })
    .messages({
      "date.base": "Invalid due date",
      "date.dueBeforeLoan": "Due date must be after loan date",
      "any.required": "Due date is required",
    }),

  status: Joi.string()
    .valid("ACTIVE", "COMPLETED", "OVERDUE", "CANCELLED")
    .default("PENDING")
    .messages({
      "any.only":
        "Status must be COMPLETED, PAID, or OVERDUE",
    }),

  notes: Joi.string()
    .trim()
    .max(500)
    .allow("", null)
    .optional()
    .messages({
      "string.max": "Notes cannot exceed 500 characters",
    }),
});