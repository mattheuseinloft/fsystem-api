import AnswerService from '../services/AnswerService';

class AnswerController {
  async index(req, res) {
    const answers = await AnswerService.listUserAnswers(req.userId);

    if (answers.error && answers.status) {
      return res.status(answers.status).json({ error: answers.error });
    }

    return res.json(answers);
  }

  async store(req, res) {
    const answer = await AnswerService.createAnswer(
      req.body,
      req.params.id,
      req.userId
    );

    if (answer.error && answer.status) {
      return res.status(answer.status).json({ error: answer.error });
    }

    return res.json(answer);
  }
}

export default new AnswerController();
