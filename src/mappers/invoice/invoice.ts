import InvoiceResponse from '../../dto/response/invoice/InvoiceResponse';
import { Invoice } from '../../models/invoice';

export const mapInvoiceToInvoiceResponse = (invoice: Invoice): InvoiceResponse => {
    console.log(invoice)
    return {
        id: invoice._id,
        jobId: invoice.jobId,
        issuer: {
            id: invoice.issuer._id,
            firstName: invoice.issuer.firstName,
            lastName: invoice.issuer.lastName,
            email: invoice.issuer.email,
        },
        client: {
            id: invoice.client._id,
            name: invoice.client.name,
            email: invoice.client.email,
            phone: invoice.client.phone,
            country: invoice.client.country,
            city: invoice.client.city,
        },
        issuingDate: invoice.issuingDate,
        loadingDate: invoice.loadingDate,
        unloadingDate: invoice.unloadingDate,
        descriptions: invoice.descriptions,
        vehicles: invoice.vehicles,
        costs: invoice.costs,
        meta: invoice.meta,
    };
};
