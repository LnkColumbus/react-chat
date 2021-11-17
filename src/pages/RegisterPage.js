import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { AuthContext } from '../auth/AuthContext';
import { useForm } from '../hooks/useForm';

export const RegisterPage = () => {

    const { register } = useContext(AuthContext);
    const [ form, handleInputChange ] = useForm({
        name: 'Mercedez',
        email: 'mercedez@gmail.com',
        password: '123456',
    });

    const { name, email, password } = form;

    const handleRegister = async(e) => {
        e.preventDefault();

        const ok = await register( name, email, password );

        if (!ok) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Verifique el usuario y contraseña',
            });
        }
    }

    const validateRegister = () => {
        return (
            name.length > 0 &&
            email.length > 0 &&
            password.length > 0
        ) ? true
          : false
    }

    return (
        <form
            className="login100-form validate-form flex-sb flex-w"
            onSubmit={ handleRegister }
        >
            <span className="login100-form-title mb-3">
                Chat - Registro
            </span>

            <div className="wrap-input100 validate-input mb-3">
                <input
                    className="input100"
                    name="name"
                    onChange={handleInputChange}
                    placeholder="Nombre"
                    type="text"
                    value={name}
                />
                <span className="focus-input100"></span>
            </div>

            
            <div className="wrap-input100 validate-input mb-3">
                <input
                    className="input100"
                    name="email"
                    onChange={handleInputChange}
                    placeholder="Email"
                    type="email"
                    value={email}
                />
                <span className="focus-input100"></span>
            </div>
            
            <div className="wrap-input100 validate-input mb-3">
                <input
                    className="input100"
                    name="password"
                    onChange={handleInputChange}
                    placeholder="Password"
                    type="password"
                    value={password}
                />
                <span className="focus-input100"></span>
            </div>
            
            <div className="row mb-3">
                <div className="col text-right">
                    <Link to="/auth/login" className="txt1">
                        Ya tienes cuenta?
                    </Link>
                </div>
            </div>

            <div className="container-login100-form-btn m-t-17">
                <button
                    className="login100-form-btn"
                    disabled={ !validateRegister() }
                    type="submit"
                >
                    Crear cuenta
                </button>
            </div>
		</form>
    );
}
