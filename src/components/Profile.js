import { Box, Typography } from "@material-ui/core";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Button } from "@material-ui/core";
import { collection, query, getDocs, where } from "firebase/firestore"
import { db } from "./auth/firebase-config";
import LoadingSpinner from "./auth/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData,setUserData] = useState({});
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    const userId = localStorage.getItem("userId");
    const getUser = async () => {
      setLoading(true)
      const q = query(collection(db, "users"), where("userId", "==", userId))
      const querySnapshot = await getDocs(q);
      console.log("query", querySnapshot.docs[0]._document.data)
      const data = querySnapshot.docs.map(u => ({...u.data()}))
      setUserData(data[0])
      setLoading(false)
    }

    getUser()
    
  }, [])

  console.log("profile", userData);

  const date = userData?.lastDonated;
  if (date) {
    var dob = new Date(date);
    var dobArr = dob.toDateString().split(" ");
    var dobFormat = dobArr[2] + " " + dobArr[1] + " " + dobArr[3];
  }
  if(loading)return <Box sx={{minHeight: '100vh'}} display='flex' flexDirection='column' alignItems='center' justifyContent="center">
    <LoadingSpinner />
  </Box>

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
            <span style={{ color: "gray", fontWeight: "bold" }}>
              Last Donated Blood at:{" "}
            </span>
            <span>{date ? dobFormat : "N/A"}</span>
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default Profile;
