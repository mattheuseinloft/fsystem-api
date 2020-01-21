import Option from '../models/Option';

class OptionService {
  async createOption(text, question_id) {
    // if (typeof text !== 'string') {
    //   return { error: 'Options must have only strings', status: 400 };
    // }

    const { id } = await Option.create({
      text,
      question_id
    });

    return {
      id,
      text,
      question_id
    };
  }
}

export default new OptionService();
