import { CelebrateError } from 'celebrate';
import { UnauthorizedError } from 'express-jwt';
import { formatAuthorizationError, formatValidationError } from '../utils/error-responses.utils';

// @ts-ignore
export const errorHandler = (error, req, res, next) => {
  if (error instanceof CelebrateError) {
    const err = formatValidationError(error);
    res.status(400).send(err);
  } else if (error instanceof UnauthorizedError) {
    const err = formatAuthorizationError(error);
    res.status(401).send(err);
  } else {
    res.status(500).send('Something went wrong');
  }
};
