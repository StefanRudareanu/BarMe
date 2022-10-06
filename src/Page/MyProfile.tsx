import {
  Box,
  Avatar,
  Typography,
  Rating,
  Divider,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  TextField,
} from "@mui/material";

import useLocal from "../customhooks/useLocal";
import UserData from "../endpoints/HandleUserData";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ProfileList from "../Components/ProfileList";
import PhotoManager from "../endpoints/PhotoManager";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
interface userdata {
  data: {
    email: string;
    location: string;
    phonenumber: string;
    profileImage: string;
    rating: number;
    username: string;
  };
}
const Profile = () => {
  const [userdata, SetUserdata] = useState<userdata>();
  let [change, setChange] = useState(0);
  const [ratingstate, setRatingState] = useState("No rating given:");
  const [drink, setDrink] = useState("");
  const local = useLocal();
  let eventsnames = [
    { name: "Stefan", _id: "some" },
    { name: "Stefan", _id: "some" },
    { name: "Stefan", _id: "some" },
    { name: "Stefan", _id: "some" },
    { name: "Stefan", _id: "some" },
    { name: "Stefan", _id: "some" },
    { name: "Stefan", _id: "some" },
    { name: "Stefan", _id: "some" },
    { name: "Stefan", _id: "some" },
  ];
  const [open, setOpen] = useState(true);
  const handleOpen = () => {
    setOpen(!open);
  };
  let username: string;
  let token: string;
  const handlegetdata = async (username: string, token: string) => {
    try {
      const res = await UserData().GetUserData(username, token);
      const data = await res.json();
      SetUserdata(data);
      console.log(data.data.profileImage);
      if (data.data.rating != 0) {
        setRatingState("Rating");
      }
    } catch (error) {}
  };
  if (local.GetLocalStorage("username") == null) {
    username = local.GetLocalSessionStorage("username") as string;
    token = local.GetLocalSessionStorage("auth-token") as string;
  } else {
    username = local.GetLocalStorage("username") as string;
    token = local.GetLocalStorage("auth-token") as string;
  }
  useEffect(() => {
    handlegetdata(username, token);
  }, [change]);
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
            gap: "10px",
          }}
        >
          <Avatar
            alt="Remy Sharp"
            sx={{ width: 100, height: 100 }}
            src={userdata?.data.profileImage}
          />
          <Button
            variant="contained"
            sx={{ height: "1 rem" }}
            component="label"
            onClick={() => {
              console.log(userdata?.data.profileImage);
            }}
          >
            Upload
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={async (e) => {
                const data = e.target?.files?.[0] as Blob;
                const url = URL.createObjectURL(data);
                try {
                  let res = await PhotoManager().UploadProfilePhoto(
                    url,
                    username,
                    token
                  );
                  let msg = await res.json();
                  console.log(msg);
                  setChange(++change);
                } catch (error) {
                  console.log(error);
                }
              }}
            />
          </Button>
          <Typography sx={{ fontSize: "1.2rem", color: "white" }}>
            {userdata?.data.username}
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
          boxShadow: "10",
        }}
      >
        <Box
          //leftBox
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "20%",
            height: "30rem",
            // boxShadow: "10",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <Box
            //left info container
            sx={{
              display: "flex",
              flexDirection: "Column",
              justifyContent: "center",
              alignItems: "center",
              gap: "50px",
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
              <Typography component="legend">{ratingstate}</Typography>
              <Rating readOnly value={userdata?.data.rating} />
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
                {userdata?.data.location}
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
                {userdata?.data.phonenumber}
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
              <Typography sx={{ fontSize: "0.9rem", color: "black" }}>
                {userdata?.data.email}
              </Typography>
            </Box>
          </Box>
          <Divider
            orientation="vertical"
            sx={{ alignSelf: "flex-end" }}
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
          <ProfileList eventsnames={eventsnames}></ProfileList>
          <Divider
            orientation="vertical"
            sx={{ alignSelf: "flex-end" }}
          ></Divider>
        </Box>
        <Box
          sx={{
            width: "30%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
            height: "30rem",
          }}
        >
          <List sx={{ width: "100%" }}>
            <ListItemButton onClick={handleOpen}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add special cocktail" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Box
                  component="form"
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                  onSubmit={async (e) => {
                    e.preventDefault();
                    let res = await UserData().AddDrinks(
                      username,
                      token,
                      drink
                    );
                  }}
                >
                  <Button type="submit" variant="contained" size="small">
                    Add
                  </Button>
                  <TextField
                    size="small"
                    required
                    onChange={(e) => {
                      setDrink(e.target.value);
                    }}
                  />
                </Box>
              </List>
            </Collapse>
          </List>
        </Box>
      </Box>
    </Box>
  );
};
export default Profile;
