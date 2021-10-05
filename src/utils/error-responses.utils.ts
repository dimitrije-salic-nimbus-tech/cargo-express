import { CelebrateError } from 'celebrate';
import { UnauthorizedError } from 'express-jwt';

type ValidationError = {
  field: string;
  rule: string;
};

type ValidationPayload = {
  message: string;
  meta: ValidationError[] | any;
};

type AuthorizationPayload = {
  message: string;
};

export class BaseErrorResponse {
  readonly type: string;
  public code: string;
  public payload: AuthorizationPayload | ValidationPayload;

  constructor(type: string, code: string, payload: AuthorizationPayload | ValidationPayload) {
    this.type = type;
    this.code = code;
    this.payload = payload;
  }
}

export class AuthorizatioErrorResponse extends BaseErrorResponse {
  constructor(code: string, payload: AuthorizationPayload) {
    super('Authorization Error', code, payload);
  }
}

export class ValidationErrorResponse extends BaseErrorResponse {
  constructor(code: string, payload: ValidationPayload) {
    super('Validation Error', code, payload);
  }
}

export type AuthorizationError = {
  type: string;
  code: string;
  message: string;
};

export const formatAuthorizationError = (error: UnauthorizedError): AuthorizatioErrorResponse => {
  return new AuthorizatioErrorResponse(error.code, {
    message: error.inner.message,
  });
};

export const formatValidationError = (error: CelebrateError): ValidationErrorResponse => {
  const type = ['query', 'body', 'params'];
  const description = type
    .map((t) => {
      return error.details.get(t)?.details.map((validationError) => ({
        field: validationError.context?.key || '',
        rule: validationError.message,
      }));
    })
    .flat(1) //od niza nizova pravi niz objekata
    .filter((c) => !!c); //ako objekat postoji vraca true

  return new ValidationErrorResponse('general', { message: 'Bad request', meta: description });
};
