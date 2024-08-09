import React, { useState } from 'react';
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import styled from 'styled-components';
import Search from "./Search";
import { useStateProvider } from "../utils/StateProvider";
import { Navigate } from 'react-router-dom';

export default function SearchDashBoard() {
    const [{ isFooterVisibleSearch }] = useStateProvider();
    const [isFooterVisible, setIsFooterVisible] = useState(isFooterVisibleSearch);
    const token=window.localStorage.getItem('token');

    // Sync local state with global state
   
    if(!token){
      return <Navigate to='/' />;}
      else{
    return (
        <Container isFooterVisible={isFooterVisibleSearch}>
            <div className="spotify__body">
                <Sidebar />
                <div className="body">
                    <Search setIsFooterVisible={setIsFooterVisible} />
                </div>
            </div>
            {isFooterVisible && (
                <div className="spotify__footer">
                    <Footer />
                </div>
            )}
        </Container>
    );
}
}
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: ${({ isFooterVisible }) => (isFooterVisible ? 'calc(100vh - 12vh) 12vh' : '100vh')};

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
