import React, { useEffect, useState } from 'react';
import {Log} from '../../../Logging middleware/log.js'
import { Link } from 'react-router-dom';

function ShortnerStats() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const allKeys = Object.keys(localStorage);
    const data = [];

    allKeys.forEach((key) => {
      try {
        const item = JSON.parse(localStorage.getItem(key));
        if (item.originalUrl && item.expiry) {
          data.push({
            code: key,
            originalUrl: item.originalUrl,
            expiry: new Date(item.expiry),
            isExpired: new Date().getTime() > item.expiry
          });
        }
      } catch (err) {}
    });

    setUrls(data);
    Log("frontend", "info", "component", "Loaded stats page");
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Shortened URL Stats</h3>

      {urls.length === 0 ? (
        <p className="text-center text-gray-500">No short URLs found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Short URL</th>
              <th className="border p-2">Original URL</th>
              <th className="border p-2">Expiry</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((item) => (
              <tr key={item.code} className="text-center">
                <td className="border p-2 text-blue-600">
                  <Link to={`/${item.code}`} className="hover:underline">
                    /{item.code}
                  </Link>
                </td>
                <td className="border p-2 truncate max-w-xs">{item.originalUrl}</td>
                <td className="border p-2">{item.expiry.toLocaleString()}</td>
                <td className={`border p-2 ${item.isExpired ? 'text-red-500' : 'text-green-600'}`}>
                  {item.isExpired ? 'Expired' : 'Active'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ShortnerStats;
