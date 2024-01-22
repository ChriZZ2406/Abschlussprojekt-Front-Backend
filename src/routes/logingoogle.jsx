import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import AccountErstellung from "./newacc"; // Import der AccountErstellung Komponente

function LoginGoogle() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Verwenden von useNavigate

  // Funktion zum Abrufen von Benutzerdaten von Google People API
  const fetchGoogleUserData = async (accessToken) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      console.log("Google Data:", data);
      return data;
    } catch (error) {
      console.error("Fehler beim Abrufen von Google-Benutzerdaten.", error);
      return null;
    }
  };

  // Funktion zum Transformieren und Senden von Daten an das Backend
  const sendDataToBackend = async (googleData) => {
    const truncatedId = googleData.sub.slice(0, 9);

    const transformedData = {
      id: truncatedId,
      email: googleData.email,
      provider: "google",
      name: googleData.name,
      given_name: googleData.given_name,
      family_name: googleData.family_name,
      picture: googleData.picture,
    };

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://845d97vw4k.execute-api.eu-central-1.amazonaws.com/login/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userData: transformedData }),
        }
      );
      const responseData = await response.json();
      console.log("Response Data from Backend:", responseData);
      setUserData(responseData);
    } catch (error) {
      console.error("Fehler beim Abruf der Daten.", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let queryParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = queryParams.get("access_token");
    if (accessToken) {
      fetchGoogleUserData(accessToken).then((googleData) => {
        if (googleData) {
          sendDataToBackend(googleData);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (userData) {
      if (userData.email) {
        navigate('/newsfeed'); // Weiterleitung zu News Feed
      } else {
        navigate('/newacc'); // Weiterleitung zu AccountErstellung
      }
    }
  }, [userData, navigate]);

  if (isLoading) {
    return <div>Lädt...</div>;
  }

  // Wenn keine Benutzerdaten vorhanden sind, wird eine Nachricht angezeigt.
  if (!userData || !userData.email) {
    return <div><p>Keine Benutzerdaten vorhanden. Bitte loggen Sie sich ein.</p></div>;
  }

  // Keine Notwendigkeit für einen weiteren Render-Block, da die Weiterleitung oben gehandhabt wird.
  return null;
}

export default LoginGoogle;
