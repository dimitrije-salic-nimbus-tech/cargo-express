import express from 'express';
import cors from 'cors';
import jwt from 'express-jwt';

import { connect as dbConnect } from './config/db/db.config';
import { connect as redisConnect } from './config/cache/redis.config';
import clientController from './controllers/client/client.controller';
import userController from './controllers/user/user.controller';
import authController from './controllers/auth/auth.controller';
import jobController from './controllers/job/job.controller';
import invoiceController from './controllers/invoice/invoice.controller';
import countryController from './controllers/country/country.controller';

import { environmentConfig } from './config/env/env.config';
import { errorHandler } from './middlewares/errorHandler';

// IIFE fun because of async fun (dbConnect, redisConnect)
(async () => {
  // initialize app
  const app = express();

  // use cors
  app.use(cors());

  // parsers
  app.use(express.json()); // request stize kao string, parsira ga u json
  app.use(express.urlencoded({ extended: true })); // preserece svaki request (npr. one procente iz url-a konvertuje nazad u spejs)

  // database connection
  await dbConnect();

  // redis connection
  await redisConnect();

  app.use(
    // @ts-ignore
    jwt({ secret: environmentConfig.jwtSecret, algorithms: ['HS256'] }).unless({
      path: ['/auth/registration', '/auth/login'],
    }),
  );

  // // get userId from jwt
  // app.use((req, res, next) => {
  //
  //   const extractedAuthorizationFromHeader = req.get('Authorization');
  //   if (!extractedAuthorizationFromHeader) {
  //     next();
  //   }
  //   const extractedJwt = extractedAuthorizationFromHeader?.split(' ')[1];
  //   // @ts-ignore
  //   req.userId = decode(extractedJwt).id;
  //   console.log(req)
  //   next();
  // })

  // controllers (routers)
  app.use('/clients', clientController);
  app.use('/users', userController);
  app.use('/auth', authController);
  app.use('/jobs', jobController);
  app.use('/invoices', invoiceController);
  app.use('/countries', countryController);

  // TODO: use for error handling
  app.use(errorHandler);

  app.listen(environmentConfig.port, () =>
    console.log(`Server is up on port: ${environmentConfig.port}`),
  );
})();
