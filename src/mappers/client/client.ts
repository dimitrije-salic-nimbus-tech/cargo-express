import ClientResponse from "../../dto/response/client/ClientResponse"
import { Client } from "../../models/client"

export const mapClientToClientResponse = (client: Client): ClientResponse => {
    return {
        id: client._id,
        name: client.name,
        country: client.country,
        city: client.city,
        addressLine1: client.addressLine1,
        addressLine2: client.addressLine2,
        email: client.email,
        phone: client.phone,
        mobile: client.mobile,
        otherPhone: client.otherPhone,
        zipCode: client.zipCode
    }
}