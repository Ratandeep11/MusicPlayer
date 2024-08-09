import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoNotifications } from 'react-icons/io5';
import { useStateProvider } from '../utils/StateProvider';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [{ userInfo }] = useStateProvider();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('Good Evening!');

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) {
      setGreeting('Good Morning!');
    } else if (hours >= 12 && hours < 18) {
      setGreeting('Good Afternoon!');
    } else if (hours >= 18 && hours < 22) {
      setGreeting('Good Evening!');
    } else {
      setGreeting('Good Night!');
    }
  }, []);

  const handleNavigate = () => {
    navigate('/profile');
  };

  return (
    <Container>
      <div className="search__bar">
        <h1>{greeting}</h1>
      </div>
      <IoNotifications className="notification-icon" />
      <div className="avatar">
        <a href="">
          <img
            className="profile-photo" 
            src={userInfo?.images?.[0]?.url || "https://i.scdn.co/image/ab67757000003b82e64f560101fa823bbd18ad1c"} 
            alt="Profile" 
            onClick={handleNavigate}
          />
        </a>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 15vh;
  position: sticky;
  background-color: #121212;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${({ navBackground }) =>
    navBackground ? 'rgba(0,0,0,0.7)' : 'none'};

  .search__bar {
    font-size: 2rem; /* Adjusted for smaller screens */
    color: #1db954; /* Spotify green */
    margin-left: 1rem; /* Adjusted for smaller screens */
  }

  .notification-icon {
    font-size: 3rem; /* Adjusted for smaller screens */
    color: white;
    margin: 0 1rem; /* Center icon with flexible spacing */
  }

  .avatar {
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      color: white;
      font-weight: bold;
    }

    .profile-photo {
      width: 50px; /* Adjusted for smaller screens */
      height: 50px; /* Adjusted for smaller screens */
      border-radius: 50%;
      object-fit: cover; /* Ensures the image covers the circular area */
      border: 2px solid #1db954; /* Optional: Add border to match Spotify green */
    }
  }

  @media (min-width: 768px) {
    .search__bar {
      font-size: 2.5rem;
      margin-left: 1.5rem;
    }

    .notification-icon {
      font-size: 3.5rem;
      margin: 0 1.5rem;
    }

    .avatar .profile-photo {
      width: 70px;
      height: 70px;
    }
  }

  @media (min-width: 1024px) {
    .search__bar {
      font-size: 3rem;
      margin-left: 2rem;
    }

    .notification-icon {
      font-size: 4rem;
      margin: 0 2rem;
      margin-left:990px;
    }

    .avatar .profile-photo {
      width: 100px;
      height: 100px;
    }
  }
`;
