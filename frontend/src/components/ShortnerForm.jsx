import React, { useState } from 'react';
import { Log } from  '../../../Logging middleware/log.js';
import { useNavigate } from 'react-router-dom';

function ShortnerForm() {
  const [url, setUrl] = useState('');
  const [expire, setExpire] = useState(30);
  const [shortcode, setShortcode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const isValidURL = (inputUrl) => {
    try {
      new URL(inputUrl);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = () => {
    if (!url) {
      setError("URL is required");
      Log("frontend", "error", "validation", "Empty URL");
      return;
    }

    if (!isValidURL(url)) {
      setError("Invalid URL format");
      Log("frontend", "error", "validation", "Invalid URL format");
      return;
    }

    if (expire <= 0) {
      setError("Expiry should be greater than 0");
      Log("frontend", "error", "validation", "Invalid expiry time");
      return;
    }

    const code = shortcode.trim() !== "" ? shortcode : Math.random().toString(36).substring(2, 8);
    const expiryTime = new Date().getTime() + expire * 60 * 1000;

    const saveData = {
      originalUrl: url,
      expiry: expiryTime
    };

    localStorage.setItem(code, JSON.stringify(saveData));

    Log("frontend", "info", "shortener", `Short URL created: ${code}`);

    setResult({
      shortUrl: `${window.location.origin}/${code}`,
      expiryTime: new Date(expiryTime).toLocaleString()
    });

    setError("");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">URL Shortener</h3>

      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded mb-4"
      />

      <input
        type="number"
        placeholder="Expiry in minutes"
        value={expire}
        onChange={(e) => setExpire(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded mb-4"
      />

      <input
        type="text"
        placeholder="Custom Shortcode (optional)"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded mb-4"
      />

      <button onClick={handleSubmit}
        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition mb-2">
        Shorten URL
      </button>

      <button onClick={() => navigate('/stats')}
        className="w-full bg-gray-500 text-white p-3 rounded hover:bg-gray-600 transition">
        Check Stats
      </button>

      {error && <p className="text-red-500 font-semibold mt-3">{error}</p>}

      {result && (
        <div className="bg-green-100 p-4 rounded mt-4">
          <p>
            Short URL: <a href={`/${shortcode || result.shortUrl.split('/').pop()}`} className="text-blue-600 underline">
              {result.shortUrl}
            </a>
          </p>
          <p>Expires At: {result.expiryTime}</p>
        </div>
      )}
    </div>
  );
}

export default ShortnerForm;
