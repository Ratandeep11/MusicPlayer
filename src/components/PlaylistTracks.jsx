import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useStateProvider } from '../utils/StateProvider';
import { AiFillClockCircle } from 'react-icons/ai';
import { reducerCases } from '../utils/Constants';

export default function PlaylistTracks({ playlistId }) {
  const [tracks, setTracks] = useState([]);
  const [playlistInfo, setPlaylistInfo] = useState({});
  const [{ audio }, dispatch] = useStateProvider();
  const token = window.localStorage.getItem('token');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const playlistResponse = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlistId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        setPlaylistInfo({
          name: playlistResponse.data.name,
          description: playlistResponse.data.description,
          image: playlistResponse.data.images[0]?.url,
        });

        const tracksResponse = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const fetchedTracks = tracksResponse.data.items.map((item, index) => ({
          id: item.track.id,
          name: item.track.name,
          image: item.track.album.images[2]?.url,
          artists: item.track.artists.map((artist) => artist.name),
          preview_url: item.track.preview_url,
          duration_ms: item.track.duration_ms,
          index: index + 1, // Indexing starts from 1
        }));

        setTracks(fetchedTracks);
        dispatch({ type: reducerCases.SET_TRACKS, tracks: fetchedTracks.slice(0, 10) });
      } catch (error) {
        console.error('Error fetching playlist tracks:', error);
      } finally {
        setLoading(false);
      }
    };

    if (playlistId) {
      fetchTracks();
    }
  }, [playlistId, token, dispatch]);

  const playTrack = (track) => {
    if (audio) {
      audio.pause();
      dispatch({ type: reducerCases.SET_AUDIO, audio: null });
    }

    if (track.preview_url) {
      const audio = new Audio(track.preview_url);
      dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: track });
      dispatch({ type: reducerCases.SET_AUDIO, audio });
      dispatch({ type: reducerCases.SET_CURRENT_TRACK_INDEX, index: track.index });
      dispatch({ type: reducerCases.SET_FOOTER_VISIBILITY, isFooterVisible: true });
      audio.play();
    } else {
      console.error('Track has no preview URL');
    }
  };

  const msToMinutesAndSeconds = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <Container>
      {loading ? (
        <CircularLoader />
      ) : (
        <>
          <PlaylistHeader>
            <div className="image">
              <img src={playlistInfo.image} alt="Playlist cover" />
            </div>
            <div className="details">
              <h1 className="title">{playlistInfo.name}</h1>
              {/* <p className="description">{playlistInfo.description}</p> */}
            </div>
          </PlaylistHeader>
          <TracksList>
            <HeaderRow>
              <div className="col">
                <span></span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span></span>
              </div>
              <div className="col">
                
              </div>
            </HeaderRow>
            <Tracks>
              {tracks.map((track) => (
                <TrackRow key={track.id} onClick={() => playTrack(track)}>
                  <div className="col">
                    <span>{track.index}</span>
                  </div>
                  <div className="col detail">
                    <div className="image">
                      <img src={track.image} alt={track.name} />
                    </div>
                    <div className="info">
                      <span className="name">{track.name}</span>
                      <span>{track.artists.join(', ')}</span>
                    </div>
                  </div>
                  <div className="col">
                    <span>{track.album}</span>
                  </div>
                  <div className="col">
                    <span>{msToMinutesAndSeconds(track.duration_ms)}</span>
                  </div>
                </TrackRow>
              ))}
            </Tracks>
          </TracksList>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  color:black;
  background-color:black;
  overflow-y: auto; /* Enable scrolling for the entire container */
`;

const PlaylistHeader = styled.div`
  margin: rem;
  display: flex;
  align-items: center;
  gap: 2rem;

  .image {
    img {
    margin:3rem;
      height: 15rem;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
    }
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: #e0dede;

    .title {
      color: white;
      font-size: 6rem;
    }
      .description{
      font-size:1.5rem;}
  }
`;

const TracksList = styled.div`
  margin: 0 2rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
  margin: 1rem 0 0 0;
  color: #dddcdc;
  padding: 1rem 3rem;
  transition: 0.3s ease-in-out;
  background-color: #000000dc;

  .clock{
  font-size:2rem;
  }
`;

const Tracks = styled.div`
  display: flex;
  flex-direction: column;
`;

const TrackRow = styled.div`
  padding: 0.5rem 1rem;
  display: grid;
  grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
  align-items: center;
  color: #dddcdc;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  .col {
    display: flex;
    align-items: center;
    color: #dddcdc;
    font-size:1.5rem;

    img {
      height: 60px;
      width: 60px;
    }
  }

  .detail {
    display: flex;
    gap: 1rem;
    font-size:1.5rem;

    .info {
      display: flex;
          font-size:1.5rem;

      flex-direction: column;
    }
  }
`;

const CircularLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  &::after {
    content: '';
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
`;
