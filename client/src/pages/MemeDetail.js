import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function MemeDetail() {
  const [meme, setMeme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMeme();
  }, [id]);

  const fetchMeme = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/memes/${id}`);
      setMeme(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch meme details');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this meme?')) {
      try {
        await axios.delete(`http://localhost:5000/api/memes/${id}`);
        navigate('/');
      } catch (error) {
        setError('Failed to delete meme');
      }
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

  if (!meme) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Meme not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={meme.imageUrl}
          alt={meme.title}
          className="w-full h-96 object-contain"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900">{meme.title}</h1>
          <p className="mt-2 text-gray-600">Category: {meme.category}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {meme.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          {user && user.id === meme.createdBy && (
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => navigate(`/edit/${meme._id}`)}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemeDetail; 