import React, { useState } from "react";
import { Tabs, Tab, Paper } from "@material-ui/core";
import {Box,Typography} from "@material-ui/core";
import Login from "./auth/Login";
import Register from "./auth/Register";

const Home = (props) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const paperStyle = {
    width:340,
    margin:'20px auto'
  }

  return (
    <Paper elevation={10} style={paperStyle}> 
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="disabled tabs example"
        style={{minWidth:'340px'}}
      >
        <Tab label="SIGN IN" />
        <Tab label="SIGN UP" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Login users={props.users} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Register users={props.users} />
      </TabPanel>
    </Paper>
  );
};

export default Home;
