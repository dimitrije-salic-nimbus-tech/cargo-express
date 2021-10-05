import { Joi, Segments } from 'celebrate';

export const CreateClientSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    addressLine1: Joi.string().required(),
    addressLine2: Joi.string(),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.string().min(6).required(),
    mobile: Joi.string(),
    otherPhone: Joi.string(),
    zipCode: Joi.number(),
  }),
};

export const GetClientsSchema = {
  [Segments.QUERY]: Joi.object().keys({
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    country: Joi.string().optional(),
    city: Joi.string().optional(),
    page: Joi.string().optional(),
  }),
};

export const UpdateClientSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional(),
    country: Joi.string().optional(),
    city: Joi.string().optional(),
    addressLine1: Joi.string().optional(),
    addressLine2: Joi.string().optional(),
    phone: Joi.string().min(6).optional(),
    mobile: Joi.string().optional(),
    otherPhone: Joi.string().optional(),
    zipCode: Joi.number().optional(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
