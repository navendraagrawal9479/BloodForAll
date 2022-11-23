import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import slogans from "./slogans/slogans";
import { Box, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import AboutCard from "./AboutCard";
import { Stack } from "@mui/system";

const HomePage = (props) => {
  const navigate = useNavigate();
  const findUser = localStorage.getItem("userId");
  if (!findUser) {
    navigate("/");
  }

  const quote = slogans[Math.floor(Math.random() * 6)];

  return (
    <>
      <Navbar />
      <Box
        sx={{
          margin: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h5"
          style={{
            fontWeight: "bold",
            margin: "1rem",
            fontFamily: "Mukta, sans-serif",
            textAlign: "center",
          }}
        >
          {quote}
        </Typography>
        <Stack
          flexWrap="wrap"
          direction="row"
          gap={2}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <AboutCard
            picture="blood_drop"
            title="What We Do?"
            message="We bridge the gap between the donors and the recepients without any intermediate source such as blood banks."
          />
          <AboutCard
            picture="blood_bag"
            title="Immediate Actions"
            message="We provide immediate access to blood donors in case of emergencies."
          />
        </Stack>
        <Button
          style={{
            color: "#fff",
            backgroundColor: "#d20536",
            margin: "15px 0",
            fontWeight: "bold",
          }}
          onClick={() => {
            navigate("/donors");
          }}
        >
          Search for donors
        </Button>
      </Box>
    </>
  );
};

export default HomePage;
