const { DataTypes } = require("sequelize");
const User = require("./User");
const sequelize = require("../config/database");



const Accomodation = sequelize.define("Accomodation", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isValidAddress(value) {
                if (typeof value !== 'string' || !isNaN(value)) {
                    throw new Error('Address must be a valid string name');
                }
            }
        }
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isValidCity(value) {
                if (typeof value !== 'string' || !isNaN(value)) {
                    throw new Error('City must be a valid string name');
                }
            }
        }
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isValidCountry(value) {
                if (typeof value !== 'string' || !isNaN(value)) {
                    throw new Error('Country must be a valid string name');
                }
            }
        }
    },
    postalCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 0,
            },
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
        isInt: true,
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