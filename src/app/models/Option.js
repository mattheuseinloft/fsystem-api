import Sequelize, { Model } from 'sequelize';

class Option extends Model {
  static init(sequelize) {
    super.init(
      {
        text: Sequelize.STRING
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Question, {
      foreignKey: 'question_id',
      as: 'question'
    });
  }
}

export default Option;
