import UserService from '../services/UserService';

class UserController {
  async store(req, res) {
    const user = await UserService.createUser(req.body);

    if (user.error && user.status) {
      return res.status(user.status).json({ error: user.error });
    }

    return res.json(user);
  }
}

export default new UserController();
