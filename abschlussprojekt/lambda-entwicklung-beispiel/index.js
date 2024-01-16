// ####### Am Ende das Programm in den handler einbinden und variable aus dem event übertragen ######
// exports.handler = async (event) => {
//     response = {
//         statusCode: 200,
//         body: JSON.stringify({
//             email: res.email,
//         })
//     };
//     return response;
// };

// ######## Lambda-Event wie es vom API-Gateway kommt ########
// komplettes Event zu finden https://github.com/aws2302/abschlussprojekt/blob/dev-karim/aws/events/dev.json
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
      "https://lh3.googleusercontent.com/a/ACg8ocIqaBD6Ind3rDHkOYM1ZBrZtCgEfAe6IRaZDrj7ERc=s96-c"
  },
  isBase64Encoded: true,
};

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "mysql",
  host: "db-tsalumninetwork.chzdkkadbytg.eu-central-1.rds.amazonaws.com",
  database: "Userdata",
  port: "3306",
  username: "admin",
  password: "Techstarter",
});

// CREATE TABLE User (
//     UserID INT PRIMARY KEY NOT NULL,
//     RealName VARCHAR(255) NOT NULL,
//     EmailAddress VARCHAR(255) NOT NULL UNIQUE,
//     BirthDate INT,
//     Course VARCHAR(255),
//     AuthProvider VARCHAR(255),
//     ProfileImg VARCHAR(255),
//     );

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // ########## Füge Nutzer Hinzu
    const ed = apiEvent.body;
    // const [results, metadata] = await sequelize.query(`INSERT INTO User (Name, Email, Google_id, Profilbild) VALUES ('${ ed.name }', '${ ed.email }', '${ ed.google_id }', '${ ed.profilbild }')`);
        // const [results, metadata] = await sequelize.query(`CREATE TABLE User (UserID, RealName, EmailAdress, AuthProvider, ProfileImg)  VALUES ('${ ed.userid }', '${ ed.name }', '${ ed.email }', '${ ed.google_id }', '${ ed.profilbild }')          `);
    const [results, metadata] = await sequelize.query("SELECT * FROM Userdata");
    console.log(results);
    console.log(metadata);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  [];
})();
