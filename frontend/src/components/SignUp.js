import React, { useState, useRef } from "react";
import { Redirect, Route } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth-service";
import { isEmail } from "validator";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required !
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const SignUp = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    // form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(
        username,
        email,
        password,
        firstname,
        lastname,
        hobbies
      ).then(
        (response) => {
          console.log("res=", response);
          setMessage(response.data.message);
          setSuccessful(false);
          alert("Signu");

          if (response.roles === "admin") {
            return props.history.push("/dashboard/admin");
          } else return props.history.push("/dashboard/user");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="container">
      <div
        className="row"
        style={{ marginLeft: "auto", marginRight: "auto", width: "60%" }}
      >
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-dark text-white">Login</div>
            <div className="card-body">
              <Form onSubmit={handleRegister}>
                {!successful && (
                  <div>
                    <div className="form-group">
                      <label htmlFor="firstname">First Name</label>
                      <Input
                        type="text"
                        className="form-control"
                        name={firstname}
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        validations={[required]}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastname">lastname</label>
                      <Input
                        type="text"
                        className="form-control"
                        name={lastname}
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        validations={[required]}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <Input
                        type="text"
                        className="form-control"
                        name={username}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        validations={[required]}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Input
                        type="text"
                        className="form-control"
                        name={email}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        validations={[required, validEmail]}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <Input
                        type="text"
                        className="form-control"
                        name={password}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        validations={[required]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="hobbies">Hobbies</label>
                      <Input
                        type="text"
                        className="form-control"
                        name={hobbies}
                        value={hobbies}
                        onChange={(e) => setHobbies(e.target.value)}
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
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                )}
                {message && (
                  <div className="form-group">
                    <div
                      className={
                        successful ? "alert alert-success" : "alert alert"
                      }
                    >
                      {message}
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

export default SignUp;
