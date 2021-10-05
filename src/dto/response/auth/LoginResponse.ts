import UserResponse from '../user/UserResponse';

export default interface LoginResponse {
  user: UserResponse;
  accessToken: string;
}
