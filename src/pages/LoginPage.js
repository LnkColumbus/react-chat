import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { AuthContext } from '../auth/AuthContext';
import { useForm } from '../hooks/useForm';

let initState = {
    email: 'test1@test.com',
    password: '123456',
    rememberMe: false
}

export const LoginPage = () => {

    const { login } = useContext(AuthContext);
    const [ form, handleInputChange ] = useForm(initState);

    //TODO: Depurar recordar el email si marca el checkbox
    // useEffect(() => {
    //     const email = localStorage.getItem('email');
    //     if (email) {
    //         initState = {
    //             ...initState,
    //             email,
    //             rememberMe: true
    //         }
    //         reset( initState );
    //     }

    // }, []);

    const { email, password, rememberMe } = form;

    const handleLogin = async(e) => {
        e.preventDefault();

        (rememberMe)
            ? localStorage.setItem('email', email)
            : localStorage.removeItem('email');

        const ok = await login( email, password );
        if (!ok) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Verifique el usuario y contraseña',
            });
        }
    }

    const handleToggle = () => {
        const event = {
            target: {
                name: 'rememberMe',
                value: !rememberMe
            }
        }
        handleInputChange(event);
    }

    const validateLogin = () => {
        return ( email.length > 0 && password.length > 0 )
            ? true
            : false
    }

    return (
        <form
            className="login100-form validate-form flex-sb flex-w"
            onSubmit={ handleLogin }
        >
            <span className="login100-form-title mb-3">
                Chat - Ingreso
            </span>
            
            <div className="wrap-input100 validate-input mb-3">
                <input
                    className="input100"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleInputChange}
                />
                <span className="focus-input100"></span>
            </div>
            
            <div className="wrap-input100 validate-input mb-3">
                <input
                    className="input100"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleInputChange}
                />
                <span className="focus-input100"></span>
            </div>
            
            <div className="row mb-3">
                <div
                    className="col"
                    onClick={ () => handleToggle() }
                >
                    <input
                        className="input-checkbox100"
                        id="ckb1"
                        type="checkbox"
                        name="rememberMe"
                        checked={rememberMe}
                        readOnly
                    />
                    <label className="label-checkbox100">
                        Recordarme
                    </label>
                </div>

                <div className="col text-right">
                    <Link to="/auth/register" className="txt1">
                        Nueva cuenta?
                    </Link>
                </div>
            </div>

            <div className="container-login100-form-btn m-t-17">
                <button
                    className="login100-form-btn"
                    disabled={ !validateLogin() }
                    type="submit"
                >
                    Ingresar
                </button>
            </div>
		</form>
    );
}
