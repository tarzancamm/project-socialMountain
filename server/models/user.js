const { DataTypes } = require("sequelize");
const { db } = require("../util/database");

// define name of table and an object holding the table columns and their value types
module.exports = {
  User: db.define("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: DataTypes.STRING,
    hashedPass: DataTypes.STRING,
  }),
};
