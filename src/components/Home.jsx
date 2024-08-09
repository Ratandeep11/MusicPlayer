import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useStateProvider } from '../utils/StateProvider';
import { reducerCases } from '../utils/Constants';
import { useNavigate } from 'react-router-dom';


export default function Home() {
        const [playlists, setPlaylists] = useState([]);
        const [songsOfTheWeek, setSongsOfTheWeek] = useState([]);
        const [{ audio }, dispatch] = useStateProvider();
        const [showMorePlaylists, setShowMorePlaylists] = useState(false);
        const [showMoreSongs, setShowMoreSongs] = useState(false);
        const token = window.localStorage.getItem('token');
        const [loading, setLoading] = useState(false);
      
        useEffect(() => {
          const fetchData = async () => {
            setLoading(true);
            try {
              const playlistsResponse = await axios.get(
                'https://api.spotify.com/v1/browse/featured-playlists',
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
                }
              );
              setPlaylists(playlistsResponse.data.playlists.items);
              console.log(playlistsResponse);
            } catch (error) {
              console.error('Error fetching data:', error);
            } finally {
              setLoading(false);
            }
          };
      
          if (token) {
            fetchData();
          }
        }, [token]);
      
const navigate = useNavigate();

  const handlePlaylistClick = (playlistId) => {
    navigate(`/playlist/${playlistId}`);
  };

    const playPreview = async (id, type = 'playlist') => {
        try {
            if (audio) {
                audio.pause();
                dispatch({ type: reducerCases.SET_AUDIO, audio: null });
            }

            let previewUrl = null;
            let currentlyPlaying = null;
            let tracks = [];

            const response = await axios.get(
                `https://api.spotify.com/v1/playlists/${id}/tracks`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const trackItems = response.data.items;
            tracks = trackItems.slice(0, 10).map((item, index) => ({
                id: item.track.id,
                name: item.track.name,
                artists: item.track.artists.map((artist) => artist.name),
                image: item.track.album.images[2]?.url,
                preview_url: item.track.preview_url,
                index
            }));

            const track = tracks.find(t => t.preview_url);
            if (track) {
                previewUrl = track.preview_url;
                currentlyPlaying = track;
                console.log(currentlyPlaying)
            } else {
                console.error('No track with a preview URL found in the playlist');
            }

            if (previewUrl) {
                const audio = new Audio(previewUrl);
                dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
                dispatch({ type: reducerCases.SET_FOOTER_VISIBILITY, isFooterVisible: true });
                dispatch({ type: reducerCases.SET_AUDIO, audio });
                dispatch({ type: reducerCases.SET_TRACKS, tracks });
                dispatch({ type: reducerCases.SET_CURRENT_TRACK_INDEX, index: 0 });
                audio.play();
            }
        } catch (error) {
            console.error('Error fetching preview:', error);
        }
    };

    return (
        <Container>
          {loading ? (
            <CircularLoader />
          ) : (
            <>
              <h1>Featured Playlists</h1>
              <SeeAllButton onClick={() => setShowMorePlaylists(!showMorePlaylists)}>
                {showMorePlaylists ? 'See Less' : 'See All'}
              </SeeAllButton>
              <PlaylistsContainer>
                {playlists.slice(0, showMorePlaylists ? playlists.length : 4).map((playlist) => (
                  <PlaylistCard key={playlist.id} onClick={() => handlePlaylistClick(playlist.id)}>
                    <div className='card'>              
                      <img src={playlist.images[0].url} alt={playlist.name} />
                      <h3>{playlist.name}</h3>
                      <h3 className='description'>{playlist.description}</h3>
                    </div>
                  </PlaylistCard>
                ))}
              </PlaylistsContainer>
    
              <h1>This Week's Songs</h1>
              <SeeAllButton onClick={() => setShowMoreSongs(!showMoreSongs)}>
                {showMoreSongs ? 'See Less' : 'See All'}
              </SeeAllButton>
              <PlaylistsContainer>
                {playlists.slice(0, showMorePlaylists ? playlists.length : 4).map((playlist) => (
                  <PlaylistCard key={playlist.id} onClick={() => handlePlaylistClick(playlist.id)}>
                    <div className='card'>
                      <img src={playlist.images[0].url} alt={playlist.name} />
                      <h3>{playlist.name}</h3>
                      <h3 className='description'>{playlist.description}</h3>
                    </div>
                  </PlaylistCard>
                ))}
              </PlaylistsContainer>
            </>
          )}
        </Container>
      );
    }
    const CircularLoader = styled.div`
    background-color:black;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
const Container = styled.div`
    padding: 2rem;
    background-color: #121212;
    color: #ffffff;
    overflow: auto;
    font-size: 2rem;
    
    h1 {
        margin-left:2rem;
         margin-top:2rem;

        // margin-bottom: 1rem;
        font-size: 2.5rem;
        font-family: Raleway;
    }
    
    @media (min-width: 768px) {
        h1 {
            font-size: 3rem;
        }
    }
    
    @media (min-width: 1024px) {
        h1 {
            font-size: 3.9rem;
        }
    }
`;

const PlaylistsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
`;

const PlaylistCard = styled.div`
    background-color: #282828;
    border-radius: 5px;
    width: 100%;
    max-width: 435px;
    text-align: center;
    cursor: pointer;
    padding: 0.5rem;
    margin: 1rem;
    margin-left:1rem;
    border-radius: 30px;
    height: auto;

    .description {
        font-size: 1.2rem;
        color: #b3b3b3;
        margin: 0.5rem 0 0 0;
        font-family: Raleway;
    }

    img {
        width: 100%;
        height: auto;
        border-radius: 5px;
    }

    h3 {
        margin: 1rem 0;
        font-size: 1.6rem;
    }

    &:hover {
        background-color: #1db954;
    }

    @media (min-width: 768px) {
        width: calc(50% - 2rem);
    }

    @media (min-width: 1024px) {
        width: calc(25% - 2rem);
    }
`;

const SeeAllButton = styled.button`
    background-color: #121212;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 1rem;
    font-size: 1.2rem;
    color: #1db954;
    align-self: flex-end;
    margin-left:1850px;
    @media (min-width: 768px) {
        font-size: 1.5rem;
    }

    @media (min-width: 1024px) {
        font-size: 1.5rem;
    }
`;
