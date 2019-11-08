import SessionService from '../services/SessionService';

class SessionController {
  async store(req, res) {
    const session = await SessionService.createSession(req.body);

    if (session.error && session.status) {
      return res.status(session.status).json({ error: session.error });
    }

    return res.json(session);
  }
}

export default new SessionController();
