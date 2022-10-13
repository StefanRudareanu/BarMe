import {
  Container,
  Card,
  Box,
  Typography,
  TextField,
  Button,
  CardMedia,
  Alert,
  FormGroup,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import HandleLogReg from "../endpoints/HandleLogReg";
import useLocal from "../customhooks/useLocal";
interface dataprovided{
    token:string,
    username:string,
    type:string,
    location:string;
}
const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [status,setStatus]=useState<string>("none");
  const [checkstatus,setCheckstatus]=useState<string>(' ');
  const local=useLocal();
  const handleSubmit=async (data:object)=>{
          try {
            let response=await HandleLogReg().LogIn(data);
            if(response.status==400){
                let res=await response.json();
                setStatus(' ');
                console.log(res);}
            else {
                let res=await response.json() as dataprovided;
                if(checkstatus=='on'){
                local.CreateStorage(res.token,'auth-token');
                local.CreateStorage(res.username,'username');
                local.CreateStorage(res.type,'usertype');
                local.CreateStorage(res.location,'location')
                }
                else {
                local.CreateSessionStorage(res.token,'auth-token');
                local.CreateSessionStorage(res.username,'username');
                local.CreateSessionStorage(res.type,'usertype'); 
                local.CreateSessionStorage(res.location,'location') }
                navigate('/Home');
            }

          } catch (error) {
            console.log(error);
          }

  }
  return (
    <Container
      sx={{
        maxWidth: "70%",
        width: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection:'column',
        
      }}
    >
      <Card
        sx={{
          width: "100%",
          height: "100vh",
          zIndex: "-1",
          position: "absolute",
        }}
      >
        <CardMedia
          component="video"
          image={require("../BackgroundVideo.mp4")}
          autoPlay
          muted
          loop
          sx={{ height: "100vh", width: "100%", objectFit: "cover" }}
        ></CardMedia>
      </Card>
      
      <Card
        sx={{
          maxWidht: "70%",
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          borderRadius: "20px",
          boxShadow: "10",
          height: "33rem",
          gap: "20px",
        }}
      >
        <Typography variant="h4">Log In</Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            justifyContent: "center",
            alignItems: "center",
          }}
          onSubmit={((e)=>{
            e.preventDefault();
            const data={email:email,password:password};
            handleSubmit(data);
          })}
        >
          <TextField label="Email" size="medium" required onChange={(e)=>{
            setEmail(e.target.value);
          }}></TextField>
          <TextField label="Password" size="medium" type="password" required onChange={(e)=>{
            setPassword(e.target.value);
          }}></TextField>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="small"
            sx={{ width: "7rem" }}
          >
            Submit
          </Button>
        </Box>
        <Button
          variant="contained"
          color="success"
          size="small"
          sx={{ width: "7rem" }}
          onClick={() => {
            navigate('/register')}}>Register
        </Button>
        <FormGroup>
         <FormControlLabel label="Keep me signed in" sx={{fontSize:'0.4rem'}} control={<Checkbox  onChange={(e)=>{
           setCheckstatus(e.target.value);
         }}/>} />
        </FormGroup>
         <Alert severity="error" sx={{display:status}}>Invalid Email or Password</Alert>
      </Card>
      
    </Container>
  );
};

export default Login;
