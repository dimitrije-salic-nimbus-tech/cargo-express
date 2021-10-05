import { Joi, Segments } from 'celebrate';

const VehicleSchema = Joi.object().keys({
  vehicleNumber: Joi.string().required(),
  driver: Joi.string(),
});

const CostSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string(),
  cost: Joi.string().required(),
});

const FromToSchema = Joi.object().keys({
  country: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
});

const DescriptionSchema = Joi.object().keys({
  title: Joi.string(),
  text: Joi.string().required(),
});

const MetaSchema = Joi.object().keys({
  from: FromToSchema,
  to: FromToSchema,
  descriptions: Joi.array().items(DescriptionSchema),
});

export const CreateJobSchema = {
  [Segments.BODY]: Joi.object().keys({
    client: Joi.string(),
    loadingDate: Joi.string(),
    unloadingDate: Joi.string(),
    vehicles: Joi.array().items(VehicleSchema),
    costs: Joi.array().items(CostSchema),
    descriptions: Joi.array().items(DescriptionSchema),
    meta: MetaSchema,
  }),
};

export const GetJobsSchema = {
  [Segments.QUERY]: Joi.object().keys({
    clientId: Joi.string().optional(),
    userId: Joi.string().optional(),
    page: Joi.string().optional(),
  }),
};

export const UpdateJobSchema = {
  [Segments.BODY]: Joi.object().keys({
    createdBy: Joi.string().optional(),
    client: Joi.string().optional(),
    loadingDate: Joi.string().optional(),
    unloadingDate: Joi.string().optional(),
    vehicles: Joi.array().items(VehicleSchema).optional(),
    costs: Joi.array().items(CostSchema).optional(),
    meta: MetaSchema,
  }),
};
