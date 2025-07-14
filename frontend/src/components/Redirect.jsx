import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Log } from  '../../../Logging middleware/log.js';

function RedirectHandler() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const item = localStorage.getItem(shortcode);

    if (!item) {
      Log("frontend", "error", "redirect", `Shortcode ${shortcode} not found`);
      navigate("/");
      return;
    }

    const parsed = JSON.parse(item);
    const now = new Date().getTime();

    if (now > parsed.expiry) {
      Log("frontend", "error", "redirect", `Shortcode ${shortcode} expired`);
      navigate("/");
      return;
    }

    Log("frontend", "info", "redirect", `Redirecting to ${parsed.originalUrl}`);
    window.location.href = parsed.originalUrl;
  }, [shortcode, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl font-semibold">Redirecting...</p>
    </div>
  );
}

export default RedirectHandler;
