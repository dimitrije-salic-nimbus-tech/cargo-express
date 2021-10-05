import { Joi, Segments } from 'celebrate';

export const CreateInvoiceSchema = {
    [Segments.PARAMS]: Joi.object().keys({
        jobId: Joi.string().required(),
    }),
}