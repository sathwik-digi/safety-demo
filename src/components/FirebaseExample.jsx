import React, { useEffect, useState } from "react";
import { getRemoteConfigValue } from "../firebase";

function FirebaseExample() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const loadConfig = async () => {
      const msg = await getRemoteConfigValue("welcome_message");
      setMessage(msg || "Fallback here");
    };
    loadConfig();
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default FirebaseExample;
