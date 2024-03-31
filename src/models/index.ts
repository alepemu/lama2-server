import sequelize from "../config/db";

import User from "./user";
import Note from "./note";

User.hasMany(Note, { foreignKey: "userId" });
Note.belongsTo(User, { foreignKey: "userId" });

sequelize.sync({ alter: true }).then(() => {
  console.log(`[server] Database models synchronized`);
});

export { User, Note };
