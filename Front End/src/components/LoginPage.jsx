import React, { useState } from "react";
import "./RegisterationForm.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setloggedIn] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [val, setVal] = useState(false);
  const handleLogin = async (e) => {
    if (email && password) {
      const payload = {
        Email: email,
        Password: password,
      };

      await axios
        .post("http://localhost:8800/login", payload)
        .then(function (response) {
          // handle success
          console.log(response);

          if (response.data.isLoggedIn) {
            localStorage.setItem("isLoggedIn", response.data.isLoggedIn);

            navigate("/viewUsers");
          } else {
            setFail(true);
            setTimeout(() => {
              setFail(false);
            }, 3000);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } else {
      setVal(true);
      setTimeout(() => {
        setVal(false);
      }, 3000);
    }
  };

  return (
    <div className="main">
      <h1>Login</h1>
      {success ? (
        <Alert key="success" variant="success">
          Login successful
        </Alert>
      ) : (
        ""
      )}
      {fail ? (
        <Alert key="danger" variant="danger">
          Login Failed
        </Alert>
      ) : (
        ""
      )}
      {val ? (
        <Alert key="danger" variant="danger">
          Empty Fields
        </Alert>
      ) : (
        ""
      )}
      <Form className="form">
        <Form.Control
          className="mb-3 inputField"
          size="md"
          type="email"
          placeholder="Email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Form.Control
          className="mb-3 inputField"
          size="md"
          type="password"
          placeholder="Password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
        <Link to="/registeration">
          <Button variant="primary" className="navButton">
            Register
          </Button>
        </Link>
      </Form>
    </div>
  );
};

export default LoginPage;
