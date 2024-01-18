const { Sequelize } = require("sequelize");

require('dotenv').config({ path: './.env' }); // Lädt die Werte aus der .env-Datei in den Prozess

const apiEvent = {
  version: "2.0",
  routeKey: "POST /example/path",
  rawQueryString: "provider=google&token=xxx",
  queryStringParameters: {
    provider: "google",
    token: "",
  },
  body: {
    id: "109",
    email: "andreas.bruehl@docc.techstarter.de",
    name: "Andreas Brühl",
    given_name: "Andreas\t",
    family_name: "Brühl",
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
  username: process.env.DB_USER,
  password: process.env.PASSWORD,
});

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Nutzer hinzufügen
    const ed = apiEvent.body;
    
    // Check if user already exists in the database
    const [existingUser, _] = await sequelize.query(`
      SELECT * FROM User WHERE UserID = '${ed.id}'
    `);

    if (existingUser.length > 0) {
      // User is already in the database
      console.log('User vorhanden');
    } else {
      // User is not in the database, add new entry
      await sequelize.query(`
        INSERT INTO User (UserID, RealName, EmailAddress, BirthDate, Course, AuthProvider, ProfileImg)
        VALUES ('${ed.id}', '${ed.name}', '${ed.email}', null, null, null, '${ed.picture}')
        ON DUPLICATE KEY UPDATE
          UserID = VALUES(UserID),
          EmailAddress = VALUES(EmailAddress),
          RealName = VALUES(RealName),
          BirthDate = VALUES(BirthDate),
          Course = VALUES(Course),
          AuthProvider = VALUES(AuthProvider),
          ProfileImg = VALUES(ProfileImg);
      `);

      console.log('Neuer Eintrag in der Datenbank erstellt');
    }

    const [results, metadata] = await sequelize.query("SELECT * FROM User");
    console.log(results);
    // console.log(metadata);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Hauptfunktion aufrufen
main();