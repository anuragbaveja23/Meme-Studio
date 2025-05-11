import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/memes');
      setMemes(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch memes');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {memes.map((meme) => (
        <Link
          key={meme._id}
          to={`/meme/${meme._id}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img
            src={meme.imageUrl}
            alt={meme.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">{meme.title}</h2>
            <p className="text-gray-600 mt-2">{meme.category}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {meme.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Home; 