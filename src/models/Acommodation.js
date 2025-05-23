const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");


const Accomodation = sequelize.define("Accomodation", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rent: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
        isDecimal: true,
        min: 0,
        },
    },
    rooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
        min: 1, 
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
        model: User,
        key: 'id',
        }
    },
});

User.hasMany(Accomodation, { foreignKey: "userId", onDelete: "CASCADE" });
Accomodation.belongsTo(User, { foreignKey: "userId" });

module.exports = Accomodation;