import React, { useState } from 'react';
import { createPlaylist } from '../services/api';

const PlaylistForm = ({ onPlaylistCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPlaylist({ name, description, duration, user_id: userId });
      onPlaylistCreated();
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration" required />
      <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" required />
      <button type="submit">Create Playlist</button>
    </form>
  );
};

export default PlaylistForm;
