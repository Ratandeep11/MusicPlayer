import React, { useState } from 'react';
import axios from 'axios';
import { useStateProvider } from "../utils/StateProvider";
import styled from 'styled-components';
import { reducerCases } from '../utils/Constants';

export default function Search({ setIsFooterVisible }) {
  const [{  audio }, dispatch] = useStateProvider();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const token = window.localStorage.getItem('token');

  const searchSpotify = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const response = await axios.get(`https://api.spotify.com/v1/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: query,
          type: 'track,playlist',
        },
      });

      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error.response ? error.response.data : error.message);
    }
  };

  const playTrack = (track) => {
    try {
      if (audio) {
        audio.pause();
        dispatch({ type: reducerCases.SET_AUDIO, audio: null });
        setIsFooterVisible(false); // Hide footer when stopping a track
      }

      if (track.preview_url) {
        const newAudio = new Audio(track.preview_url);
        newAudio.play();
        dispatch({ type: reducerCases.SET_AUDIO, audio: newAudio });
        setIsFooterVisible(true); // Show footer when a track is playing

        const currentlyPlaying = {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          image: track.album.images[2]?.url,
          preview_url: track.preview_url
        };
        console.log(currentlyPlaying.artist)
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
        dispatch({ type: reducerCases.SET_SEARCH_FOOTER, isFooterVisibleSearch: true });
      } else {
        console.error('No preview URL available for this track');
      }
    } catch (error) {
      console.error('Error playing track:', error.message);
    }
  };

  const { tracks, playlists } = results;

  return (
    <Container>
      <form onSubmit={searchSpotify}>
        <input
          type="text"
          placeholder="Search for artists, music and genres..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      {results.tracks && (
        <>
          <TopResults>
            <h2>Top results</h2>
            {playlists.items.length > 0 && (
              <div className="top-result">
                <img src={playlists.items[0].images[0].url} alt={playlists.items[0].name} />
                <div className="top-result-info">
                  <div className="top-result-name">{playlists.items[0].name}</div>
                </div>
              </div>
            )}
          </TopResults>
          <Songs>
            <h2>Songs</h2>
            {tracks.items.map(track => (
              <div key={track.id} className="track" onClick={() => playTrack(track)}>
                <img src={track.album.images[2]?.url} alt={track.name} />
                <div>
                  <div>{track.name}</div>
                  <div>{track.artists.map(artist => artist.name).join(', ')}</div>
                </div>
                <div className="track-duration">{(track.duration_ms / 60000).toFixed(2)}</div>
              </div>
            ))}
          </Songs>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  background-color: black;
  form {
    display: flex;
    input {
      flex: 1;
      padding: 0.5rem;
      margin-right: 1rem;
      border: none;
      border-radius: 2rem;
      font-size: 2rem;
      width: 300px;
      height: 50px;
      background-color: #282828;
      color: #fff;
      &::placeholder {
        color: #999;
      }
    }
  }
`;

const TopResults = styled.div`
  margin-top: 2rem;
  h2 {
    color: #fff;
    margin-bottom: 1rem;
    font-size: 2rem;
  }
  .top-result {
    display: flex;
    align-items: center;
    font-size: 2rem;
    img {
      width: 200px;
      height: 200px;
      border-radius: 8px;
      margin-right: 1rem;
    }
    .top-result-info {
      .top-result-name {
        color: #fff;
        font-size: 3rem;
        font-weight: bold;
      }
    }
  }
`;

const Songs = styled.div`
  margin-top: 2rem;
  h2 {
    color: #fff;
    margin-bottom: 1rem;
  }
  .track {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    cursor: pointer;
    font-size: 1.5rem;
    img {
      width: 50px;
      height: 50px;
      margin-right: 1rem;
      border-radius: 8px;
    }
    div {
      display: flex;
      flex-direction: column;
      color: #fff;
      div:first-child {
        font-weight: bold;
      }
    }
    .track-duration {
      margin-left: auto;
      margin-right: 1rem;
      color: #999;
    }
    .play-icon {
      color: #1db954;
    }
  }
  max-height: 600px; /* Adjust height as needed */
  overflow-y: auto;
`;
