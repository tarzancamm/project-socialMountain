const { DataTypes } = require("sequelize");
const { db } = require("../util/database");

module.exports = {
  Post: db.define("post", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    privateStatus: DataTypes.BOOLEAN
  }),
};
