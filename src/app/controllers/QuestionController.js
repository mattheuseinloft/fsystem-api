import QuestionService from '../services/QuestionService';

class QuestionController {
  async store(req, res) {
    const question = await QuestionService.createQuestion(req.body, req.userId);

    if (question.error && question.status) {
      return res.status(question.status).json({ error: question.error });
    }

    return res.json(question);
  }
}

export default new QuestionController();
