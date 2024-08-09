import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillVolumeUpFill } from 'react-icons/bs';
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg';
import { useStateProvider } from '../utils/StateProvider';
import { reducerCases } from '../utils/Constants';

export default function PlayerControls() {
    const [{ audio, currentlyPlaying, tracks, currentTrackIndex }, dispatch] = useStateProvider();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (audio) {
            const handleEnded = () => {
                setIsPlaying(false);
                handleNext();
            };
            const handlePause = () => setIsPlaying(false);
            const handlePlay = () => setIsPlaying(true);
            const handleTimeUpdate = () => {
                setCurrentTime(audio.currentTime);
                setDuration(audio.duration);
            };

            audio.addEventListener('ended', handleEnded);
            audio.addEventListener('pause', handlePause);
            audio.addEventListener('play', handlePlay);
            audio.addEventListener('timeupdate', handleTimeUpdate);

            // Cleanup event listeners
            return () => {
                audio.removeEventListener('ended', handleEnded);
                audio.removeEventListener('pause', handlePause);
                audio.removeEventListener('play', handlePlay);
                audio.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }
    }, [audio]);

    useEffect(() => {
        if (audio) {
            setIsPlaying(!audio.paused);
        }
    }, [audio]);

    const changeState = () => {
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const playTrack = (index) => {
        if (tracks && tracks.length > 0) {
            const track = tracks[index];
            if (track && track.preview_url) {
                // Pause the current audio if it's playing
                if (audio) {
                    audio.pause();
                }

                const newAudio = new Audio(track.preview_url);
                newAudio.play();
                dispatch({ type: reducerCases.SET_AUDIO, audio: newAudio });
                dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: track });
                dispatch({ type: reducerCases.SET_CURRENT_TRACK_INDEX, index });
                setIsPlaying(true);
            }
        }
    };

    const handlePrevious = () => {
        if (tracks && tracks.length > 0) {
            const newIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
            playTrack(newIndex);
        }
    };

    const handleNext = () => {
        if (tracks && tracks.length > 0) {
            const newIndex = (currentTrackIndex + 1) % tracks.length;
            playTrack(newIndex);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <Container>
            <div className="previous">
                <CgPlayTrackPrev onClick={handlePrevious} />
            </div>
            <div className="state">
                {isPlaying ? <BsFillPauseCircleFill onClick={changeState} /> : <BsFillPlayCircleFill onClick={changeState} />}
            </div>
            <div className="next">
                <CgPlayTrackNext onClick={handleNext} />
            </div>
            <div className="timer">
                <Timer>{formatTime(currentTime)}</Timer>
                <ProgressBar>
                    <ProgressFill style={{ width: `${(currentTime / duration) * 100}%` }} />
                </ProgressBar>
                <Timer>{formatTime(duration)}</Timer>
            </div>
            <div className="volume">
                <BsFillVolumeUpFill />
            </div>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    gap: 2rem;
    width: 100%;
    align-items: center;

    svg {
        color: #b3b3b3;
        transition: 0.2s ease-in-out;

        &:hover {
            color: white;
        }
    }

    .state svg {
        color: white;
    }

    .state {
        font-size: 3rem;
    }

    .previous {
        font-size: 3rem;
    }

    .next {
        font-size: 3rem;
    }

    .timer {
        flex: 1;
        display: flex;
        align-items: center;
        margin-left: 1rem;
        margin-right: 1rem;
        gap: 0.5rem;
    }

    .volume {
        font-size: 2rem;
    }
`;

const ProgressBar = styled.div`
    width: 100%;
    height: 8px;
    background-color: #b3b3b3;
    border-radius: 2px;
    position: relative;
    overflow: hidden;
`;

const ProgressFill = styled.div`
    height: 100%;
    background-color: #1db954;
    position: absolute;
    top: 0;
    left: 0;
    transition: width 0.1s ease;
`;

const Timer = styled.div`
    font-size: 1rem;
    color: white;
`;
