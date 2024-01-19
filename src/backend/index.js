import Sequelize from "sequelize";

let apiEvent = {};

exports.handler = async (event, context) => {
  try {
    // console.log('this is the req.body ' + req.body)
    // Extract userData from the POST request body
    const { id, email, name, given_name, family_name, picture } =
      event.body.userData;

    apiEvent = {
      version: "2.0",
      routeKey: "POST /login/google", // Update this line
      userData: {
        id, // id from the request body
        email, // email from the request body
        name, // name from the request body
        given_name, // given_name from the request body
        family_name, // family_name from the request body
        picture, // picture from the request body
      },
      isBase64Encoded: true, // Or set based on your requirements
    };

    // Process the apiEvent as needed
    // console.log(apiEvent);

    // Send a response back to the frontend
    //event.status(200).json({ message: "UserData processed", apiEvent });
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "UserData processed", apiEvent }),
    };


    // Hauptfunktion aufrufen
    main();
  } catch (error) {
    console.error(error);
    event.status(500).send("Error processing request");
  }
};


const sequelize = new Sequelize({
  dialect: process.env.TSNET_DB_DIALECT,
  host: process.env.TSNET_DB_HOST,
  database: process.env.TSNET_DB_DATABASE,
  port: process.env.TSNET_DB_PORT,
  username: process.env.TSNET_DB_USER,
  password: process.env.TSNET_DB_PASSWORD,
});

const main = async () => {

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Nutzer hinzufügen
    const ed = apiEvent.userData;

    // console.log(apiEvent.userData)

    // Check if user already exists in the database
    const [existingUser, _] = await sequelize.query(`
      SELECT * FROM User WHERE UserID = '${ed.id}'
    `);

    if (existingUser.length > 0) {
      // User is already in the database
      console.log("User vorhanden");
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

      console.log("Neuer Eintrag in der Datenbank erstellt");
    }

    const [results, metadata] = await sequelize.query("SELECT * FROM User");
    // console.log(results);
    // console.log(metadata);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
