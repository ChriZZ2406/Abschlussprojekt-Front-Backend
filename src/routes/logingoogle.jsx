import React, { useState, useEffect } from "react";
import NewAccount from "./newacc";

function LoginGoogle() {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Funktion zum Abrufen von Benutzerdaten von Google People API
    const fetchGoogleUserData = async (accessToken) => {
        try {
            const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            const data = await response.json();
            console.log("Google Data:", data); // Debugging: Log Google Data
            return data;
        } catch (error) {
            console.error("Fehler beim Abrufen von Google-Benutzerdaten.", error);
            return null;
        }
    };

    // Funktion zum Transformieren und Senden von Daten an das Backend
    const sendDataToBackend = async (googleData) => {
        const transformedData = {
            id: googleData.sub, // Google 'sub' (subject) ist die Nutzer-ID
            email: googleData.email,
            provider: "google",
            name: googleData.name,
            given_name: googleData.given_name,
            family_name: googleData.family_name,
            picture: googleData.picture
        };

        setIsLoading(true);
        try {
            const response = await fetch("https://845d97vw4k.execute-api.eu-central-1.amazonaws.com/login/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userData: transformedData }),
            });
            const responseData = await response.json();
            console.log("Response Data from Backend:", responseData); // Debugging: Log Backend Response
            setUserData(responseData);
        } catch (error) {
            console.error("Fehler beim Abruf der Daten.", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        let queryParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = queryParams.get('access_token');
        console.log("Access Token:", accessToken); // Stellen Sie sicher, dass der Access Token vorhanden ist
        if (accessToken) {
            fetchGoogleUserData(accessToken).then(googleData => {
                console.log("Google Data:", googleData); // Überprüfen Sie die von Google erhaltenen Daten
                if (googleData) {
                    sendDataToBackend(googleData);
                } else {
                    console.log("Google Data ist null oder undefined.");
                }
            });
        }
    }, []);

    if (isLoading) {
        return <div>Lädt...</div>;
    }

    // Hier prüfen wir, ob userData und userData.email existieren
    if (!userData || !userData.email) {
        return <div>Keine Benutzerdaten gefunden.</div>;
    }

    // Die E-Mail wird jetzt aus dem userData-Objekt ausgelesen
    return (
        <>
            {userData.posts ? (
                <>
                    <h1>Weiterleitung des User an News Feed</h1>
                    <NewAccount data={userData} />
                </>
            ) : (
                <>
                    <h1>Hier wird der User zu New Account weitergeleitet</h1>
                    <p>
                        <a href="/">Home</a>
                    </p>
                    <article>
                        {/* Hier wird die E-Mail direkt aus dem userData-Objekt gerendert */}
                        <div>Usermail: {userData.email}</div>
                    </article>
                </>
            )}
        </>
    );
}

export default LoginGoogle;
