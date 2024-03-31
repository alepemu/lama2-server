import sequelize from "../config/db";
import Sequelize, { DataTypes } from "sequelize";

const Note = sequelize.define("Note", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  typeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  list: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  theme: {
    type: DataTypes.STRING,
    defaultValue: "default",
    allowNull: false,
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
});

export default Note;
