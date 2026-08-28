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