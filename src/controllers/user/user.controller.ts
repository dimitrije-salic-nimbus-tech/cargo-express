import { celebrate } from 'celebrate';
import { NextFunction, Request, Response, Router } from 'express';
import * as core from 'express-serve-static-core';
import UserRequest from '../../dto/request/user/UpdateUserRequest';
import { userService } from '../../services/user/user.service';
import { GetUsersSchema, UpdateUserSchema } from './validators';

const router = Router();

interface Query extends core.Query {
  firstName: string;
  lastName: string;
  email: string;
}

router.get(
  '/',
  [celebrate(GetUsersSchema)],
  (req: Request<any, Query, any>, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, page } = req.query;
    // @ts-ignore
    userService
      // @ts-ignore
      .getUsers(firstName, lastName, email, page)
      .then((user) => {
        res.json(user);
      })
      .catch(next);
  },
);

router.get('/:id', (req: Request<any, any, { id: string }>, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    //primer handlovanja sa try-catche
    const user = userService.getUser(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.delete(
  '/:id',
  (req: Request<any, any, { id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    userService
      .deleteUser(id)
      .then(() => {
        res.status(204).send();
      })
      .catch(next);
  },
);
router.patch(
  '/:id',
  [celebrate(UpdateUserSchema)],
  (req: Request<any, any, UserRequest>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    userService
      .updateUser(id, req.body)
      .then((updateUser) => {
        res.json(updateUser); //defaultni status je 200
      })
      .catch(next); //mora catch next da bi prosledio error dalje i da index.ts moze da udje u taj middleware
  },
);

export default router;
