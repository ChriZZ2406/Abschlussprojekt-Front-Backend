import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function LoginGoogle() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchGoogleUserData = async (accessToken) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const data = await response.json();
      console.log("Google Data:", data);
      return data;
    } catch (error) {
      console.error("Fehler beim Abrufen von Google-Benutzerdaten.", error);
      return null;
    }
  };

  const sendDataToBackend = async (googleData, accessToken) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://845d97vw4k.execute-api.eu-central-1.amazonaws.com/login/googlefetch', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken: accessToken })
      });

      const responseFetch = await response.json();
      console.log("responseData from googlefetch", responseFetch);

      const responseToBackend = await fetch(
        "https://845d97vw4k.execute-api.eu-central-1.amazonaws.com/login/google",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: responseFetch.user })
        }
      );

      const responseData = await responseToBackend.json();
      console.log("Response Data from Backend:", responseData);
      setUserData(responseData);
      localStorage.setItem("Session", JSON.stringify(responseData.sessionData));

      if (responseData.isNewUser = false) {
        navigate("/newacc");
      }
      else {
        navigate("/newsfeed");
      }

    } catch (error) {
      console.error("Fehler beim Senden der Daten an das Backend.", error);
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
          sendDataToBackend(googleData, accessToken);
        }
      });
    }
  }, []);

  if (isLoading) {
    return <div>Lädt...</div>;
  }

  if (!userData || !userData.email) {
    return <div><p>Keine Benutzerdaten vorhanden. Bitte loggen Sie sich ein.</p></div>;
  }

  return null;
}

export default LoginGoogle;
