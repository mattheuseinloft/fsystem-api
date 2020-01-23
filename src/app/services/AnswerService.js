import * as Yup from 'yup';
// import { Op } from 'sequelize';
// import { isPast, parseISO } from 'date-fns';
import Answer from '../models/Answer';
import Option from '../models/Option';
import Question from '../models/Question';

// import OptionService from './OptionService';

class AnswerService {
  async listUserAnswers(reqUserId) {
    const answers = await Answer.findAll({
      // where: { expiration_date: { [Op.gt]: new Date() } },
      where: { respondent_id: reqUserId },
      attributes: ['id', 'text_answer'],
      include: [
        {
          model: Option,
          as: 'options',
          attributes: ['id', 'text']
          // where: { id: { [Op.not]: null } }
        }
      ]
    });

    return answers;
  }

  async createAnswer(reqBody, reqParamsId, reqUserId) {
    const question = await Question.findOne({
      where: { id: reqParamsId }
    });

    /**
     * Check if question exists
     */
    if (!question) {
      return { error: 'Question does not exists.', status: 400 };
    }

    const isMultipleChoice = question.type === 'Multiple Choice';

    const schema = Yup.object().shape({
      text_answer: isMultipleChoice ? Yup.string() : Yup.string().required(),
      option_answer_id: isMultipleChoice
        ? Yup.number()
            .positive()
            .integer()
            .required()
        : Yup.number()
            .positive()
            .integer()
    });

    if (!(await schema.isValid(reqBody))) {
      return { error: 'Validation fails', status: 400 };
    }

    const { text_answer, option_answer_id } = reqBody;

    const question_id = question.id;

    const option = await Option.findOne({
      where: { id: option_answer_id, question_id }
    });

    /**
     * Check if option exists and if is from the correct question
     */
    if (!option) {
      return {
        error: 'Option does not exists or is not from the correct question.',
        status: 400
      };
    }

    const respondent_id = reqUserId;

    const { id } = await Answer.create({
      text_answer,
      option_answer_id,
      respondent_id,
      question_id
    });

    await question.increment('number_of_answers', { by: 1 });

    return {
      id,
      text_answer,
      option_answer_id,
      respondent_id,
      question_id
    };
  }
}

export default new AnswerService();
