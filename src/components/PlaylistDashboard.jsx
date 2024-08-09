// DashBoard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Body from "./Body";
import Footer from "./Footer";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import Home from "./Home";
import PlaylistTracks from "./PlaylistTrack";
import { useParams } from "react-router-dom";
import PlaylistTrack from "./PlaylistTrack";

export const DashBoard = ({ isPlaylist }) => {
  const [{ token, isFooterVisible }, dispatch] = useStateProvider();
  const { id } = useParams();
  const [isBool, setBool] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await axios.get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const userInfo = {
          userId: data.id,
          userName: data.display_name,
        };
        dispatch({ type: reducerCases.SET_USER, userInfo });
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        // Handle error appropriately
      }
    };
    if (token) {
      getUserInfo();
    }
  }, [dispatch, token]);

  return (
    <Container isFooterVisible={isFooterVisible}>
      <div className="spotify__body">
        <Sidebar />
        <div className="body">
          <Navbar />
          <div className="body__contents">

            <PlaylistTrack/>
          </div>
        </div>
      </div>
      {isFooterVisible && (
        <div className="spotify__footer">
          <Footer />
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: ${({ isFooterVisible }) => (isFooterVisible ? 'calc(100vh - 12vh) 12vh' : '100vh 0vh')};

  .spotify__body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgba(32, 87, 100);

    .body {
      height: 100%;
      max-height: 200vh;
      width: 100%;
      color: black;
      overflow: auto;
      background-color: rgba(32, 87, 100); /* Ensure the body has the same background color */

      &::-webkit-scrollbar {
        width: 0.7rem;

        &-thumb {
          background-color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }

  .spotify__footer {
    background-color: #fff;
    z-index: 1; /* Ensure the footer is on top */
  }
`;
