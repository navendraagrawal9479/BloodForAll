import React, { useState, useEffect } from "react";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/Home";
import { useDispatch } from "react-redux";
import { setLocation } from "./slices/locationSlice";
import { useSelector } from "react-redux";
import LoadingSpinner from "./components/auth/LoadingSpinner";
import { setData } from "./slices/dataSlice";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import Donors from "./components/Donors";
import { fetchUser } from "./components/EditProfile";

fetchUser();

const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  // const {data} = useSelector(state=>state.data)
  // console.log(data)

  navigator.geolocation.getCurrentPosition(function (position) {
    dispatch(setLocation(position.coords));
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://blood-donor-9b76a-default-rtdb.firebaseio.com/users.json"
      );

      if (!response.ok) {
        throw new Error("Something Went Wrong.");
      }
      const responseData = await response.json();
      // console.log(responseData)

      const loadedData = [];
      for (const key in responseData) {
        loadedData.push({
          key: key,
          userId: responseData[key].user.userId,
          location: responseData[key].user.location,
          name: responseData[key].user.name,
          phone: responseData[key].user.phone,
          email: responseData[key].user.email,
          password: responseData[key].user.password,
          bloodGroup: responseData[key].user.bloodGroup,
          gender: responseData[key].user.gender,
          age: responseData[key].user.age,
          weight: responseData[key].user.weight,
          lastDonated: responseData[key].user.lastDonated,
          infection: responseData[key].user.infection,
          hasTattoo: responseData[key].user.hasTattoo,
          hasAids: responseData[key].user.hasAids,
          hasChildBirth: responseData[key].user.hasChildBirth,
        });
      }

      setUsers(loadedData);
      setIsLoading(false);
    };

    fetchData().catch((error) => {
      setIsLoading(false);
    });
  }, []);

  const addUser = (newUser)=>{
    setUsers(prev=>{
      return [...prev,newUser]
    })
  }

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home users={users} />} />
        <Route path="/login" element={<Login users={users} />}  />
        <Route path="/register" element={<Register users={users} addNewUser = {addUser} />}  />
        <Route path="/home" element={<HomePage users={users} />} />
        <Route path="/profile" element={<Profile users={users} />} />
        <Route path="/donors" element={<Donors users={users} />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
