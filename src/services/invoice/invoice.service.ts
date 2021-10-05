import mongoose from 'mongoose';

import { jobService } from "../job/job.service";
import { Invoice, InvoiceModel } from "../../models/invoice";
import InvoiceResponse from "../../dto/response/invoice/InvoiceResponse";
import { mapInvoiceToInvoiceResponse } from "../../mappers/invoice/invoice";
import { PageableItems } from "../../models/pageableItems";
import { getPagination } from "../../utils/pagination.utils";


const generateInvoice = async (
    jobId: string,
): Promise<InvoiceResponse> => {
    const job = await jobService.getJob(jobId);
    const { id, createdBy, client, ...jobData } = job;
    const createInvoiceRequest = {
        issuer: createdBy.id,
        client: client.id,
        jobId,
        issuingDate: new Date(),
        ...jobData
    }
    return InvoiceModel.create(createInvoiceRequest).then(async (invoice) => await getInvoice(invoice._id));
}

const getInvoices = async (
    clientId = null,
    userId = null,
    page = 1,
): Promise<PageableItems<InvoiceResponse>> => {
    const { offset, limit } = getPagination(page);
    const filter = {};
    if (clientId) {
        // @ts-ignore
        filter.client = clientId;
    }

    if (userId) {
        // @ts-ignore
        filter.issuer = userId;
    }
    const invoices = await InvoiceModel.find(filter)
        .populate('client')
        .populate('issuer')
        .skip(offset)
        .limit(limit);
    const count = await InvoiceModel.count();
    const response = invoices.map(invoice => mapInvoiceToInvoiceResponse(invoice));
    // const count = response.length;

    return {
        items: response,
        totalPages: Math.ceil(count / limit),
        page,
    };
}

const deleteInvoice = async (id: string): Promise<void> => {
    await InvoiceModel.deleteOne({ _id: id });
}

const getInvoice = async (id: string): Promise<InvoiceResponse> => {
    const invoice = await getInvoiceById(id);

    return mapInvoiceToInvoiceResponse(invoice);
}

const getInvoiceById = async (id: string): Promise<Invoice> => {
    const invoice = await InvoiceModel.findById(id).populate('client').populate('issuer'); // arg -> property name (extract all the data)

    if (!invoice) {
        throw new Error('Invoice not found.');
    }

    return invoice;
};

export const invoiceService = {
    generateInvoice,
    getInvoices,
    getInvoice,
    deleteInvoice,
}
