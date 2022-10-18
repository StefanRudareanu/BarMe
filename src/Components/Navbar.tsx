import { AppBar, Card, Typography ,Button,Avatar,Icon} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Logo from '../Log.svg'
import {useState,useEffect} from "react"
import useLocal from "../customhooks/useLocal";
const Navbar = () => {
  const navigate=useNavigate();
  const local=useLocal();
  const [viewprofile,setViewProfile]=useState(' ');
  let type:string;
    if (local.GetLocalStorage("username") == null) {
     type=local.GetLocalSessionStorage("usertype") as string;
  } else {
    type=local.GetLocalStorage("usertype") as string;
   
  }
  useEffect(()=>{

     if(type=='user'){
      setViewProfile('none');
     }
  })
 
  return (
    <AppBar
      sx={{
        alignSelf: "flex-start",
        display: "flex",
        height: "55px",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        boxShadow: "5",
        backgroundColor: "white",
        flexDirection:'row',
        position:'fixed',
        borderRadius:'100px' }}

      position="absolute"
    >
     <Icon sx={{height:'54px',width:'fit-content'}}>
      <img src={Logo} height='54px'></img>
     </Icon>
      <Button sx={{color:'white'}} onClick={()=>{
        navigate('/Home');
      }} > 
        <Typography sx={{fonstSize:'1rem',color:'black'}}>Home </Typography>
      </Button>
      <Button sx={{color:'white',display:viewprofile}} onClick={()=>{
        navigate('/Profile/Me');
        navigate(0);
      }}>
     
        <Typography  sx={{fonstSize:'1rem',color:'black'}}> Profile</Typography>
      </Button>
    </AppBar>
  );
};
export default Navbar;
