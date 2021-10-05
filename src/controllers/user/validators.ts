import { Joi, Segments } from 'celebrate';

export const GetUsersSchema = {
  [Segments.QUERY]: Joi.object().keys({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    email: Joi.string().optional(),
    page: Joi.string().optional(),
  }),
};

export const UpdateUserSchema = {
  [Segments.BODY]: Joi.object().keys({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
