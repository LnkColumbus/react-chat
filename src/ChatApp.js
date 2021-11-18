import React from 'react';
import moment from 'moment';

import { AuthProvider } from './auth/AuthContext';
import { ChatProvider } from './context/Chat/ChatContext';
import { SocketProvider } from './context/SocketContext';
import { AppRouter } from './routers/AppRouter';

import 'moment/locale/es-mx';
moment.locale('es-mx');

export const ChatApp = () => {
    return (
        <ChatProvider>
            <AuthProvider>
                <SocketProvider>
                    <AppRouter />
                </SocketProvider>
            </AuthProvider>
        </ChatProvider>
    );
}
