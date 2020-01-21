module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('questions', 'number_of_answers', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('questions', 'number_of_answers');
  }
};
