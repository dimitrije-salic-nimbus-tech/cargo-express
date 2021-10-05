import UserResponse from "../../dto/response/user/UserResponse"
import { User } from "../../models/user"

export const mapUserToUserResponse = (user: User): UserResponse => {
    return {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    }
}