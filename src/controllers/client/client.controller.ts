import { celebrate } from 'celebrate';
import { NextFunction, Request, Response, Router } from 'express';
import * as core from 'express-serve-static-core';

import ClientRequest from '../../dto/request/client/CreateClientRequest';
import { clientService } from '../../services/client/client.service';
import { CreateClientSchema, GetClientsSchema, UpdateClientSchema } from './validators';

const router = Router();

interface Query extends core.Query {
  name: string;
  email: string;
  country: string;
  city: string;
}

router.get(
  '/',
  [celebrate(GetClientsSchema)],
  (req: Request<any, Query, any>, res: Response, next: NextFunction) => {
    const { name, email, country, city, page } = req.query;

    // @ts-ignore
    clientService
      // @ts-ignore
      .getClients(name, email, country, city, page)
      .then((client) => {
        res.json(client);
      })
      .catch(next);
  },
);

router.get('/:id', (req: Request<any, any, { id: string }>, res: Response, next: NextFunction) => {
  const { id } = req.params;
  clientService
    .getClient(id)
    .then((client) => {
      res.json(client); //send() ne treba jer ga json sam odradi
    })
    .catch(next);
});

router.post(
  '/',
  [celebrate(CreateClientSchema)],
  (req: Request<any, any, ClientRequest>, res: Response, next: NextFunction) => {
      // const curruentId = req.userId;
    clientService
      .createClient(req.body)
      .then((newClient) => {
        res.status(201).json(newClient);
      })
      .catch(next);
  },
);

router.delete(
  '/:id',
  (req: Request<any, any, { id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    clientService
      .deleteClient(id)
      .then(() => {
        res.status(204).send();
      })
      .catch(next);
  },
);

// router.put(
//   '/:id',
//   [celebrate(UpdateClientSchema)],
//   (req: Request<any, any, ClientRequest>, res: Response, next: NextFunction) => {
//     const { id } = req.params;
//     clientService
//       .updateClient(id, req.body)
//       .then((updatedClient) => {
//         res.json(updatedClient);
//       })
//       .catch(next);
//   },
// );

router.patch(
  '/:id',
  [celebrate(UpdateClientSchema)],
  (req: Request<any, any, ClientRequest>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    clientService
      .updateClient(id, req.body)
      .then((updateClient) => {
        res.json(updateClient); //defaultni status je 200
      })
      .catch(next); //mora catch next da bi prosledio error dalje i da index.ts moze da udje u taj middleware
  },
);

export default router;
