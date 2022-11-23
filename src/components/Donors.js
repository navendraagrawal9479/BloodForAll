import { Stack, Box } from "@mui/system";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DonorCard from "./DonorCard";
import Navbar from "./Navbar";

const Donors = ({ users }) => {
  const { location } = useSelector((state) => state.location);
  console.log("users", users);
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

  function calcCrow(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;
    return d;
  }

  const bloodDonorPatterns = {
    "O+": ["O+", "O-"],
    "O-": ["O-"],
    "A+": ["A+", "O+", "A-", "O-"],
    "A-": ["A-", "O-"],
    "B+": ["B+", "B-", "O+", "O-"],
    "B-": ["B-", "O-"],
    "AB+": ["AB+", "AB-", "O+", "O-", "A+", "A-", "B+", "B-"],
    "AB-": ["AB-", "A-", "B-", "O-"],
  };

  console.log(userData);
  const canReceiveFrom = bloodDonorPatterns[user.bloodGroup];
  // console.log(canReceiveFrom);

  const ValidDonors = [];

  users.map((u) => {
    if (userData?.userId !== u.userId) {
      const distance = calcCrow(
        location.lat,
        location.lng,
        u.location.lat,
        u.location.lng
      );
      console.log(distance);
      if (
        canReceiveFrom?.includes(u.bloodGroup) &&
        !u.hasChildBirth &&
        !u.hasTattoo
      ) {
        ValidDonors.push({ ...u, distance });
      }
    }
  });
  console.log(ValidDonors);

  return (
    <div>
      <Navbar />
      <Typography
        variant="h5"
        style={{
          fontWeight: "bold",
          margin: "1rem",
          fontFamily: "Mukta, sans-serif",
          textAlign: "center",
        }}
      >
        Donors near you
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 5,
        }}
      >
        <Stack
          direction="row"
          gap={2}
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
        >
          {ValidDonors.map((donor) => {
            return (
              <DonorCard
                key={donor.key}
                name={donor.name}
                bloodGroup={donor.bloodGroup}
                distance={donor.distance}
                phone={donor.phone}
                user={userData}
                email={donor.email}
              />
            );
          })}
        </Stack>
      </Box>
    </div>
  );
};

export default Donors;
