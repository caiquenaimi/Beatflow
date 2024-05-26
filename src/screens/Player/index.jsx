import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, Dimensios } from 'react-native'
import TrackPlayer, { Capability, Event, RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents, getCurrentTrack } from 'react-native-track-player'

const setupPlayer = async() => {
    await TrackPlayer.setupPlayer();
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
    }} )}
