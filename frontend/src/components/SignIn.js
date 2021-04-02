import React, { useState, useRef } from "react";
import Form, { form } from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth-service";

const required = (value) => {
  if (!value) {
    return <div className="alert alert-danger">This field is required</div>;
  }
};

const SignIn = (props) => {
  const loginForm = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrormessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("a=", checkBtn);
    setErrormessage("");
    setLoading(true);
    loginForm.current.validateAll();
    console.log(loginForm.current);

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        (response) => {
          console.log("res=", response.roles);
          if (response.roles === "admin") {
            props.history.push("/dashboard/admin");
          } else props.history.push("/dashboard/user");

          //   window.location.reload();
          alert("login");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setErrormessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    // <div className="col-md-6">
    //   <div className="card card-container">

    <div className="container">
      <div
        className="row"
        style={{ marginLeft: "auto", marginRight: "auto", width: "60%" }}
      >
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-dark text-white">Login</div>
            <div className="card-body">
              <Form ref={loginForm} onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-primary btn-block"
                    style={{
                      background:
                        "linear-gradient(45deg, black, darkslategray)",
                      color: "white",
                    }}
                    disabled={loading}
                  >
                    {loading && (
                      // <span className="spinner-border spinner-border-sm"></span>
                      <></>
                    )}
                    <span>Login</span>
                  </button>
                </div>

                {errorMessage && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
