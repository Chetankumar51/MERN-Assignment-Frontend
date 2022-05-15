import { Button, Grid, Paper, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
//input field validation
  const [isEmailValid, setisEmailValid] = useState(true)
  const [emailError, setemailError] = useState('')
  const [ispasswordValid, setpasswordValid] = useState();
  const [passwordError, setpasswordError] = useState();

  const handleChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const isEmailValid = validateEmail(user.email)
    const isValidPassword = ValidatePassword(user.password);

    try {
      const url = "http://localhost:3002/user/login";
     let data= await axios.post(url, user);
     console.log("Data",data.data.message);//Data Login Successfully
      localStorage.setItem('login',true)
      if(data.data.message==="Login Successfully"){
        
        alert("Login Successfull");
        navigate("/dashboard");
      }
      else{
        alert("Invalid user ID")
        navigate("/")
      }
    } catch (err) {
      console.log(err.message);
    }
  };
//email input field validation function 
  const validateEmail = (email) => {
    if (email) {
        let mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(mail)) {
            setisEmailValid(true)
            setemailError('')
            return true
        } else {
            setisEmailValid(false)
            setemailError('*Please enter valid email')
            return false
        }
    } else {
        setisEmailValid(false)
        setemailError('*Email cannot be empty')
        return false
    }
  }
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
    height: "65vh",
    width: 380,
    margin: "60px auto",
  };
  const btnstyle = { marginBottom: "8px" };
  return (
    <Grid>
      <Paper elevation={20} style={paperstyle}>
        <form>
          <h1 style={{ fontWeight: "bold", marginBottom: "25px" }}>Sign In</h1>

          <Grid>
            <TextField
              id="outlined-basic"
              label="Email Address"
              placeholder="enter valid email"
              variant="outlined"
              fullWidth
              required
              name="email"
              value={user.email}
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
              value={user.password}
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
                handleLogin(e);
              }}
            >
              Sign In Now
            </Button>
            <span>Dont have an account?</span>
            <span
              onClick={() => {
                navigate("/signup");
              }}
              style={{ color: "blue" }}
            >
              SignUp
            </span>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default SignIn;
