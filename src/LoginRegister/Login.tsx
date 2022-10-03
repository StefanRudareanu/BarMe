import {
  Container,
  Card,
  Box,
  Typography,
  TextField,
  Button,
  CardMedia,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <Container
      sx={{
        maxWidth: "70%",
        width: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
          height: "30rem",
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
        >
          <TextField label="Email" size="medium"></TextField>
          <TextField label="Password" size="medium" type="password"></TextField>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="small"
            sx={{ width: "7rem" }}
            onClick={()=>{
                navigate('/Home')
            }}
          >
            Submit
          </Button>
        </Box>
        <Button
          variant="contained"
          color="success"
          size="medium"
          sx={{ width: "7rem" }}
          onClick={() => {
            navigate("/register");
          }}
        >
          {" "}
          Register
        </Button>
      </Card>
    </Container>
  );
};
export default Login;
