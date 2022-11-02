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
} from "@mui/material"
;
import CocktailList from "../Components/CocktailsList";
import useLocal from "../customhooks/useLocal";
import UserData from "../endpoints/HandleUserData";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ProfileList from "../Components/ProfileList";
import PhotoManager from "../endpoints/PhotoManager";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useParams,Navigate,useNavigate} from "react-router-dom";
import HandleInvitation from "../endpoints/HandleInvitation";
import useTokenValidation from "../customhooks/useTokenValidation";
import Requests from "../Components/Requests"
interface userdata {
  data: {
    email: string;
    location: string;
    phonenumber: string;
    profileImage: string;
    rating: number;
    username: string;
    specilaDrinks:string[];

  };
};
interface listdata{
   data:{
    eventDate:string;
    eventPlace:string;
    drinks:string[];
    sender:string;
    reciver:string;
    inviteState:string;
    inviteRating:number;
    _id:string;
  }[]
}
const Profile = () => {

  const TokenValidation=useTokenValidation();
  const {usernameRoute}=useParams();
  const navigate=useNavigate();
  const [userdata, SetUserdata] = useState<userdata>();
  let [change, setChange] = useState(0);
  const [ratingstate, setRatingState] = useState("No rating given:");
  const [drink, setDrink] = useState("");
  const local = useLocal();
  const [viewType,setViewType]=useState(" ");
  const [viewInvite,setViewInvite]=useState("none");
  const [boxHeight,setHeight]=useState("23rem");
  const [boxMargin,setMargin]=useState('0px');
  const [tokenstatus,setTokenStatus]=useState<number>();
  const [open, setOpen] = useState(true);
  const [listdata,setListData]=useState<listdata>();
  const handleOpen = () => {
    setOpen(!open);
  };
  let username: string;
  let token: string;
  let type:string;
  async function GetRecentEvents() {
    try {
      const res = await HandleInvitation().GetRecentEvents(token, username);
      const data = await res.json();
   
      setListData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  const handlegetdata = async (username: string, token: string) => {
    try {
      const res = await UserData().GetUserData(username, token);
      const data = await res.json();
       
      SetUserdata(data);
      console.log(data.data.rating);
      if (data.data.rating != 0) {
        setRatingState("Rating");

      }
    } catch (error) {}
  };
    if (local.GetLocalStorage("username") == null) {
    username = local.GetLocalSessionStorage("username") as string;
    token = local.GetLocalSessionStorage("auth-token") as string;
     type=local.GetLocalSessionStorage("usertype") as string;
  } else {
    username = local.GetLocalStorage("username") as string;
    token = local.GetLocalStorage("auth-token") as string;
    type=local.GetLocalStorage("usertype") as string;
  }
  useEffect(()=>{
        if(token!=null){
      let status=TokenValidation.Validate(token);
      setTokenStatus(status);
     }
     else{
     setTokenStatus(400);
     }

  },[])
  useEffect(()=>{
     if(type!='barman') {
      setViewType('none');
      setHeight('28rem');
      setMargin('20px');
      console.log(usernameRoute);
      username=usernameRoute;
  
      setViewInvite(' ');}
      else if(type==='barman'&&usernameRoute!='Me'){
        setViewType('none');
        setHeight('28rem');
        setMargin('20px');
        // GetRecentEvents();
        username=usernameRoute;
        setViewInvite(' ');
        }

 },[]);
  useEffect(() => {
    handlegetdata(username, token);

     GetRecentEvents();

  }, [change]);
  if(tokenstatus!=null){
  if(tokenstatus==200){
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
            sx={{ height: "1 rem" , display:viewType}}
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
          <Button variant="contained" color="secondary" sx={{display:viewInvite}}
          onClick={()=>{
            navigate(`/MakeInvitation/${usernameRoute}`);
          }}
          >Send Invitation</Button>
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
              {userdata&&<Rating name='read-only' readOnly value={userdata?.data.rating} />}
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
              <Typography sx={{ fontSize: "0.75rem", color: "black" }}>
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
            width: "50%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "space-evenly",
            height: "30rem",
          }}
        >
          {listdata && (
              <Requests
                ratingdisplay=" "
                elmchange={false}
                subheadername="Recents events"
                viewtype="none"
                data={listdata.data}
                height={'30rem'}
              />
            )}
          <Divider
            orientation="vertical"
            sx={{ alignSelf: "flex-end" }}
          ></Divider>
        </Box>
        <Box
          sx={{
            width: "35%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            height: "30rem",
          }}
        >
          <Box sx={{
             width: "100%",
            flexDirection: "Column",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <List sx={{display:viewType}}>
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
                    setChange(++change);
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
                      console.log(drink);
                    }}
                  />
                </Box>
              </List>
            </Collapse>
          </List>
          <CocktailList boxMargin={boxMargin}  height={boxHeight} specilaDrinks={userdata?.data.specilaDrinks}></CocktailList>
          </Box>
          <Divider sx={{alignSelf:'flex-end'}} orientation="vertical"/>
        </Box>
      </Box>
    </Box>
  );}
  else {
    return(
      <Navigate replace to="/"/>
    )
  }
}
};
export default Profile;