import {
  Box,
  Avatar,
  Typography,
  Rating,
  Divider,
  Button
  
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ProfileList from "../Components/ProfileList";
import { useState } from "react";

const Profile = () => {
  const [image,setImage]=useState<string>(' ');
  const eventsname=[
    {name:'Maria&DAn',
      _id:'123459'},
    { name:'Maria&Manu',
      _id:'1234591213'},
      {name:'Maria&DAn',
      _id:'123459'},
    { name:'Maria&Manu',
      _id:'1234591213'},
      {name:'Maria&DAn',
      _id:'123459'},
    { name:'Maria&Manu',
      _id:'1234591213'},
      {name:'Maria&DAn',
      _id:'123459'},
    { name:'Maria&Manu',
      _id:'1234591213'},
      {name:'Maria&DAn',
      _id:'123459'},
    { name:'Maria&Manu',
      _id:'1234591213'},
      {name:'Maria&DAn',
      _id:'123459'},
    { name:'Maria&Manu',
      _id:'1234591213'},
      {name:'Maria&DAn',
      _id:'123459'},
    { name:'Maria&Manu',
      _id:'1234591213'},
      {name:'Maria&DAn',
      _id:'123459'},
    { name:'Maria&Manu',
      _id:'1234591213'}
  ]
  return (
    //UserView
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "70%",
          height: "14rem",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgb(190,38,35)",
          clipPath: "ellipse(54% 100% at 50.04% 0%)",
        }}
      >
        <Box
          //Avatar Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap:'10px'
          }}
        >
          <Avatar alt="Remy Sharp" sx={{ width: 100, height: 100 }} src={image} />
           <Button variant="contained" sx={{height:'1 rem'}} component="label">
        Upload
        <input hidden accept="image/*" multiple type="file" onChange={(e)=>{
         let data=URL.createObjectURL(e.target?.files?.[0] as Blob);
         setImage(data);
        }} />
      </Button>
          <Typography sx={{ fontSize: "1.2rem", color: "white" }}>
            Stefan Rudareanu
          </Typography>
        </Box>
      </Box>
      <Box
        //Info section
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "70%",
          height: "30rem",
          boxShadow: "10"
        }}
      >
        <Box
          //leftBox
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "25%",
            height: "30rem",
            // boxShadow: "10",
            justifyContent: "flex-end",
            alignItems: "center",
            gap:'40px'
           
          }}
        >
          <Box
            //left info container
            sx={{
              display: "flex",
              flexDirection: "Column",
              justifyContent: "center",
              alignItems: "center",
              gap: "40px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "Column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography component="legend">Rating:</Typography>
              <Rating name="simple-controlled" value={5} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "Column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LocationOnOutlinedIcon>:</LocationOnOutlinedIcon>
              <Typography sx={{ fontSize: "1rem", color: "black" }}>
                Timisoara
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "Column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LocalPhoneIcon>:</LocalPhoneIcon>
              <Typography sx={{ fontSize: "1rem", color: "black" }}>
                0768639391
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "Column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <EmailIcon>:</EmailIcon>
              <Typography sx={{ fontSize: "1rem", color: "black" }}>
                stefan.rudareanu@barman.ro
              </Typography>
            </Box>
          </Box>
          <Divider
            orientation="vertical"
            sx={{ alignSelf: "flex-end"}}
          ></Divider>
        </Box>
        <Box
          //List
          sx={{
            width: "20%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "30rem",
         
          }}
        >
          <ProfileList eventsnames={eventsname}/>
          <Divider
            orientation="vertical"
            sx={{ alignSelf: "flex-end" }}
          ></Divider>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
