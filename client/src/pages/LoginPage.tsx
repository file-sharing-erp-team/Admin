import React, { useState, useContext } from "react";
import { Button, Checkbox, Header } from "../components";
import { ButtonSize, ButtonVariant } from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input/Input";
import { useHttp } from "../utils/hooks/useHttp";
import { AuthContext } from "../utils/context/AuthContext";
import AuthService from "../utils/service/AuthService";
import { useDispatch } from "react-redux";
import { logUser } from "../redux/actions";

const LoginPage = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const { loading, error, request, clearError } = useHttp();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logIN = async () => {
    try {
      const response = await AuthService.logIn({
        email: login,
        password: password,
      });
      auth.login(
        response.data.tokens.accessToken,
        response.data.tokens.refreshToken,
        response.data.user.id,
        rememberMe
      );
      dispatch(logUser(response.data.user));
      navigate("/", { replace: true });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <>
      <div
        className="w-full h-full flex flex-col justify-center"
        style={{ alignItems: "center" }}
      >
        <div
          className="w-2/6 h-4/6 flex flex-col justify-center align-middle bg-white"
          style={{
            alignItems: "center",
            borderRadius: "34px",
            padding: "2rem 0",
          }}
        >
          <Header style={{ marginBottom: "2rem" }}>Sign In</Header>
          <Input
            placeholder={"Email"}
            onChange={(e) => setLogin(e.target.value)}
            error={!!error}
          />
          <Input
            placeholder={"Password"}
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
          />
          <Checkbox
            children={"Remember me"}
            onClick={() => {
              setRememberMe(!rememberMe);
            }}
          />
          <Button
            variant={ButtonVariant.primary}
            size={ButtonSize.large}
            style={{ marginTop: "3rem" }}
            onClick={() => logIN()}
          >
            Sign In
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
