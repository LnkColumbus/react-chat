import React, { useContext } from 'react';

import { ChatContext } from '../context/Chat/ChatContext';

import { fetchWithToken } from '../helpers/fetch';
import { scrollToBottom } from '../helpers/scrollToBottom';
import { types } from '../types/types';

export const Chats = ({ user }) => {

    const { chatState, dispatch } = useContext(ChatContext);
    const { activeChat } = chatState;
    
    const openChat = async() => {
        dispatch({
            type: types.activeChat,
            payload: user.uid
        });

        // Cargar mensajes del chat
        const res = await fetchWithToken( `mensajes/${ user.uid }` );
        dispatch({
            type: types.loadMessages,
            payload: res.mensajes
        });

        scrollToBottom('messages');
    }

    return (
        // active_chat
        <div
            className={`chat_list ${ (user.uid === activeChat) && `active_chat` }`}
            onClick={ openChat }
        >
            <div className="chat_people">
                <div className="chat_img"> 
                    <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
                </div>
                <div className="chat_ib">
                    <h5>{ user.name }</h5>
                    {
                        ( user.status )
                            ? <span className="text-success">Online</span>
                            : <span className="text-danger">Offline</span>
                    }
                </div>
            </div>
        </div>
    );
}
