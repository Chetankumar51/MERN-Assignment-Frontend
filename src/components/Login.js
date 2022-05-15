import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const [isLogin, setisLogin] = useState(false);

  const navigate = useNavigate();
  const paperstyle = {
    padding: 30,
    height: "60vh",
    width: 380,
    margin: "60px auto",
  };
  const btnstyle = { marginBottom: "8px" };

  const handleChange = (e) => {
    //   console.log(e.target.value);
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  const handleClick = (event) => {
    event.preventDefault()
    if (user.email && user.password) {
    {/*  localStorage.setItem("isAuthenticated", "true"); */}
      setisLogin(true);
      localStorage.setItem("isLogin", true);
      navigate("/dashboard");
    } else {
      alert("Please login");
    }
  };

  return (
    <Grid>
      <Paper elevation={20} style={paperstyle}>
        <h1 style={{ fontWeight: "bold" }}>Sign in</h1>
        <Grid>
          <TextField
            id="outlined-basic"
            name="email"
            value={user.email}
            onChange={handleChange}
            label="Email Address"
            placeholder="enter valid email"
            variant="outlined"
            fullWidth
            required
          />{" "}
          <br /> <br />
          <TextField
            id="outlined-basic"
            name="password"
            value={user.password}
            onChange={handleChange}
            label="Password"
            placeholder="enter valid password"
            variant="outlined"
            type="password"
            fullWidth
            required
          />{" "}
          <br /> <br />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            style={btnstyle}
            onClick={handleClick}
          >
            Sign In Now
          </Button>
          <span> Dont have an account?</span>
          <span
            onClick={() => {
              navigate("/signup");
            }}
            style={{ color: "blue" }}
          >
            SingnUp
          </span>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Login;
