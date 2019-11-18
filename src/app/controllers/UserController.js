import UserService from '../services/UserService';

class UserController {
  async store(req, res) {
    const user = await UserService.createUser(req.body);

    if (user.error && user.status) {
      return res.status(user.status).json({ error: user.error });
    }

    return res.json(user);
  }

  async update(req, res) {
    const user = await UserService.modifyUser(req.userId, req.body);

    if (user.error && user.status) {
      return res.status(user.status).json({ error: user.error });
    }

    return res.json(user);
  }
}

export default new UserController();
