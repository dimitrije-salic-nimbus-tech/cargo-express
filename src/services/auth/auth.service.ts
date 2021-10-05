import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import LoginRequest from '../../dto/request/auth/LoginRequest';
import RegistrationRequest from '../../dto/request/auth/RegistrationRequest';
import UserResponse from '../../dto/response/user/UserResponse';
import { mapUserToUserResponse } from '../../mappers/user/user';
import { environmentConfig } from '../../config/env/env.config';
import { UserModel } from '../../models/user';
import LoginResponse from '../../dto/response/auth/LoginResponse';

const registration = async (request: RegistrationRequest): Promise<UserResponse> => {
  const salt = await bcrypt.genSalt(environmentConfig.apiSalt);
  const hashedPassword = await bcrypt.hash(request.password, salt);

  const newUser = {
    email: request.email,
    firstName: request.firstName,
    lastName: request.lastName,
    password: hashedPassword,
  };

  return UserModel.create(newUser).then((user) => mapUserToUserResponse(user));
};

const login = async (request: LoginRequest): Promise<LoginResponse> => {
  const user = await UserModel.findOne({ email: request.email });

  if (!user) {
    throw new Error(`User with ${request.email} email does not exist.`);
  }

  const validPassword = await bcrypt.compare(request.password, user.password);
  if (!validPassword) {
    throw new Error(`Wrong password.`);
  }

  const accessToken = jwt.sign({ username: user.email, role: 'user', id: user._id }, environmentConfig.jwtSecret);

  return {
    user: mapUserToUserResponse(user),
    accessToken: accessToken,
  };
};

export const authService = {
  registration,
  login,
};
