import * as Yup from 'yup';
import { Op } from 'sequelize';
import { isPast, parseISO } from 'date-fns';
import Question from '../models/Question';

class QuestionService {
  async listNotExpired() {
    const questions = await Question.findAll({
      where: { expiration_date: { [Op.gt]: new Date() } },
      attributes: ['id', 'title', 'description', 'type', 'expiration_date']
    });

    return questions;
  }

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

    if (isPast(parseISO(expiration_date))) {
      return { error: 'Expiration date is past', status: 400 };
    }

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
