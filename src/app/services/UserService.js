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

  async modifyUser(userId, reqBody) {
    const { email, oldPassword } = reqBody;

    const user = await User.findByPk(userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return { error: 'User with entered email already exists', status: 400 };
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return { error: 'Password does not match', status: 401 };
    }

    const { id, username, gender, date_of_birth } = await user.update(reqBody);

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
