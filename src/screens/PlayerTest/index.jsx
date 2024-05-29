import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useLastActiveTrack, useSetupTrackPlayer, useTrackPlayerFavorite, useTrackPlayerRepeatMode, useTrackPlayerVolume } from './seus-hooks';

const MusicPlayer = () => {
  // Setup Track Player
  useSetupTrackPlayer({});

  // Hooks
  const lastActiveTrack = useLastActiveTrack();
  const { isFavorite, toggleFavorite } = useTrackPlayerFavorite();
  const { repeatMode, changeRepeatMode } = useTrackPlayerRepeatMode();
  const { volume, updateVolume } = useTrackPlayerVolume();

  // State
  const [isPlaying, setIsPlaying] = useState(false);

  // Play / Pause Functions
  const playPause = async () => {
    if (lastActiveTrack) {
      if (isPlaying) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Toggle Repeat Mode Function
  const toggleRepeatMode = () => {
    let newMode;
    switch (repeatMode) {
      case RepeatMode.Off:
        newMode = RepeatMode.Track;
        break;
      case RepeatMode.Track:
        newMode = RepeatMode.Queue;
        break;
      case RepeatMode.Queue:
        newMode = RepeatMode.Off;
        break;
      default:
        newMode = RepeatMode.Off;
    }
    changeRepeatMode(newMode);
  };

  // Render
  return (
    <View>
      <Text>Music Player</Text>
      <Text>Current Track: {lastActiveTrack?.title}</Text>
      <Button title={isPlaying ? 'Pause' : 'Play'} onPress={playPause} />
      <Button title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'} onPress={toggleFavorite} />
      <Button title="Toggle Repeat Mode" onPress={toggleRepeatMode} />
      <Text>Volume: {volume}</Text>
      <Button title="Increase Volume" onPress={() => updateVolume(volume + 0.1)} />
      <Button title="Decrease Volume" onPress={() => updateVolume(volume - 0.1)} />
    </View>
  );
};

export default MusicPlayer;
