import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoLibrary } from 'react-icons/io5';
import { MdHomeFilled, MdSearch } from 'react-icons/md';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStateProvider } from '../utils/StateProvider';
import { reducerCases } from "../utils/Constants";

export default function Sidebar() {
  const [{ token, audio }, dispatch] = useStateProvider();
  const [activeItem, setActiveItem] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Determine the active item based on the current path
    switch (location.pathname) {
      case '/home':
        setActiveItem('home');
        break;
      case '/profile':
        setActiveItem('profile');
        break;
      case '/search':
        setActiveItem('search');
        break;
      case '/playlist':
        setActiveItem('playlist');
        break;
      default:
        setActiveItem('');
    }
  }, [location]);

  const handleNavigate = () => {
    navigate('/home');
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const handleLogout = () => {
    if (audio) audio.pause();
    dispatch({ type: reducerCases.SET_TOKEN, token: null });
    navigate('/');
    window.localStorage.removeItem('token');
  };

  return (
    <Container>
      <div className="top__links">
        <div className="logo">
          <img
            onClick={handleNavigate}
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_Green.png"
            alt="Spotify Logo"
            className="spotify-logo"
          />
        </div>
        <ul>
          <li className={activeItem === 'home' ? 'active' : ''} onClick={() => handleItemClick('home')}>
            <MdHomeFilled className='logo12' />
            <Link to="/home"><span>Home</span></Link>
          </li>
          <li className={activeItem === 'profile' ? 'active' : ''} onClick={() => handleItemClick('profile')}>
            <FaUser className='logo12' />
            <Link to="/profile"><span>Profile</span></Link>
          </li>
          <li className={activeItem === 'search' ? 'active' : ''} onClick={() => handleItemClick('search')}>
            <MdSearch className='logo12' />
            <Link to="/search"><span>Search</span></Link>
          </li>
          <li className={activeItem === 'playlist' ? 'active' : ''} onClick={() => handleItemClick('playlist')}>
            <IoLibrary className='logo12' />
            <Link to="/playlist"><span>Featured Playlist</span></Link>
          </li>
        </ul>
      </div>
      <div className="bottom__links">
        <li className={activeItem === 'logout' ? 'active' : ''} onClick={() => handleItemClick('logout')}>
          <FaSignOutAlt className='logo12' />
          <Link to="/" className="logout-button" onClick={handleLogout}><span>Logout</span></Link>
        </li>
      </div>
    </Container>
  );
}

const Container = styled.div`
  background-color: #1db954; /* Spotify green */
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  font-size: 2rem;

  .spotify-logo {
    margin-top: 75px;
    max-inline-size: 80%;
    block-size: auto;
    filter: brightness(0) invert(1); /* Makes the logo white */
  }

  .top__links {
    display: flex;
    flex-direction: column;

    .logo {
      text-align: center;
      margin: 1rem 0;

      img {
        max-inline-size: 80%;
        block-size: auto;
      }
    }

    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      // margin-right:5rem;
      margin:1rem;
      font-size: 2rem;
      .logo12 {
        font-size: 40px;
      }

li {
  display: flex;
  align-items: center; /* Ensure the content is centered vertically */
  gap: 1rem;
  color: white;
  border-radius: 0 50px 50px 0; /* Apply circular shape only to the right side */
  cursor: pointer;
  font-size: 2rem;
  font-weight: bold;
  padding: 10px 20px; /* Adjust padding for better appearance */
  margin-left: -30px;
  transition: all 0.3s ease; /* Smooth transition for hover effect */
width:100%;
  &.active, &:hover {
    background-color: white;
    color: #1db954; /* Spotify green */
    border-radius: 0 50px 50px 0; /* Ensure active and hover states have the same border-radius */
    padding-right: 40px; /* Extend padding on the right to create a circular effect */
  }

  svg {
    font-size: 1.6rem; /* Adjust icon size if needed */
  }

  a {
    text-decoration: none;
    color: inherit; /* Ensures the link text inherits the color of the parent li */
  }
}
    }
  }

  .bottom__links {
    margin-top: auto;
    padding: 1rem;
    margin-bottom: 0px;
    color: white;

    .logout-button {
      color: white;
      text-decoration: none;
      font-size: 35px;
    }

    li {
      display: flex;
      align-items: center;
      gap: 1rem;
      color: white;
      cursor: pointer;
      font-size: 1.5rem;
        border-radius: 0 50px 50px 0; /* Apply circular shape only to the right side */
      width:100%;
      font-weight: bold;
      padding: 10px;
      border-radius: 20px; /* Capsule shape */
      transition: 0.3s ease-in-out;

      &:hover {
            width:100%;
        margin-right:1rem;
        background-color: white;
        color: #1db954; /* Spotify green */
          border-radius: 0 50px 50px 0; /* Apply circular shape only to the right side */

        .logout-button {
          color: #1db954; /* Spotify green */
        }
      }

      svg {
        font-size: 1.6rem; /* Adjust icon size if needed */
      }

      span {
        color: inherit;
      }

      .logo12 {
        font-size: 45px;
      }
    }
  }
`;
