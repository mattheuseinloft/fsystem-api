import Sequelize from 'sequelize';

import User from '../app/models/User';
import Question from '../app/models/Question';
import Option from '../app/models/Option';
import Answer from '../app/models/Answer';

import databaseConfig from '../config/database';

const models = [User, Question, Option, Answer];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
