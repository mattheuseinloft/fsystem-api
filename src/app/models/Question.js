import Sequelize, { Model } from 'sequelize';

class Question extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        type: Sequelize.STRING,
        expiration_date: Sequelize.DATE
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'author_id', as: 'author' });
    this.hasMany(models.Option, { as: 'options' });
  }
}

export default Question;
