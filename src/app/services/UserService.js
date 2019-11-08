import User from '../models/User';

class UserService {
  async createUser(reqBody) {
    const userExists = await User.findOne({
      where: { email: reqBody.email }
    });

    if (userExists) {
      return { error: 'User already exists', status: 400 };
    }

    const { id, username, email, gender, date_of_birth } = await User.create(
      reqBody
    );

    return {
      id,
      username,
      email,
      gender,
      date_of_birth
    };
  }
}

export default new UserService();
