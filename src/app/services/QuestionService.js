import * as Yup from 'yup';
import Question from '../models/Question';

class QuestionService {
  async createQuestion(reqBody, reqUserId) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string(),
      type: Yup.string(),
      expiration_date: Yup.date()
    });

    if (!(await schema.isValid(reqBody))) {
      return { error: 'Validation fails', status: 400 };
    }

    const { title, description, type, expiration_date } = reqBody;

    const { id, author_id } = await Question.create({
      title,
      description,
      type,
      expiration_date,
      author_id: reqUserId
    });

    return {
      id,
      title,
      description,
      type,
      expiration_date,
      author_id
    };
  }
}

export default new QuestionService();
