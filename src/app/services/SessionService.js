import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';
import User from '../models/User';

class SessionService {
  async createSession(reqBody) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required()
    });

    if (!(await schema.isValid(reqBody))) {
      return { error: 'Validation fails', status: 400 };
    }

    const { email, password } = reqBody;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return { error: 'User not found', status: 401 };
    }

    if (!(await user.checkPassword(password))) {
      return { error: 'Password does not match', status: 401 };
    }

    const { id, name } = user;

    return {
      user: {
        id,
        name,
        email
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    };
  }
}

export default new SessionService();
