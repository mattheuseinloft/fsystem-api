import Sequelize, { Model } from 'sequelize';

class Answer extends Model {
  static init(sequelize) {
    super.init(
      {
        text_answer: Sequelize.STRING,
        option_answer_id: Sequelize.INTEGER
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'respondent_id',
      as: 'respondent'
    });
    // this.hasOne(models.Question, { as: 'question' });
    // this.hasMany(models.Option, { as: 'options' });
  }
}
export default Answer;
