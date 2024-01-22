import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginGoogle() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Verwenden von useNavigate

  // Funktion zum Transformieren und Senden von Daten an das Backend
  const sendDataToBackend = async (accessToken) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://845d97vw4k.execute-api.eu-central-1.amazonaws.com/login/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accessToken: accessToken }),
        }
      );
      const responseData = await response.json();

      localStorage.setItem("Session", JSON.stringify(responseData.sessionData));

      if (responseData.isNewUser) {
        navigate("/newacc");
      } else {
        navigate("/newsfeed");
      }

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
      sendDataToBackend(accessToken);
    }
  }, []);

  if (isLoading) {
    return <div>Lädt...</div>;
  }

  // Wenn keine Benutzerdaten vorhanden sind, wird eine Nachricht angezeigt.
  if (!userData || !userData.email) {
    return (
      <div>
        <p>Keine Benutzerdaten vorhanden. Bitte loggen Sie sich ein.</p>
      </div>
    );
  }

  // Keine Notwendigkeit für einen weiteren Render-Block, da die Weiterleitung oben gehandhabt wird.
  return null;
}

export default LoginGoogle;
