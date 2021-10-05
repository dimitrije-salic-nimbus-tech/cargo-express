import { celebrate } from 'celebrate';
import { NextFunction, Request, Response, Router } from 'express';

import { invoiceService } from "../../services/invoice/invoice.service";
import { CreateInvoiceSchema } from "./validators";
import * as core from "express-serve-static-core";

const router = Router();

interface Query extends core.Query {
    clientId: string;
    issuerId: string;
}

router.post('/:jobId',
    [celebrate(CreateInvoiceSchema)],
    (req: Request<any, any, any>, res: Response, next: NextFunction) => {
    const { jobId } = req.params;
    invoiceService
        .generateInvoice(jobId)
        .then((invoice) => {
            res.status(201).json(invoice)
        })
        .catch(next);
    });

router.get('/',
    [],
    (req: Request<any, Query, any>, res: Response, next: NextFunction) => {
    const { clientId, userId, page } = req.query;
        invoiceService
            // @ts-ignore
            .getInvoices(clientId, userId, page)
        .then((invoice) => {
            res.json(invoice);
        })
        .catch(next);
    });

router.get('/:id', (req: Request<any, any, { id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    invoiceService
        .getInvoice(id)
        .then((invoice) => {
            res.json(invoice);
        })
        .catch(next);
});

router.delete(
    '/:id',
    (req: Request<any, any, { id: string }>, res: Response, next: NextFunction) => {
        const { id } = req.params;
        invoiceService
            .deleteInvoice(id)
            .then((invoice) => {
                res.status(204).json(invoice);
            })
            .catch(next);
    },
);

export default router;