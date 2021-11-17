import React, { createContext, useCallback, useState } from 'react';
import { fetchWithOutToken, fetchWithToken } from '../helpers/fetch';

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

    const login = async( email, password ) => {
        const { ok, token, usuario } = await fetchWithOutToken( 'login', { email, password }, 'POST' );
        
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
        const { ok, token, usuario } = await fetchWithOutToken( 'register', { name, email, password }, 'POST' );

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

        const res = await fetchWithToken('renew');
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
