const { DataTypes } = require("sequelize");
const sequelize = require("./database.js");

const user = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,  // Adds createdAt & updatedAt columns
});

module.exports = user;
