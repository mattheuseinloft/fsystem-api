import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import User from '../models/User';

class SessionService {
  async createSession(reqBody) {
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
