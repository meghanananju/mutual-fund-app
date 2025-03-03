const { Sequelize } = require("sequelize");
const config = require("../config/config");

const sequelize = new Sequelize(config.development);

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log("Database connected successfully")
    } catch (error) {
        console.error("Database connection error:", error)
    }
}
syncDatabase();
module.exports = sequelize;
