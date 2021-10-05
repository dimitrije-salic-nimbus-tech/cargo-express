import { celebrate } from 'celebrate';
import { NextFunction, Request, Response, Router } from 'express';
import LoginRequest from '../../dto/request/auth/LoginRequest';
import RegistrationRequest from '../../dto/request/auth/RegistrationRequest';
import { authService } from '../../services/auth/auth.service';
import { LoginSchema, RegistrationSchema } from './validators';

const router = Router();

router.post(
  '/registration',
  [celebrate(RegistrationSchema)],
  (req: Request<any, any, RegistrationRequest>, res: Response, next: NextFunction) => {
    authService
      .registration(req.body)
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch(next);
  },
);

router.post(
  '/login',
  [celebrate(LoginSchema)],
  (req: Request<any, any, LoginRequest>, res: Response, next: NextFunction) => {
    authService
      .login(req.body)
      .then((user) => {
        res.json(user);
      })
      .catch(next); // err => next(err)
  },
);

export default router;
