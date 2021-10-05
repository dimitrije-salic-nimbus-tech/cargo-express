export default interface InvoiceResponse {
    id: string;
    issuingDate: Date;
    jobId: string;
    issuer: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    client: {
        id: string;
        name: string;
        email: string;
        phone: string;
        country: string;
        city: string;
    };
    loadingDate: Date;
    unloadingDate: Date;
    vehicles: {
        vehicleNumber: string;
        driver: string;
    }[];
    costs: {
        title: string;
        description: string;
        cost: string;
    }[];
    meta: {
        from: {
            country: string;
            address: string;
            phone: string;
            name: string;
            email: string;
        };
        to: {
            country: string;
            address: string;
            phone: string;
            name: string;
            email: string;
        };
    };
    descriptions: {
        title: string;
        text: string;
    }[];
}
