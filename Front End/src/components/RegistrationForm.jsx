import React, { useEffect, useState } from "react";
import "./RegisterationForm.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [dob, setDob] = useState("");
  const [areaOfInterest, setAreaOfInterest] = useState([]);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [val, setVal] = useState(false);
  const handleAddUser = async () => {
    if (
      firstName &&
      lastName &&
      gender &&
      dob &&
      city &&
      zipCode &&
      country &&
      state &&
      areaOfInterest &&
      email &&
      password
    ) {
      const payload = {
        First_Name: firstName,
        Last_Name: lastName,
        Gender: gender,
        DOB: dob,
        City: city,
        Zip_Code: zipCode,
        Country: country,
        State: state,
        Area_Of_Interest: areaOfInterest.join(","),
        Email: email,
        Password: password,
      };

      await axios
        .post("http://localhost:8800/adduser", payload, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          // handle success
          console.log(response);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 5000);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          setFail(true);
          setTimeout(() => {
            setFail(false);
          }, 5000);
        });
    } else {
      setVal(true);
      setTimeout(() => {
        setFail(false);
      }, 3000);
    }
  };

  const handleAreaOfInterest = (event) => {
    const { checked, value } = event.target;
    let updatedInterest = [...areaOfInterest];
    if (checked) {
      updatedInterest = [...areaOfInterest, value];
    } else {
      updatedInterest.splice(areaOfInterest.indexOf(value), 1);
    }
    setAreaOfInterest(updatedInterest);
  };

  useEffect(() => {
    console.table(areaOfInterest);
  }, [areaOfInterest]);

  return (
    <div className="main">
      <h1>Register</h1>
      {success ? (
        <Alert key="success" variant="success">
          Registration successful
        </Alert>
      ) : (
        ""
      )}
      {fail ? (
        <Alert key="danger" variant="danger">
          Registration Failed
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
          type="text"
          placeholder="First Name"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <Form.Control
          className="mb-3 inputField"
          size="md"
          type="text"
          placeholder="Last Name"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <div className="gender">
          <label className="lab">Gender</label>
          {["radio"].map((type) => (
            <>
              <Form.Check
                key={"Male"}
                inline
                label="Male"
                value={"Male"}
                onChange={(e) => setGender(e.target.value)}
                name="group1"
                type={type}
                id={`inline-${type}-1`}
              />
              <Form.Check
                key={"Female"}
                inline
                label="Female"
                value={"Female"}
                name="group1"
                onChange={(e) => setGender(e.target.value)}
                type={type}
                id={`inline-${type}-2`}
              />
            </>
          ))}
        </div>
        <label className="lab">Date Of Birth</label>
        <Form.Control
          className="mb-3 inputField"
          size="md"
          type="date"
          placeholder="Date Of Birth"
          onChange={(e) => {
            console.log(e);
            setDob(e.target.value);
          }}
        />
        <Form.Control
          className="mb-3 inputField"
          size="md"
          type="text"
          placeholder="City"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <Form.Control
          className="mb-3 inputField"
          size="ms"
          type="text"
          placeholder="Zip Code"
          onChange={(e) => {
            setZipCode(e.target.value);
          }}
        />
        <Form.Select
          className="mb-3 inputField"
          size="md"
          aria-label="Floating label select example"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        >
          <option>Select Country</option>
          <option value="USA">USA</option>
          <option value="India">India</option>
          <option value="France">France</option>
        </Form.Select>
        <Form.Select
          className="mb-3 inputField"
          size="md"
          aria-label="Floating label select example"
          onChange={(e) => {
            setState(e.target.value);
          }}
        >
          <option>Select State</option>
          <option value="PB">Punjab</option>
          <option value="HR">Haryana</option>
          <option value="HP">HP</option>
        </Form.Select>
        <div>
          <label className="lab">Area of Interest</label>
          {["checkbox"].map((type) => (
            <div key={`inline-${type}`} className="mb-3 inputField">
              <Form.Check
                key={"Reading"}
                inline
                label="Reading"
                name="group1"
                type={type}
                id={`inline-${type}-1`}
                value={"Reading"}
                onChange={(event) => handleAreaOfInterest(event)}
              />
              <Form.Check
                key={"Writing"}
                inline
                label="Writing"
                name="group1"
                type={type}
                value={"Writing"}
                id={`inline-${type}-2`}
                onChange={(event) => handleAreaOfInterest(event)}
              />
              <Form.Check
                key={"Traveling"}
                inline
                label="Traveling"
                name="group1"
                type={type}
                value={"Traveling"}
                id={`inline-${type}-2`}
                onChange={(event) => handleAreaOfInterest(event)}
              />
              <Form.Check
                key={"Playing"}
                inline
                label="Playing"
                name="group1"
                type={type}
                value={"Playing"}
                id={`inline-${type}-2`}
                onChange={(event) => handleAreaOfInterest(event)}
              />
            </div>
          ))}
        </div>
        {/* <label className="lab">Upload Image</label>
        <Form.Group controlId="formFileSm" className="mb-3">
          <Form.Control type="file" size="md" />
        </Form.Group> */}
        <Form.Control
          className="mb-3 inputField"
          size="md"
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Form.Control
          className="mb-3 inputField"
          size="md"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button variant="primary" onClick={handleAddUser}>
          Register
        </Button>
        <Link to="/">
          <Button variant="primary" className="navButton">
            Sign in
          </Button>
        </Link>
      </Form>
    </div>
  );
};

export default RegistrationForm;
