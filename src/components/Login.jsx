import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loginUrl, setLoginUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token=window.localStorage.getItem('token');
  useEffect(() => {
    const clientId = "954314f355b747b0888a3ccb08aa6ed1";
    const redirectUrl = "http://localhost:3000";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
      // 'user-read-email',
      'user-read-private',
      'user-top-read',
      'user-read-recently-played'
    ];

    const url = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_dialog=true`;
    setLoginUrl(url);

    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);

  const handleClick = () => {
    if (username.length < 6) {
      alert("Username must be at least 6 characters long.");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    navigate("/home");
  };

  return (
    <Container>
      <div className="box">
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_Green.png"
          alt="Spotify Logo"
        />
        <h1 className="header">Login:</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!token && (
          <a href={loginUrl}>
            <button onClick={handleClick}>Log in</button>
          </a>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: black;
  .header {
    color: white;
    font-weight: bold;
    margin-right: 750px;
  }
  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #282828;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    height: 550px;
    width: 900px;
    img {
      height: 80px;
      width: 300px;
      margin-bottom: 2rem;
    }
    input {
      width: 90%;
      padding: 1rem;
      margin: 0.5rem 0;
      border-radius: 25px;
      border: none;
      background-color: #121212;
      color: white;
      font-size: 1.6rem;
    }
    button {
      padding: 1rem 2rem;
      margin-top: 1rem;
      border-radius: 5rem;
      border: none;
      background-color: #1db954;
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      transition: background-color 0.3s;
      &:hover {
        background-color: #1ed760;
      }
    }
  }
`;
