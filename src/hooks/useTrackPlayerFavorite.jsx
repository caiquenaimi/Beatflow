import { useState, useCallback } from 'react';
import TrackPlayer, { useActiveTrack } from 'react-native-track-player';

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  const toggleTrackFavorite = (track) => {
    setFavorites((prevFavorites) => {
      const trackIndex = prevFavorites.findIndex((fav) => fav.url === track.url);
      if (trackIndex >= 0) {
        return prevFavorites.filter((fav) => fav.url !== track.url);
      } else {
        return [...prevFavorites, track];
      }
    });
  };

  return { favorites, toggleTrackFavorite };
};

export const useTrackPlayerFavorite = () => {
  const activeTrack = useActiveTrack();

  const { favorites, toggleTrackFavorite } = useFavorites();

  const isFavorite =
    favorites.find((track) => track.url === activeTrack?.url)?.rating === 1;

  const toggleFavorite = useCallback(async () => {
    const id = await TrackPlayer.getActiveTrackIndex();

    if (id == null) return;

    await TrackPlayer.updateMetadataForTrack(id, {
      rating: isFavorite ? 0 : 1,
    });

    if (activeTrack) {
      toggleTrackFavorite(activeTrack);
    }
  }, [isFavorite, toggleTrackFavorite, activeTrack]);

  return { isFavorite, toggleFavorite };
};
