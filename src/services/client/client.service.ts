import ClientRequest from '../../dto/request/client/CreateClientRequest';
import ClientResponse from '../../dto/response/client/ClientResponse';
import { mapClientToClientResponse } from '../../mappers/client/client';
import { Client, ClientModel } from '../../models/client';
import { getPagination } from '../../utils/pagination.utils';
import { PageableItems } from '../../models/pageableItems';

const getClients = async (
  name = null,
  email = null,
  country = null,
  city = null,
  page = 1,
): Promise<PageableItems<ClientResponse>> => {
  const { offset, limit } = getPagination(page);

  const filter = {};
  if (name) {
    // @ts-ignore
    filter.name = name;
  }
  if (email) {
    // @ts-ignore
    filter.email = email;
  }
  if (country) {
    // @ts-ignore
    filter.country = country;
  }
  if (city) {
    // @ts-ignore
    filter.city = city;
  }
  const clients = await ClientModel.find(filter).skip(offset).limit(limit);
  const counts = await ClientModel.count();
  const response = clients.map((client) => mapClientToClientResponse(client));

  return {
    items: response,
    totalPages: Math.ceil(counts / limit),
    page,
  };
};

const getClientById = async (id: string): Promise<Client> => {
  const client = await ClientModel.findById(id);

  if (!client) {
    throw new Error('Client not found.');
  }

  return client;
};

const getClient = async (id: string): Promise<ClientResponse> => {
  const client = await getClientById(id);

  return mapClientToClientResponse(client);
};

const createClient = async (request: ClientRequest): Promise<ClientResponse> => {
  return ClientModel.create(request).then(mapClientToClientResponse); //moguce jer prima samo to za parametar
};

const deleteClient = async (id: string): Promise<void> => {
  await ClientModel.deleteOne({ _id: id });
};

// const updateClient = async (id: string, request: ClientRequest): Promise<ClientResponse> => {
//   return ClientModel.findOneAndUpdate({ _id: id }, request, {
//     new: true,
//     // upsert: true //ako ga ne nadjes onda kreiraj (dobro za google login npr)
//     // @ts-ignore
//   }).then(mapClientToClientResponse);

const updateClient = async (
  id: string,
  request: Partial<ClientRequest>,
): Promise<ClientResponse> => {
  //Partial jer je patch
  const client = await getClientById(id);
  client.set(request);
  return client.save().then(mapClientToClientResponse);
};

export const clientService = {
  getClients,
  getClient,
  createClient,
  deleteClient,
  updateClient,
};
