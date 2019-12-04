import * as Yup from 'yup';
import { Op } from 'sequelize';
import { isPast, parseISO } from 'date-fns';
import Question from '../models/Question';
import Option from '../models/Option';

import OptionService from './OptionService';

class QuestionService {
  async listNotExpired() {
    const questions = await Question.findAll({
      where: { expiration_date: { [Op.gt]: new Date() } },
      attributes: ['id', 'title', 'description', 'type', 'expiration_date'],
      include: [
        {
          model: Option,
          as: 'options',
          attributes: ['id', 'text']
          // where: { id: { [Op.not]: null } }
        }
      ]
    });

    return questions;
  }

  async createQuestion(reqBody, reqUserId) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string(),
      type: Yup.string().required(),
      expiration_date: Yup.date(),
      options: Yup.array()
        .of(Yup.string())
        .when('type', (type, field) =>
          type === 'Multiple Choice' ? field.required() : field
        )
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

    if (type === 'Multiple Choice') {
      const { options } = reqBody;

      options.forEach(async option => {
        const optionRegistry = await OptionService.createOption(option, id);

        if (optionRegistry.error && optionRegistry.status) {
          return { error: optionRegistry.error, status: optionRegistry.status };
        }
      });

      return {
        id,
        title,
        description,
        type,
        expiration_date,
        author_id,
        options
      };
    }

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
