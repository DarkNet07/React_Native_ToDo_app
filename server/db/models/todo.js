const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ToDo.init(
    {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
      },
      isDone: {
        type: DataTypes.BOOLEAN,
      },
      isImportant: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'ToDo',
    }
  );
  return ToDo;
};

