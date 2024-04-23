import constants from "../constants";
import { Sequelize } from "sequelize";

const { name, user, password, host } = constants.database;

const sequelize = new Sequelize(name, user, password, {
  host,
  dialect: "mysql",
  logging: false,
});

(async function () {
  try {
    await sequelize.authenticate();
    console.log(`[server] Connected to database '${name}'`);
  } catch (error) {
    console.error("[server] Unable to connect to the database:", error);
  }
})();

export default sequelize;
