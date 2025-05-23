process.env.NODE_ENV = "test";
const sequelize = require("../src/config/database");
const User = require("../src/models/User");
const Accomodation = require("../src/models/Accomodation");

beforeAll(async () => {
  await sequelize.authenticate();
  await sequelize.query(
    "PRAGMA foreign_keys = ON"
  );
  await sequelize.sync({ force: true });
});

afterEach(async () => {
  await User.destroy({ where: {} });
  await Accomodation.destroy({ where: {} });
});

afterAll(async () => {
  await sequelize.close();
});

module.exports = {
  sequelize,
  User,
  Accomodation,
};
