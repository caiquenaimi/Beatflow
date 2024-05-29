import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, Dimensios } from 'react-native'
import TrackPlayer, { Capability, Event, RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents, getCurrentTrack } from 'react-native-track-player'

const setupPlayer = async() => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.Stop
        ],
        compactCapabilities: [
            Capability.Play,
            Capability.Pause
        ]
    });

    await TrackPlayer.add({
        id: 'trackId',
        url: require('../../../assets/track.mp3'),
        title: 'Track Title',
        artist: 'Track Artist',
        artwork: require('../../../assets/track.png')
    });
    await TrackPlayer.play();

}


const togglePlayback = async(playbackState) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();    
    if (currentTrack == null) {
        await TrackPlayer.reset();
        await TrackPlayer.add({
            id: 'trackId',
            url: require('../../../assets/track.mp3'),
            title: 'Track Title',
            artist: 'Track Artist',
            artwork: require('../../../assets/track.png')
        });
        await TrackPlayer.play();
    } else {
        if (playbackState === State.Paused) {
            await TrackPlayer.play();
        } else {
            await TrackPlayer.pause();
        }
    }
}
export default function musicPlayer() {
    const playbackState = usePlaybackState();
    const progress = useProgress(); 
    
    const scrollx = useRef(new Animated.Value(0)).current;
    const [songIndex, setSongIndex] = useState(0);
    const [repeatMode, setRepeatMode] = useState("off");
    const [shuffleMode, setShuffleMode] = useState("off")
    const songSlider = useRef(null);
    const isSeeking = useRef(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isBuffering, setIsBuffering] = useState(false);
    const [isChanging, setIsChanging] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isPlaylist, setIsPlaylist] = useState(false);
    // id SERIAL PRIMARY KEY,
    // name VARCHAR(100) NOT NULL,
    // image VARCHAR(100),
    // duration DECIMAL(5,2)  NOT NULL,
    // file VARCHAR(100) NOT NULL,
    // album VARCHAR(100) NOT NULL,
    // artist VARCHAR(100) NOT NULL
    const [trackName, setTrackName] = useState();
    const [trackImage, setTrackImage] = useState();
    const [trackAlbum, setTrackAlbum] = useState();
    const [trackArtist, setTrackArtist] = useState();
    const [trackDuration, setTrackDuration] = useState();       


    const repeatIcon = () => {
        if (repeatMode === "off") {
           setRepeatMode("track")
        }
        if (repeatMode === "track") {
            setRepeatMode("repeat")
        }
        if (repeatMode === "repeat") {
            setRepeatMode("off")
        }
    }

    const shuffleIcon = () => {
        if (shuffleMode === "off") {
            setShuffleMode("on")
        }
        if (shuffleMode === "on") {
            setShuffleMode("off")
        }
    }
    
    const likeIcon = () => {
        if (isLiked === false) {
            setIsLiked(true)
        }
        if (isLiked === true) {
            setIsLiked(false)
        }
    }

    const playlistIcon = () => {
        if (isPlaylist === false) {
            setIsPlaylist(true)
        }
        if (isPlaylist === true) {
            setIsPlaylist(false)
        }
    }

    const changePlayback = () => {
        togglePlayback(playbackState);
    }

    const seekTo = async (amount) => {  
        await TrackPlayer.seekTo(amount);
    }


    const skipTo = async(trackId) =>{
        await TrackPlayer.skip(trackId);    
    }
    const skipToNext = () => {
        TrackPlayer.skipToNext();
    }


    const skipToPrevious = () => { 
        TrackPlayer.skipToPrevious();
    }

    const changeRepeatMode = () => {
        if (repeatMode === "off") {
            TrackPlayer.setRepeatMode(RepeatMode.Track);
            setRepeatMode("track");
    } 
        if (repeatMode === "track") {
            TrackPlayer.setRepeatMode(RepeatMode.Queue);
            setRepeatMode("repeat");
    }
        if (repeatMode === "repeat") {
            TrackPlayer.setRepeatMode(RepeatMode.Off);
            setRepeatMode("off");
    }
}
    
    const changeShuffleMode = () => {
        if (shuffleMode === "off") {
            TrackPlayer.setShuffleMode(true);
            setShuffleMode("on");
    }
        if (shuffleMode === "on") {
            TrackPlayer.setShuffleMode(false);
            setShuffleMode("off");
    }
}

const listener = async (event) => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const { name, image, artist, album, duration } = track;
      setTrackName(name);
      setTrackImage(image);
      setTrackArtist(artist);
      setTrackAlbum(album);
      setTrackDuration(duration);
    }
  };
  


    useEffect(() => {
        setupPlayer();
        scrollx.addListener(({ value }) => {
            const index = Math.round(value / Dimensions.get('window').width);
            if (index >= 0) {
                skipTo(index);
            }
            setSongIndex(index);
        });
    return () => {
        scrollx.removeAllListeners();
    }})

    return (
        <View>
            <View>
                <Image source={trackImage} />
                <Text>{trackName}</Text>
                <Text>{trackArtist}</Text>
                <Text>{trackAlbum}</Text>
                <Text>{trackDuration}</Text>
            </View>
            <View>
                <TouchableOpacity onPress={changeRepeatMode}>
                    <Text>{repeatMode}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={changeShuffleMode}>
                    <Text>{shuffleMode}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={likeIcon}>
                    <Text>{isLiked ? "Liked" : "Not Liked"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={playlistIcon}>
                    <Text>{isPlaylist ? "Playlist" : "Not Playlist"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={changePlayback}>
                    <Text>{playbackState === State.Playing ? "Pause" : "Play"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={skipToNext}>
                    <Text>Skip to Next</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={skipToPrevious}>
                    <Text>Skip to Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={seekTo}>
                    <Text>Seek to</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}
