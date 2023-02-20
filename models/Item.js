module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    urgency: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    importance: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  Item.associate = (models) => {
    Item.belongsTo(models.User);
  };

  return Item;
};
