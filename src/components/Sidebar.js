import React from 'react';
import { Chats } from './Chats';

export const Sidebar = () => {

    const chats = [1,2,3,4,5,6,7,8,9,10];
    return (
        <div className="inbox_chat">
            {
                chats.map( (chat) => ( 
                    <Chats key={chat} />
                ))
            }
            
            {/* <!-- Espacio extra para scroll --> */}
            <div className="extra_space"></div>
        </div>
    );
}
