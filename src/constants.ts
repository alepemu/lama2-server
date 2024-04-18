const constants = {
  environment: process.env.NODE_ENV ?? "development",
  port: process.env.PORT ?? 3000,
  jsonWebToken: {
    secret: process.env.JWT_SECRET ?? "secret",
  },
  database: {
    name: process.env.MYSQL_DATABASE ?? "test",
    user: process.env.MYSQL_USER ?? "root",
    password: process.env.MYSQL_PASSWORD ?? "admin",
    host: process.env.MYSQL_HOST ?? "localhost",
  },
  openAI: {
    apiKey: process.env.OPENAI_API_KEY,
  },
};

export default constants;
