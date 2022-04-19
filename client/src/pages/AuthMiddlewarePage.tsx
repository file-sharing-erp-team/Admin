import React, { useContext, useEffect } from "react";
import { Loader } from "../components";
import { useDispatch } from "react-redux";
import AuthService from "../utils/service/AuthService";
import { logUser } from "../store/actions";
import { AuthContext } from "../utils/context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

type Props = {
    path: string;
};

const AuthMiddlewarePage = (props: Props) => {
    const dispatch = useDispatch();
    const cookies = Cookies.get("refreshToken");
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const init = async () => {
            if (Cookies.get("refreshToken") !== undefined) {
                const response = await AuthService.refresh().then((resp) => {
                    if (resp.status === 401)
                        return setTimeout(() => {
                            navigate("/login", { replace: true });
                        }, 1);
                    else {
                        auth.login(
                            resp.data.tokens.accessToken,
                            resp.data.tokens.refreshToken,
                            resp.data.user.id,
                        );
                        dispatch(logUser(resp.data.user) as any);
                    }
                });
                if (params.hasOwnProperty("id")) {
                    const stringArr = props.path.split("/");
                    stringArr.pop();
                    let path = "";
                    for (let i = 0; i < stringArr.length; i++) path += stringArr[i] + "/";
                    path += params.id;
                    return navigate(path);
                }
                return navigate(props.path);
            } else {
                return setTimeout(() => {
                    navigate("/login", { replace: true });
                }, 1);
            }
        };
        init();
    }, []);

    return (
        <>
            <Loader isLoading={true} />
        </>
    );
};

export default AuthMiddlewarePage;