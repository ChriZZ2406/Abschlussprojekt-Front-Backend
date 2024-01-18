import React, { useState, useEffect } from "react";
import NewAccount from "./newacc"

const testData = {
    userData: {
        "id": "1234567890",
        "email": "iam1337@gmail.com",
        "provider": "google",
        "name": "1337lol",
        "given_name": "Chris"
    },
    posts: {
        "test": "xxx"
    }

}

function LoginGoogle() {
    const [data, setData] = useState([]);
    const [usermail, setUserMail] = useState("Lädt...");

    useEffect(() => {
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
                    response.json()
                })
                .then((data) => {
                    console.log(data);
                    setData(testData);
                    if (testData.posts) {
                        // Leite User mit seinen Daten zum News Feed
                    } else {
                        // Leite User mit seinen Daten zu New Account
                        window.location.href("http://localhost:5173/newacc");
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
            {(data.posts) ? (
                <>
                    <h1>Weiterleitung des User an News Feed</h1>
                    <NewAccount data={testData} /> 
                </>
            ) : (
                <>
                    <h1>Hier wird der User zu New Account weitergeleitet</h1>
                    <p><a href="/">Home</a></p>
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
