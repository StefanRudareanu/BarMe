import { AppBar, Card, Typography ,Button,Avatar,Icon} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Logo from '../Log.svg'
import { Link } from "react-router-dom";
import useLocal from "../customhooks/useLocal";
const Navbar = () => {
  const navigate=useNavigate();
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
      {/* <Button sx={{color:'white'}} onClick={()=>{
        navigate('/Profile/Me');
      }}>
     
        <Typography  sx={{fonstSize:'1rem',color:'black'}}> Profile</Typography>
      </Button> */}
       <Link to='/Profile/Me'>PROFILE</Link>
      
      
    </AppBar>
  );
};
export default Navbar;
