import React, { createContext, useContext, useEffect } from 'react';

import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from './Chat/ChatContext';
import { useSocket } from '../hooks/useSocket';

import { types } from '../types/types';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const { socket, online, connectSocket, disconnectSocket } = useSocket('http://localhost:8080');
    const { auth } = useContext(AuthContext);
    const { dispatch } = useContext( ChatContext );

    useEffect(() => {
        if ( auth.logged ) {
            connectSocket();
        }
    }, [ auth, connectSocket ]);

    useEffect(() => {
        if ( !auth.logged ) {
            disconnectSocket();
        }
    }, [ auth, disconnectSocket ]);

    // Escuchar los usuarios conectados
    useEffect(() => {
        socket?.on('list-users', (users) => {
            dispatch({
                type: types.loadUsers,
                payload: users
            });
        });
    }, [socket, dispatch]);

    //Escuchar los mensajes recibidos
    useEffect(() => {
        socket?.on('personal-message', (message) => {
            dispatch({
                type: types.newMessage,
                payload: message
            });

            scrollToBottomAnimated('messages');
        });
    }, [ socket, dispatch ]);
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    );
}