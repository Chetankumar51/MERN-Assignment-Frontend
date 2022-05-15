import {
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [regData, setregData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  //input field validation
  const [isfnameValid, setfnameisValid] = useState(true);
  const [fnameError, setfnameError] = useState(" ");

  const [islnameValid, setlnameisValid] = useState(true);
  const [lnameError, setlnameError] = useState(" ");

  const [isEmailValid, setisEmailValid] = useState(true);
  const [emailError, setemailError] = useState("");

  const [ispasswordValid, setpasswordValid] = useState();
  const [passwordError, setpasswordError] = useState();

  const handleChange = (e) => {
    setregData({ ...regData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const isValidfName = ValidatefName(regData.fname);
    const isValidlName = ValidatelName(regData.lname);
    const isEmailValid = validateEmail(regData.email);
    const isValidPassword = ValidatePassword(regData.password);

    const url = "http://localhost:3002/user/register";
    try {
      if (isValidfName && isValidlName && isEmailValid && isValidPassword) {
        let data = await axios.post(url, regData);
        alert("Registered succesfully");
        navigate("/");
      } else {
        alert("Invalid Credentials");
      }
    } catch (err) {
      alert('Already registered')
    }
    
  };

  //fname input field validation function
  const ValidatefName = (fname) => {
    // debugger
    if (fname) {
      const nameRegix = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
      if (fname.match(nameRegix)) {
        setfnameisValid(true);
        setfnameError("");
        return true;
      } else {
        setfnameisValid(false);

        setfnameError("Only character allowed ");
        return false;
      }
    } else {
      setfnameisValid(false);
      setfnameError("Name Cannot be blank");
      return false;
    }
  };
  //Lname input field validation function

  const ValidatelName = (lname) => {
    // debugger
    if (lname) {
      const nameRegix = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
      if (lname.match(nameRegix)) {
        setlnameisValid(true);
        setlnameError("");
        return true;
      } else {
        setlnameisValid(false);

        setlnameError("Only character allowed");
        return false;
      }
    } else {
      setlnameisValid(false);
      setlnameError("Name Cannot be blank");
      return false;
    }
  };
  //Email input field validation function

  const validateEmail = (email) => {
    if (email) {
      let mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (email.match(mail)) {
        setisEmailValid(true);
        setemailError("");
        return true;
      } else {
        setisEmailValid(false);
        setemailError("*Please enter valid email");
        return false;
      }
    } else {
      setisEmailValid(false);
      setemailError("*Email cannot be empty");
      return false;
    }
  };
  //Password input field validation function

  const ValidatePassword = (password) => {
    if (password) {
      let passwordCondition =
        /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

      if (password.match(passwordCondition)) {
        setpasswordValid(true);
        setpasswordError("");
        return true;
      } else {
        setpasswordValid(false);
        setpasswordError("Invalid Password");
        return false;
      }
    } else {
      setpasswordValid(false);
      setpasswordError("Password cannot be empty");
      return false;
    }
  };

  const paperstyle = {
    padding: 30,
    height: "100vh",
    width: 380,
    margin: "60px auto",
  };
  const btnstyle = { marginBottom: "8px" };

  return (
    <Grid>
      <Paper elevation={20} style={paperstyle}>
        <form>
          <h4 style={{ fontWeight: "bold", marginBottom: "1px" }}>
            Create a new account
          </h4>
          <Typography>Use your email to create a account</Typography> <br />
          <Grid>
            <TextField
              id="outlined-basic"
              label="First Name"
              placeholder="enter first name"
              variant="outlined"
              fullWidth
              required
              name="fname"
              value={regData.fname}
              onChange={handleChange}
            />{" "}
            {!isfnameValid ? (
              <span style={{ color: "Red" }}>{fnameError}</span>
            ) : (
              ""
            )}
            <br /> <br />
            <TextField
              id="outlined-basic"
              label="Last Name"
              placeholder="enter last name"
              variant="outlined"
              fullWidth
              required
              name="lname"
              value={regData.lname}
              onChange={handleChange}
            />{" "}
            {!islnameValid ? (
              <span style={{ color: "Red" }}>{lnameError}</span>
            ) : (
              ""
            )}
            <br /> <br />
            <TextField
              id="outlined-basic"
              label="Email Address"
              placeholder="enter valid email"
              variant="outlined"
              fullWidth
              required
              name="email"
              value={regData.email}
              onChange={handleChange}
            />{" "}
            {!isEmailValid ? (
              <span
                style={{
                  color: "red",
                }}
              >
                {emailError}
              </span>
            ) : null}
            <br /> <br />
            <TextField
              id="outlined-basic"
              label="Password"
              placeholder="enter valid password"
              variant="outlined"
              type="password"
              fullWidth
              required
              name="password"
              value={regData.password}
              onChange={handleChange}
            />{" "}
            {!ispasswordValid ? (
              <span style={{ color: "red" }}>{passwordError}</span>
            ) : (
              ""
            )}
            <br /> <br />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              style={btnstyle}
              onClick={(e) => {
                handleRegister(e);
              }}
            >
              Sign Up Now
            </Button>
            <span> Have an account?</span>
            <span
              onClick={() => {
                navigate("/");
              }}
              style={{ color: "blue" }}
            >
              SingIn
            </span>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default SignUp;
