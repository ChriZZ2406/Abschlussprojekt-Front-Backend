import React, { useState, useEffect } from "react";
import NewAccount from "./newacc";

const testData = {
  userData: {
    id: "222222222",
    email: "iam133715@gmail.com",
    provider: "google",
    name: "1337lol15",
    given_name: "Christian",
    family_name: "Altenhofer",
    picture:
      "https://lh3.googleusercontent.com/a/ACg8ocIqaBD6Ind3rDHkOYM1ZBrZtCgEfAe6IRaZDrj7ERc=s96-c",
  },
  posts: {
    test: "xxx",
  },
};

console.log(testData);

function LoginGoogle() {
  const [data, setData] = useState([]);
  const [usermail, setUserMail] = useState("Lädt...");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function sendDataToBackeEnd() {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/login/google", {

        method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(testData),
        })
          .then((response) => response.text())
          .then((data) => console.log(data))
          .catch((error) =>
            console.error("Fehler beim Abruf der Daten.", error)
          );
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    sendDataToBackeEnd();
    // Query-Params abfangen
    let queryParams = new URLSearchParams(window.location.hash.substring(1));
    let data = [];
    for (let [key, value] of queryParams.entries()) {
      if (key === "access_token" || key === "scope") {
        data.push({ [key]: value });
      }
    }

    setData(data); // Setzt den extrahierten Daten in den Zustand

    // Wenn der access_token vorhanden ist, führe den Fetch durch
    const tokenObj = data.find((param) => param.access_token);
    if (tokenObj) {
      const token = tokenObj.access_token;
      const googleURL = `https://irrybpov0k.execute-api.eu-central-1.amazonaws.com/login/google?token=${token}&provider=google`;
      console.log(googleURL);

      fetch(googleURL)
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setData(testData);
          if (testData.posts) {
            // Leite User mit seinen Daten zum News Feed
          } else {
            // Leite User mit seinen Daten zu New Account
            window.location.href("http://localhost:5174/newacc");
          }
          //setUserMail(data.email || "Keine E-Mail-Adresse gefunden.");
        })
        .catch((e) => {
          console.log("Fehler beim Abrufen der Benutzerdaten:", e);
          setUserMail("Fehler beim Abrufen der Daten.");
          setData(testData);
        });
    }
  }, []);

  return (
    <>
      {data.posts ? (
        <>
          <h1>Weiterleitung des User an News Feed</h1>
          <NewAccount data={testData} />
        </>
      ) : (
        <>
          <h1>Hier wird der User zu New Account weitergeleitet</h1>
          <p>
            <a href="/">Home</a>
          </p>
          <article>
            {/* {data.map((paramObj, index) => {
                            const [key, value] = Object.entries(paramObj)[0];
                            return <div key={index}>{key}: {value}</div>;
                        })} */}
            <div>Usermail: {usermail}</div>
          </article>
        </>
      )}
    </>
  );
}

export default LoginGoogle;
