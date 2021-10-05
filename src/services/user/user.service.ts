import UserRequest from '../../dto/request/user/UpdateUserRequest';
import UserResponse from '../../dto/response/user/UserResponse';
import { mapUserToUserResponse } from '../../mappers/user/user';
import { PageableItems } from '../../models/pageableItems';
import { User, UserModel } from '../../models/user';
import { getPagination } from '../../utils/pagination.utils';

const getUsers = async (
  firstName = null,
  lastName = null,
  email = null,
  page = 1,
): Promise<PageableItems<UserResponse>> => {
  const { offset, limit } = getPagination(page);

  const filter = {};
  if (firstName) {
    // @ts-ignore
    filter.firstName = firstName;
  }
  if (lastName) {
    // @ts-ignore
    filter.lastName = lastName;
  }
  if (email) {
    // @ts-ignore
    filter.email = email;
  }
  const users = await UserModel.find(filter).skip(offset).limit(limit);
  const counts = await UserModel.count();
  const response = users.map((user) => mapUserToUserResponse(user));

  return {
    items: response,
    totalPages: Math.ceil(counts / limit),
    page,
  };
};

const getUserById = async (id: string): Promise<User> => {
  const user = await UserModel.findById(id);

  if (!user) {
    throw new Error('User not found.');
  }

  return user;
};

const getUser = async (id: string): Promise<UserResponse> => {
  return getUserById(id).then(mapUserToUserResponse);
};

const deleteUser = async (id: string): Promise<void> => {
  await UserModel.deleteOne({ _id: id });
};

const updateUser = async (id: string, request: Partial<UserRequest>): Promise<UserResponse> => {
  //Partial jer je patch
  const user = await getUserById(id);
  user.set(request);
  return user.save().then(mapUserToUserResponse);
};

export const userService = {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
};
