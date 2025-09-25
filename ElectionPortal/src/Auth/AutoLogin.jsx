import { useEffect, useState } from "react";
import url from "../constants/url";

const enableSecure = import.meta.env.VITE_ENABLE_SECURE === 'true';

function getCookie(name) {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
  return cookieValue;
}

const AutoLogin = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!enableSecure) {
      setLoading(false);
      setLoggedIn(true);
      return;
    }

    const authenticate = async () => {
      try {
        const response = await fetch(url.isAuthenticate.url, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        if (data?.is_authenticated === true) {
          await fetch(url.getCSRF.url, { method: "GET", credentials: "include" });
          setLoggedIn(true);
        } 
        else {
          await csrf();
        }
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        setLoading(false);
      }
    };

    const csrf = async () => {
      try {
        const response = await fetch(url.getCSRF.url, {
          method: "GET",
          credentials: "include",
          mode: 'cors',
        });
        const data = await response.json();
        
        if (data?.csrf === "token set") {
          const csrfToken = getCookie("csrftoken") ||  response.headers.get("X-CSRFToken");
          console.log('Token', csrfToken);
          if (csrfToken) await logina(csrfToken);
        }
      } catch (error) {
        console.error("CSRF error:", error);
      }
    };

    const logina = async (csrfToken) => {
      try {
        const response = await fetch(url.apiSecureLogin.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          credentials: "include",
          body: JSON.stringify({
            username: "manickam",
            password: "manickam123",
          }),
        });
        await response.json();
        setLoggedIn(true);
      } catch (error) {
        console.error("Login failed:", error);
      }
    };

    authenticate();
  }, []);

  if (loading || !loggedIn) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <span>🔐 Loading...</span>
      </div>
    );
  }

  return <>{children}</>;
};

export default AutoLogin;
