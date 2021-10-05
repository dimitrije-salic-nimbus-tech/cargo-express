import { Joi, Segments } from 'celebrate';

export const RegistrationSchema = {
  //alternativa za ovo bi bila da ne koristim celebrate Joi vec obican, pa bih nakon napravljene Scheme imao metodu gde bih radio validate nad semom i bacao eror ako ne valja
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    // repassword: Joi.ref('password'),
  }),
};

export const LoginSchema = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  }),
};
