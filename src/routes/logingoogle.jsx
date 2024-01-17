import React, { useState, useEffect } from "react";

const testData = {
    "id": "1234567890",
    "email": "iam1337@gmail.com",
    "provider": "google",
    "name": "1337lol",
    "given_name": "Chris"
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
            const googleURL = `https://nn2hvywc12.execute-api.eu-central-1.amazonaws.com/login/google?token=${token}&provider=google`;
            
            fetch(googleURL)
                .then((response) => response.json())
                .then((data) => {
                    setUserData(testData)
                    //setUserMail(data.email || "Keine E-Mail-Adresse gefunden.");
                })
                .catch((e) => {
                    console.log("Fehler beim Abrufen der Benutzerdaten:", e);
                    setUserMail("Fehler beim Abrufen der Daten.");
                });
        }
    }, []);

    return (
        <>
            <h1>Account Information</h1>
            <p><a href="/">Home</a></p>
            <article>
                {data.map((paramObj, index) => {
                    const [key, value] = Object.entries(paramObj)[0];
                    return <div key={index}>{key}: {value}</div>;
                })}
                <div>Usermail: {usermail}</div>
            </article>
        </>
    );
}

export default LoginGoogle;
