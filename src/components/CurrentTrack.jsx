import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from '../utils/Constants';

export default function CurrentTrack() {
    const [{ token, currentlyPlaying }, dispatch] = useStateProvider();

    // useEffect(() => {
    //     const getCurrentTrack = async () => {
    //         try {
    //             // const response = await axios.get(
    //             //     "https://api.spotify.com/v1/me/player/currently-playing",
    //             //     {
    //             //         headers: {
    //             //             Authorization: `Bearer ${token}`,
    //             //             "Content-Type": "application/json",
    //             //         },
    //             //     }
    //             // );

    //             // console.log(response);

    //             // if (response.data && response.data.item) {
    //             //     const { item } = response.data;
    //             //     const currentlyPlaying = {
    //             //         id: item.id,
    //             //         name: item.name,
    //             //         artists: item.artists.map((artist) => artist.name),
    //             //         image: item.album.images[2]?.url,
    //             //     };
    //             //     console.log("Currently playing image URL:", currentlyPlaying.image);
    //             //     dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
    //             // } else {
    //             //     console.log("No track is currently playing or response is empty.");
    //             //     dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
    //             // }
    //         } catch (error) {
    //             console.error("Error fetching currently playing track:", error);
    //         }
    //     };

    //     getCurrentTrack();
    // }, [token, dispatch]);

    return (
        <Container>
            {currentlyPlaying ? (
                <div className="track">
                    <div className="track__image">
                        <img src={currentlyPlaying.image} alt={currentlyPlaying.name} />
                    </div>
                    <div className="track__info">
                        <h4>{currentlyPlaying.name}</h4>
                        <h6>{currentlyPlaying.artists?.join(" ") || 'arijit singh'}</h6>
                    </div>
                </div>
            ) : (
                <p>No track is currently playing</p>
            )}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    // background-color: #282828;
    border-radius: 8px;

    .track {
        display: flex;
        align-items: center;
        gap: 1rem;

        .track__image {
            img {
                height: 80px;
                width: 80px;
                border-radius: 80px;
                object-fit: cover;
                background-color: red; /* Fallback color */
            }
        }

        .track__info {
            color: #ddd;
            h4 {
                margin: 0;
                font-size: 18px;
            }
            h6 {
                margin: 0;
                font-size: 14px;
                color: #bbb;
            }
        }
    }
`;
