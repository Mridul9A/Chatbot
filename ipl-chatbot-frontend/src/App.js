// src/App.js
import React, { useEffect, useState } from "react";
import { createDirectLine } from "botframework-webchat";
import ReactWebChat from "botframework-webchat";

const App = () => {
  const [directLine, setDirectLine] = useState(null);

  useEffect(() => {
    const fetchDirectLineToken = async () => {
      try {
        const res = await fetch(
          "https://directline.botframework.com/v3/directline/tokens/generate",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer YOUR_DIRECT_LINE_SECRET`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch Direct Line token");
        }
        const data = await res.json();
        setDirectLine(createDirectLine({ token: data.token }));
      } catch (error) {
        console.error("Error fetching Direct Line token:", error);
      }
    };

    fetchDirectLineToken();
  }, []);

  return directLine ? (
    <div style={{ height: "500px", width: "100%" }}>
      <ReactWebChat directLine={directLine} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default App;
