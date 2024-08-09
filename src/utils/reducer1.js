import { reducerCases } from "./Constants";

export const initialState = {
    token: null,
    playlists: [],
    userInfo: null,
    selectedPlaylistId: '1remTq4J0liHtJgkuHtjB5',
    selectedPlaylist: null,
    currentlyPlaying: null,
    playerState: false,
    songPlaying: false,
    isFooterVisible: false,
    isFooterVisibleSearch: false,
    audio: new Audio(),
    currentTrackIndex: 0, // Index of the current track
    tracks: [], // Array of track objects
}

const reducer = (state, action) => {
    switch (action.type) {
        case reducerCases.SET_TOKEN: {
            return {
                ...state,
                token: action.token,
            }
        }
        case reducerCases.SET_PLAYLISTS: {
            return {
                ...state,
                playlists: action.playlists,
            }
        }
        case reducerCases.SET_USER: {
            return {
                ...state,
                userInfo: action.userInfo,
            }
        }
        case reducerCases.SET_PLAYLIST: {
            return {
                ...state,
                selectedPlaylist: action.selectedPlaylist,
            }
        }
        case reducerCases.SET_PLAYING: {
            return {
                ...state,
                currentlyPlaying: action.currentlyPlaying,
            }
        }
        case reducerCases.SET_PLAYER_STATE: {
            return {
                ...state,
                playerState: action.playerState,
            }
        }
        case reducerCases.SET_PLAYLIST_ID: {
            return {
                ...state,
                selectedPlaylistId: action.selectedPlaylistId,
            }
        }
        case reducerCases.SONG_PLAYING: {
            return {
                ...state,
                songPlaying: action.songPlaying,
            }
        }
        case reducerCases.SET_FOOTER_VISIBILITY: {
            return {
                ...state,
                isFooterVisible: action.isFooterVisible,
            }
        }
        case reducerCases.SET_SEARCH_FOOTER: {
            return {
                ...state,
                // isFooterVisible: action.isFooterVisibleSearch,
            }
        }
        case reducerCases.SET_AUDIO: {
            return {
                ...state,
                audio: action.audio,
            }
        }
        case reducerCases.SET_TRACKS: {
            return {
                ...state,
                tracks: action.tracks,
            }
        }
        case reducerCases.SET_CURRENT_TRACK_INDEX: {
            return {
                ...state,
                currentTrackIndex: action.index,
            }
        }
        default:
            return state;
    }
};

export default reducer;
