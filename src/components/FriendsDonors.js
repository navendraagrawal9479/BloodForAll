import { Stack, Box } from "@mui/system";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DonorCard from "./DonorCard";
import Navbar from "./Navbar";
import { db } from "./auth/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore"
import LoadingSpinner from "./auth/LoadingSpinner";

const FriendsDonors = () => {
  const { location } = useSelector((state) => state.location);
  const [userData,setUserData] = useState({});
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const bloodGroup = localStorage.getItem('bloodGroup')

  useEffect(()=>{
    const userId = localStorage.getItem("userId");
    const usersCollectionRef = collection(db, "users")
    const q = query(collection(db, "users"), where("userId", "==", userId))
    
    const getUser = async () => {
      setLoading(true)
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(u => ({...u.data()})) 
      setUserData(data[0])
    }
    getUser();

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      const dataRecieved = []
      for(var i=0;i<data.docs.length;i++){
        const userData = data.docs[i].data()
        dataRecieved.push(userData)
        setUsers(dataRecieved)
      }
      setLoading(false)
    }
    getUsers()

  }, [])

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
  // console.log(canReceiveFrom);

  const ValidDonors = [];
  
  // console.log("usersData", users)
  // console.log("userData", userData)
  const canReceiveFrom = bloodDonorPatterns[bloodGroup];
  console.log("canReceiveFrom", canReceiveFrom)

  users.map((u) => {
    let months
    if(u?.lastDonated){
      const currDate = new Date();
      const time = currDate - new Date(u?.lastDonated);
      months = time/(2628000000);
    }
    if (userData?.userId !== u.userId) {
      const distance = calcCrow(
        location.lat,
        location.lng,
        u.location.lat,
        u.location.lng
      );
      if (
        canReceiveFrom?.includes(u?.bloodGroup) &&
        !u.hasChildBirth &&
        !u.hasTattoo && !u.infection && (!u?.lastDonated || months >= 3)
      ) {
        ValidDonors.push({ ...u, distance });
      }
    }
  });
  console.log(ValidDonors);
  if(loading)return <Box sx={{minHeight:'100vh'}} display='flex' flexDirection='column' alignItems='center' justifyContent="center">
    <LoadingSpinner />
  </Box>

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

export default FriendsDonors;
