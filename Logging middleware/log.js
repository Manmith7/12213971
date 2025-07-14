// utils/Log.js

import axios from 'axios';

export const Log = async (stack, level, pkg, message) => {
  const logData = {
    stack: stack,
    level: level,
    package: pkg,
    message: message
  };

  try {
    await axios.post(
      'http://20.244.56.144/evaluation-service/logs',
      logData,
      {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtYW5taXRoZ29wYXJpN0BnbWFpbC5jb20iLCJleHAiOjE3NTI0Njk4OTYsImlhdCI6MTc1MjQ2ODk5NiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjFjMjljZmRkLTFmMWUtNDNkYi1hZjAyLTUxYjhmZTE3YmVlNyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6Im1hbm1pdGggZ29wYXJpIiwic3ViIjoiZjUxN2E2NWQtZTIzZi00NGE2LWJmNmItZTM0Mjg0NzQ3OTk1In0sImVtYWlsIjoibWFubWl0aGdvcGFyaTdAZ21haWwuY29tIiwibmFtZSI6Im1hbm1pdGggZ29wYXJpIiwicm9sbE5vIjoiMTIyMTM5NzEiLCJhY2Nlc3NDb2RlIjoiQ1p5cFFLIiwiY2xpZW50SUQiOiJmNTE3YTY1ZC1lMjNmLTQ0YTYtYmY2Yi1lMzQyODQ3NDc5OTUiLCJjbGllbnRTZWNyZXQiOiJrendnd1RyemF2Q1BadkF0In0.bXwPQ3vTVXmwR9Dd5MQ7bokGwauS6w2YrhinQ1gWFWo'
        }
      }
    );
    console.log(`[${level.toUpperCase()}] (${pkg}) ${message}`);
  } catch (err) {
    console.error("Logging failed:", err.message);
  }
};
