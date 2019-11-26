import * as Yup from 'yup';
import User from '../models/User';

class UserService {
  async createUser(reqBody) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
      gender: Yup.string().required(),
      date_of_birth: Yup.date().required()
    });

    if (!(await schema.isValid(reqBody))) {
      return { error: 'Validation fails', status: 400 };
    }

    const userExists = await User.findOne({ where: { email: reqBody.email } });

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
    const schema = Yup.object().shape({
      username: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
      gender: Yup.string(),
      date_of_birth: Yup.date()
    });

    if (!(await schema.isValid(reqBody))) {
      return { error: 'Validation fails', status: 400 };
    }

    const { email, oldPassword } = reqBody;

    const user = await User.findByPk(userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return {
          error: 'Another user with entered email already exists',
          status: 400
        };
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
