import {
  Container,
  Card,
  Box,
  Typography,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  CardMedia
} from "@mui/material";
import { useState } from "react";

const Register = () => {
  const cities = [
    "Timisoara",
    "Bucuresti",
    "Cluj",
    "Craiova",
    "Iasi",
    "Brasov",
    "Sibiu",
    "Oradea",
    "Arad",
  ];
  const [city, setCity] = useState<string>(" ");
  const [email, setEmail] = useState<string>(" ");
  const [password, setPasword] = useState<string>("");
  const [username, setUsername] = useState<string>(" ");
  const [usertype,setUserType]=useState<string>(" ");
  let cityname:string=' ';
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
          width: "70%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          borderRadius: "20px",
          boxShadow: "10",
          height: "35rem",
          gap: "50px",
        }}
      >
        <Typography variant="h4" sx={{ marginTop: "50px" }}>
          Register
        </Typography>
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <TextField label="Username" size="medium" required onChange={(e)=>{
                      setUsername(e.target.value);
            }}></TextField>
            <TextField label="Email" size="medium" onChange={(e)=>{
                setEmail(e.target.value);
            }} required></TextField>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <TextField
              label="Password"
              size="medium"
              type="password"
              onChange={(e)=>{
              setPasword(e.target.value);
              }}
              required
            ></TextField>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Oras
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={city}
                onChange={(e) => {
                 setCity(e.target.value);
                 console.log(city);
                 
                }}
                sx={{ width: "13rem" }}
                label="Oras"
                required
              >
                {cities.map((city) => (
                  <MenuItem key={city} value={String(city)}>{city}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
           <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                UserType
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={usertype}
                onChange={(e) => {
                  setUserType(e.target.value);
                }}
                sx={{ width: "13rem" }}
                label="UserType"
              >
                <MenuItem value='user'>user</MenuItem>
                <MenuItem value='barman'>barman</MenuItem>
              </Select>
            </FormControl>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="small"
            sx={{ width: "7rem" }}
            onClick={() => {}}
          >
            Submit
          </Button>
         </Box>
      </Card>
    </Container>
  );
};

export default Register;
