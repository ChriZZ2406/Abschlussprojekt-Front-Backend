const { Sequelize } = require("sequelize");

require('dotenv').config(); // Lädt die Werte aus der .env-Datei in den Prozess

const apiEvent = {
  version: "2.0",
  routeKey: "POST /example/path",
  rawQueryString: "provider=google&token=xxx",
  queryStringParameters: {
    provider: "google",
    token: "",
  },
  body: {
    id: "10710972933354",
    email: "karim.aouini@docc.techstarter.de",
    name: "Karim Aouini",
    given_name: "Karim\t",
    family_name: "Aouini",
    picture:
      "https://lh3.googleusercontent.com/a/ACg8ocIqaBD6Ind3rDHkOYM1ZBrZtCgEfAe6IRaZDrj7ERc=s96-c",
  },
  isBase64Encoded: true,
};

const sequelize = new Sequelize({
  dialect: process.env.DIALECT,
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: process.env.PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
});

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Nutzer hinzufügen
    const ed = apiEvent.body;
    await sequelize.query(`
      INSERT INTO User (UserID, RealName, EmailAddress, BirthDate, Course, AuthProvider, ProfileImg)
      VALUES ('${ed.id}', '${ed.name}', '${ed.email}', null, null, null, '${ed.picture}')
      ON DUPLICATE KEY UPDATE
        UserID = VALUES(UserID),
        RealName = VALUES(RealName),
        BirthDate = VALUES(BirthDate),
        Course = VALUES(Course),
        AuthProvider = VALUES(AuthProvider),
        ProfileImg = VALUES(ProfileImg);
    `);

    const [results, metadata] = await sequelize.query("SELECT * FROM User");
    console.log(results);
    console.log(metadata);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Hauptfunktion aufrufen
main();