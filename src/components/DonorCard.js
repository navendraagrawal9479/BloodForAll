import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from "@mui/material";
import React from "react";
import emailjs from "@emailjs/browser";
import CallIcon from "@mui/icons-material/Call";
import ReplyIcon from "@mui/icons-material/Reply";

const DonorCard = (props) => {
  const templateParams = {
    from_name:props.user.name,
    name: props.name,
    to_email: props.email,
    message: `A patient whose name is ${props.user.name} needs your blood and is ${props.distance} metres away from you. Please contact the patient if you are willing to donate blood. The phone number and Email ID of the patient is ${props.user.phone} and ${props.user.email}.`,
  };

  const sendEmail = () => {
    emailjs
      .send(
        "service_b0yxsj8",
        "template_eo6b8i5",
        templateParams,
        "N0qjUDWadbP1A76IP"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };

  return (
    <Card>
      <CardContent sx={{ width: "250px", height: "230px" }}>
        <Typography variant="h5" sx={{ fontSize: "20px" }}>
          {props.name}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#d20536" }}>
          {props.bloodGroup}
        </Typography>
        <Button
          startIcon={<CallIcon style={{color:'#fff'}} />}
          sx={{
            margin: 0,
            textTransform: "none",
            bgcolor: "#12a621",
            marginTop: 1,
            "&:hover": {
              bgcolor: "#1fc22f",
            },
            "&:focus": {
              bgcolor: "#18cd2a",
            },
          }}
          fullWidth
        >
          <Link
            href={`tel:${props.phone}`}
            underline="none"
            style={{
              textDecoration: "none",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "15px",
            }}
          >
            Call The Donor
          </Link>
        </Button>
        <Button
          startIcon={<ReplyIcon />}
          sx={{
            margin: 0,
            textTransform: "none",
            bgcolor: "#12a621",
            marginTop: 1,
            fontSize: "15px",
            fontWeight: "bold",
            color: "#fff",
            "&:hover": {
              bgcolor: "#1fc22f",
            },
            "&:focus": {
              bgcolor: "#18cd2a",
            },
          }}
          onClick={sendEmail}
          fullWidth
        >
          Send Request
        </Button>
      </CardContent>
    </Card>
  );
};

export default DonorCard;
