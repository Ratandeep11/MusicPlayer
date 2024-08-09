import React from 'react'
import Sidebar from "./Sidebar";
import styled from "styled-components";
import Profile from './Profile';
import { Navigate } from 'react-router-dom';

export default function ProfileDashBoard() {
const token=window.localStorage.getItem('token');
    if(!token){
        return <Navigate to='/' />;}
        else{
    return(
        <Container>
    <div className="spotify__body">
        <Sidebar/>
        <div className="body">
        
    
            <div className="body__contents">
            <Profile/>
    
            </div>
            
        </div>
    </div>
    <div className="spotify__footer">
    {/* <Footer/> */}
    </div>
    </Container>
    
    );
    }
}
    const Container = styled.div`
    max-width:100vw;
    max-height:100vh;
    overflow:hidden;
    display :grid;
    grid-template-rows: 100vh 0vh;
    .spotify__body{
    display:grid;
    grid-template-columns:18vw 82vw;
    height:100%;
    width:100%;
    background:linear-gradient(transparent,rgba(0,0,0,1));
    background-color:#282828;
    .body{
    height:100%;
    width:100%;
    overflow:auto;
          &::-webkit-scrollbar{
          width:0.7rem;
            &-thumb{
              background-color:rgba(255,255,255,0.6);
          }
          }
    }
    }
    
    
    `;