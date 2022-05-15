import React from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-2"
          style={{ backgroundColor: "black",  height: "100vh",margin:0 }}
        >
        <Paper >Dashboard</Paper>
      <Button sx={{color:"green"}}
      onClick={handleLogout}
      >Logout</Button>
        </div>
        <div className="col-10 " style={{padding:"20vw"}}>
        <h1>This is simple Dashboard</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
