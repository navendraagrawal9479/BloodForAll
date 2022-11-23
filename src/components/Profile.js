import { Box, Typography } from "@material-ui/core";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";

const Profile = ({ users }) => {
  const [userData,setUserData] = useState({});
  let {user} = useSelector(state=>state.auth)

  useEffect(()=>{
    const userId = localStorage.getItem("userId");

    if(!user){
      const user = users.find((u) => {
        return u.userId === userId;
      });
      setUserData(user)
    }else{
      setUserData(user)
    }
    
  })

  console.log("profile", user);

  const date = userData?.lastDonated;
  if (date) {
    var dob = new Date(date);
    var dobArr = dob.toDateString().split(" ");
    var dobFormat = dobArr[2] + " " + dobArr[1] + " " + dobArr[3];
  }

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "10px",
          padding: "10px 0",
        }}
      >
        <Typography
          variant="h5"
          style={{ fontWeight: "bold", margin: "1rem 0" }}
        >
          Your Details
        </Typography>
        <Stack
          direction="column"
          gap={2}
          sx={{
            border: "2px solid gray",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <Typography>
            <span style={{ color: "gray", fontWeight: "bold" }}>Name: </span>
            <span>{userData?.name}</span>
          </Typography>
          <Typography>
            <span style={{ color: "gray", fontWeight: "bold" }}>
              Email ID:{" "}
            </span>
            <span>{userData?.email}</span>
          </Typography>
          <Typography>
            <span style={{ color: "gray", fontWeight: "bold" }}>
              Phone Number:{" "}
            </span>
            <span>{userData?.phone}</span>
          </Typography>
          <Typography>
            <span style={{ color: "gray", fontWeight: "bold" }}>
              Blood Group:{" "}
            </span>
            <span>{userData?.bloodGroup}</span>
          </Typography>
          <Typography>
            <span style={{ color: "gray", fontWeight: "bold" }}>Gender: </span>
            <span>{userData?.gender}</span>
          </Typography>
          <Typography>
            <span style={{ color: "gray", fontWeight: "bold" }}>Weight: </span>
            <span>{userData?.weight} kg</span>
          </Typography>
          <Typography>
            <span style={{ color: "gray", fontWeight: "bold" }}>Age: </span>
            <span>{userData?.age} years</span>
          </Typography>
          <Typography>
            <span style={{ color: "gray", fontWeight: "bold" }}>
              Last Donated Blood at:{" "}
            </span>
            <span>{date ? dobFormat : "N/A"}</span>
          </Typography>
        </Stack>
        <Button
          style={{
            marginTop:'100px',
            textTransform: "none",
            fontWeight:'bold',
            color:'#fff',
            fontSize:'15px',
            padding:'0.5rem 2rem',
            backgroundColor:'#d20536',
            marginTop: 1,
            "&:hover": {
              bgcolor: "#1fc22f",
            },
            "&:focus": {
              bgcolor: "#18cd2a",
            },
          }}
        >
          Edit Details
        </Button>
      </Box>
    </>
  );
};

export default Profile;
