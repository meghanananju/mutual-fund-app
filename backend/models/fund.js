const { DataTypes } = require("sequelize");
const sequelize = require("./database.js");

const Fund = sequelize.define("Fund", {
    fundFamily: { type: DataTypes.STRING, allowNull: false, defaultValue: "Unknown" },
    schemeName: { type: DataTypes.STRING, allowNull: false, defaultValue: "Unnamed Scheme" },
    schemeCode: { type: DataTypes.STRING, allowNull: false, defaultValue: "N/A" },
    isin: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    currentValue: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0.0 },
    purchaseAllowed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    redemptionAllowed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
}, {
    timestamps: true, // Adds createdAt & updatedAt fields automatically
});

module.exports = Fund;
