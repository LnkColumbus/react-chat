import React, { useContext, useState } from 'react';

import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/Chat/ChatContext';
import { SocketContext } from '../context/SocketContext';

export const SendMessages = () => {

    const [message, setMessage] = useState('');
    const { socket } = useContext(SocketContext);
    const { auth } = useContext(AuthContext);
    const { chatState } = useContext(ChatContext);

    const onChange = ({ target }) => {
        setMessage( target.value );
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if ( message.length === 0 ) return
        setMessage('');

        //TODO: emitir un evento de socket para enviar el mensaje
        // {
        //     de: // UID del usuario enviando el mensaje
        //     para: // UID del usuario que recibe el mensaje
        //     mensaje: // lo que quiere enviar
        // }
        socket.emit('personal-message', {
            from: auth.uid,
            to: chatState.activeChat,
            message
        });

        //TODO: hacer el dispatch del mensaje...
    }

    return (
        <form onSubmit={ handleSubmit }>
            <div className="type_msg row">
                <div className="input_msg_write col-sm-9">
                    <input
                        className="write_msg"
                        onChange={ onChange }
                        placeholder="Mensaje..."
                        type="text"
                        value={ message }
                    />
                </div>
                <div className="col-sm-3 text-center">
                    <button className="msg_send_btn mt-3" type="submit">
                        Enviar
                    </button>
                </div>
            </div>
        </form>
    );
}
