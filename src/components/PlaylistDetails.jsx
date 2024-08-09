import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useStateProvider } from "../utils/StateProvider";

export default function PlaylistDetails() {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [{ token }] = useStateProvider();

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await axios.get(
                    `https://api.spotify.com/v1/playlists/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setPlaylist(response.data);
            } catch (error) {
                console.error('Error fetching playlist:', error);
            }
        };

        if (token) {
            fetchPlaylist();
        }
    }, [token, id]);

    if (!playlist) return null;

    return (
        <Container>
            <PlaylistHeader>
                <img src={playlist.images[0].url} alt={playlist.name} />
                <div>
                    <h1>{playlist.name}</h1>
                    <p>{playlist.description}</p>
                </div>
            </PlaylistHeader>
            <TracksContainer>
                {playlist.tracks.items.map((item) => (
                    <Track key={item.track.id}>
                        <img src={item.track.album.images[0].url} alt={item.track.name} />
                        <div>
                            <h3>{item.track.name}</h3>
                            <p>{item.track.artists.map((artist) => artist.name).join(', ')}</p>
                        </div>
                    </Track>
                ))}
            </TracksContainer>
        </Container>
    );
}

const Container = styled.div`
    padding: 2rem;
    background-color: #121212;
    color: #ffffff;
`;

const PlaylistHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;

    img {
        width: 200px;
        height: 200px;
        object-fit: cover;
    }

    h1 {
        margin: 0;
        font-size: 2rem;
    }

    p {
        margin: 0;
        color: #b3b3b3;
    }
`;

const TracksContainer = styled.div`
    margin-top: 2rem;
`;

const Track = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid #282828;
    // font-size:5rem;
    img {
        width: 64px;
        height: 64px;
        object-fit: cover;
    }

    h3 {
        margin: 0;
        font-size: 1.2rem;
    }

    p {
        margin: 0;
        color: #b3b3b3;
    }
`;
