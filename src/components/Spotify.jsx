
import React,{useEffect} from "react"
import axios from "axios";
import{reducerCases} from "../utils/Constants"

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Body from "./Body";
import Footer from "./Footer";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
export const Spotify=()=>{
    const [{ token}, dispatch ] = useStateProvider();
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
    }      // Handle error appropriately

  };
  if (token) {
    getUserInfo();
  }
}, [dispatch, token]);
console.log(token);

return(
    <Container>
<div className="spotify__body">
    <Sidebar/>
    <div className="body">

        <div className="body__contents">
        <Body/>

        </div>
        
    </div>
</div>
<div className="spotify__footer">
<Footer/>
</div>
</Container>

);
}
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  // grid-template-rows: ${({ isFooterVisible }) => (isFooterVisible ? 'calc(100vh - 12vh) 12vh' : '100vh')};

  .spotify__body {
    display: grid;
    grid-template-columns: 18vw 82vw;
    // background-color: rgba(32, 87, 100);
    background-color:black;
    overflow: hidden;
    width: 100%;
    height: 100%;

    .body {
      height: 100%;
      width: 100%;
      overflow: auto;
    background-color:black;
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
    position: sticky; /* Ensure the footer stays at the bottom when visible */
    bottom: 0;
    width: 100%;
  }
`;
