import { useEffect, useRef, useState } from 'react';
import TrackPlayer, { Capability, RatingType, RepeatMode } from 'react-native-track-player';


const setupPlayer = async () => {
  await TrackPlayer.setupPlayer({
    maxCacheSize: 1024 * 10,
  });

  await TrackPlayer.updateOptions({
    ratingType: RatingType.Heart,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
  });

  await TrackPlayer.setVolume(0.3);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);

  const songsDirectoryPath = RNFS.DocumentDirectoryPath + '/songs';
  const files = await RNFS.readDir(songsDirectoryPath);

  const tracks = files.map((file, index) => ({
      name: "Out West",
      image: "https://i.imgur.com/uQlsBk5.jpg",
      duration: 159,
      file: "out_west.MP3",
      album: "JackBoys",
      artist: "Travis Scott, JACKBOYS",
    },
    {
      name: "The Scotts",
      image: "https://i.imgur.com/5IvOHN9.jpg",
      duration: 167,
      file: "the_scotts.MP3",
      album: "The Scotts",
      artist: "Travis Scott, Kid Cudi",
    },
    {
      name: "Trance",
      image: "https://i.imgur.com/brEzLqq.jpg",
      duration: 194,
      file: "trance.MP3",
      album: "Heroes & Villains",
      artist: "Metro Boomin, Travis Scott, Young Thug",
    }
  ));


  await TrackPlayer.add(tracks);
};

export const useSetupTrackPlayer = () => {
  const [isPlayerSetup, setIsPlayerSetup] = useState(false);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;

    setupPlayer()
      .then(() => {
        isInitialized.current = true;
        setIsPlayerSetup(true);
      })
      .catch((error) => {
        isInitialized.current = false;
        console.error(error);
      });
  }, []);

  return isPlayerSetup;
};
