import sequelize from "../config/db";
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

interface NoteModel
  extends Model<
    InferAttributes<NoteModel>,
    InferCreationAttributes<NoteModel>
  > {
  id: string;
  typeId: number;
  order: number;
  title: string;
  text: CreationOptional<string>;
  list: CreationOptional<string[]>;
  theme: string;
  userId: string;
}

const Note = sequelize.define<NoteModel>("Note", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
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
    type: DataTypes.UUID,
    allowNull: false,
  },
});

export default Note;
