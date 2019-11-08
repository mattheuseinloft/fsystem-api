import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        username: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        gender: Sequelize.STRING,
        date_of_birth: Sequelize.DATE,
        admin: Sequelize.BOOLEAN
      },
      {
        sequelize
      }
    );
  }
}

export default User;
