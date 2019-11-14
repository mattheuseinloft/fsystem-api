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
    console.log(req.userId);

    return res.json({ ok: true });
  }
}

export default new UserController();
