import { AppBar, Card, Typography ,Button,} from "@mui/material";
import {useNavigate} from "react-router-dom";
const Navbar = () => {
  const navigate=useNavigate();
  return (
    <AppBar
      sx={{
        alignSelf: "flex-start",
        display: "flex",
        height: "48px",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        boxShadow: "0",
        backgroundColor: "rgb(13,55,69)",
        flexDirection:'row',
        position:'fixed',
        
      }}

      position="absolute"
    >
      <Typography sx={{fonstSize:'1rem'}}>BarMe</Typography>
      <Button sx={{color:'white'}} onClick={()=>{
        navigate('/Home');
      }} > 
        <Typography sx={{fonstSize:'1rem'}}>Home </Typography>
      </Button>
      <Button sx={{color:'white'}} onClick={()=>{
        navigate('/MyProfile');
      }}>
        <Typography  sx={{fonstSize:'1rem'}}> Profile</Typography>
      </Button>
      
      
    </AppBar>
  );
};
export default Navbar;
