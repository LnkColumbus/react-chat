import React, { createContext, useCallback, useContext, useState } from 'react';

import { ChatContext } from '../context/Chat/ChatContext';
import { fetchWithOutToken, fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';

export const AuthContext = createContext();

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null,
}

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(initialState);
    const { dispatch } = useContext(ChatContext);

    const login = async( email, password ) => {
        const { ok, token, usuario } = await fetchWithOutToken( 'auth/login', { email, password }, 'POST' );
        
        if (ok) {
            localStorage.setItem('token', token);
            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.name,
                email: usuario.email,
            });
        }

        return ok;
    }
    const register = async( name, email, password ) => {
        const { ok, token, usuario } = await fetchWithOutToken( 'auth/register', { name, email, password }, 'POST' );

        if (ok) {
            localStorage.setItem('token', token);
            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.name,
                email: usuario.email
            });
        }

        return ok;
    }

    const verifyToken = useCallback( async() => {
        
        const token = localStorage.getItem('token');
        if ( !token ) {
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null,
            });

            return false;
        }

        const res = await fetchWithToken('auth/renew');
        if ( res.ok ) {
            localStorage.setItem('token', res.token);
            const { usuario } = res;
            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.name,
                email: usuario.email
            });
            return true;
        } else {
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null
            });
            return false;
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({ type: types.cleanChats });
        setAuth({
            checking: false,
            logged: false,
        });
    }

    return (
        <AuthContext.Provider value={{
            auth,
            login,
            register,
            verifyToken,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
}
