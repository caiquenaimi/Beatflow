import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, Dimensios } from 'react-native'
import TrackPlayer, { Capability, Event, RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents } from 'react-native-track-player'

export default function musicPlayer() {
    const scrollx = useRef(new Animated.Value(0)).current;
    const [songIndex, setSongIndex] = useState(0);
    const songSlider = useRef(null);
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


    
    useEffect(() => {
        scrollx.addListener(({ value }) => {
            const index = Math.round(value / Dimensions.get('window').width);
            setSongIndex(index);
        })
    });
}
