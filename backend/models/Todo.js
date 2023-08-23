const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Todo extends Model {}

Todo.init({
  task: {
    type: DataTypes.STRING,
    allowNull: false
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'Todo'
});

module.exports = Todo;
