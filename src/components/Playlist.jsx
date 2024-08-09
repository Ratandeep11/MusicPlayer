import { useEffect } from "react";
import React from 'react';
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import styled from "styled-components";

export default function Playlist() {
    const [{ token, playlists }, dispatch] = useStateProvider();

    useEffect(() => {
        const getPlaylistData = async () => {
            try {
                const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                console.log("API Response:", response.data); // Log the entire response
                const { items } = response.data;
                const playlists = items.map(({ name, id }) => {
                    return { name, id };
                });
                console.log("Transformed Playlists:", playlists); // Log the transformed playlists array
                dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
            } catch (error) {
                console.error("Error fetching playlists:", error); // Log any errors
            }
        };

        if (token) {
            getPlaylistData();
        }
    }, [token, dispatch]);

    const changeCurrentPlaylist = (selectedPlaylistId) => {
        dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
    };

    console.log("Playlists State on render:", playlists); // Log the playlists state on each render

    return (
        <Container>
            <ul>
                {playlists && Array.isArray(playlists) ? (
                    playlists.map(({ name, id }) => (
                        <li key={id} onClick={() => changeCurrentPlaylist(id)}>{name}</li>
                    ))
                ) : (
                    <li>No playlists available</li>
                )}
            </ul>
        </Container>
    );
}

const Container = styled.div`
    ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        height: 55vh;
        max-height: 100%;
        overflow: auto;
        &::-webkit-scrollbar {
            width: 0.7rem;
            &-thumb {
                background-color: rgba(255, 255, 255, 0.6);
            }
        }
        li {
            display: flex;
            gap: 1rem;
            cursor: pointer;
            transition: 0.3s ease-in-out;
            &:hover {
                color: white;
            }
        }
    }
`;