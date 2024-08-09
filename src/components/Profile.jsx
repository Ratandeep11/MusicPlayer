import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useStateProvider } from '../utils/StateProvider';

export default function Profile() {
    const [profile, setProfile] = useState({});
    const token = window.localStorage.getItem('token');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    'https://api.spotify.com/v1/me',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                console.log(response);
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        if (token) {
            fetchProfile();
        }
    }, [token]);
    const handleButtonClick = () => {
      window.open('https://open.spotify.com');
    };
    return (
      <>
      <Heading>
        <h1>Profile</h1>
        </Heading>
        <ProfileContainer>

            <ProfileContent>
                {profile.images && profile.images.length > 0 && (
                    <ProfileImage src={profile.images[1].url} alt={profile.display_name} />
                  
                )}
                <ProfileInfo>
                    <h2>{profile.display_name}</h2>
                    <p>{profile.email}</p>
                   <button className='button1' onClick={handleButtonClick}>
      Open In Spotify
    </button>
                </ProfileInfo>
            </ProfileContent>
        </ProfileContainer>

        </>
    );
}
const Heading=styled.div`
color:white;
margin-left:100px;
h1{
font-family:Raleway;
font-size:3rem;
margin-left:50px;
}
`
const ProfileContainer = styled.div`
    display: flex;
    // justify-content: center;
    // align-items: center;
    height: 100vh;
    background-color: #282828;
    color: #ffffff;
    .h1{

    }

    z-index:1;
    margin-right:36px;
`;

const ProfileContent = styled.div`
    display: flex;
    align-items: center;
    background-color: #282828;
    padding: 2rem;
    border-radius: 10px;
    
    z-index:1;

`;

const ProfileImage = styled.img`
    width:400px;
    border-radius: 60%;
    object-fit: cover;
    margin-right: 2rem;
    height:400px;
    margin-bottom:750px;
    padding:30px;
   
`;

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom:800px;
    h2 {
        font-size: 2.3rem;
        font-family:Raleway;
        margin: 0;
        font-weight:600px;
        height:56px;
        width:431px;
    }
     .button1{
    color:white;
    background-color:#1db954;
    border-radius:40px;
    width:180px;
    height:60px;
    font-size:1.2rem;
    margin:30px;
    pointer:cursor;

  &:hover {
    background-color: #1ed760; /* Lighter Spotify green */
  }

  &:focus {
    outline: none;
  }
    
    }
    p {
        font-size: 1.9rem;
        color: #b3b3b3;
        margin: 0.5rem 0 0 0;
         font-family:Raleway;
    }
`;
