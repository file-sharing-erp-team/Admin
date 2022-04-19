import React, {useContext, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/context/AuthContext";
import AuthService from "../utils/service/AuthService";
import {useHttp} from "../utils/hooks/useHttp";
import {logUser} from "../store/actions";
import {useDispatch} from "react-redux";

const LoginPage: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, request, clearError } = useHttp();
    const auth = useContext(AuthContext);

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const login = async () => {
        try {
            const response = await AuthService.login({
                email: email,
                password: password,
            });
            auth.login(
                response.data.tokens.accessToken,
                response.data.tokens.refreshToken,
                response.data.user.id,
            );
            dispatch(logUser(response.data.user) as any);
            navigate("/about", { replace: true });
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    return (
        <div className="container">
                {/* Карточка */}
                <div className="login-box white">
                    <div className="card-content">
                        <span className="card-title tc">
                            <h4>Авторизуйтесь</h4>
                        </span>
                    </div>

                    <div className="card-action">

                        {/* Почта */}
                        <div className="input-field mt2 ">
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                id="email"
                                placeholder="Введите email"
                            />
                            <label htmlFor="email" className="active"/>
                        </div>

                        {/* Пароль */}
                        <div className="input-field mt2">
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                id="password"
                                placeholder="Введите пароль"
                            />
                            <label htmlFor="password" className="active"/>
                        </div>

                        {/* Кнопка авторизоваться */}
                        <button className="btn indigo accent-4"
                                onClick={() => login()}
                        >
                            Войти
                        </button>
                    </div>
                </div>
            </div>
    );
};

export default LoginPage;
