import QuestionService from '../services/QuestionService';

class QuestionController {
  async index(req, res) {
    const questions = await QuestionService.listNotExpired();

    if (questions.error && questions.status) {
      return res.status(questions.status).json({ error: questions.error });
    }

    return res.json(questions);
  }

  async store(req, res) {
    const question = await QuestionService.createQuestion(req.body, req.userId);

    if (question.error && question.status) {
      return res.status(question.status).json({ error: question.error });
    }

    return res.json(question);
  }
}

export default new QuestionController();
