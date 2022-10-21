import {
  Container,
  Box,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import useLocal from "../customhooks/useLocal";
import BarmanList from "../Components/BarmanList";
import UserData from "../endpoints/HandleUserData";
import { Navigate } from "react-router-dom";
import useTokenValidation from "../customhooks/useTokenValidation";
import Requests from "../Components/Requests";
import HandleInvitation from "../endpoints/HandleInvitation";
interface Barman {
  data: {
    username: string;
    phonenumber: string;
    email: string;
  }[];
}
interface listdata{
   data:{
    eventDate:string;
    sender:string;
    _id:string;
  }[]

}
const Home = () => {
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
  const local = useLocal();
  const TokenValidation = useTokenValidation();
  const [tabValue, setTab] = useState(0);
  let [change, setChange] = useState(0);
  const [viewbarman, setViewBarman] = useState("flex");
  const [viewrequests, setViewRequests] = useState("none");
  const [viewrecent, setViewRecent] = useState("none");
  const [data, setData] = useState<Barman>();
  const [invitedata,setInviteData]=useState<listdata>()
  const [inputValue, setInputValue] = useState("");
  const [tokenstatus, setTokenStatus] = useState<number>();
  let username: string;
  let token: string;
  let type: string;
  let location: string;
  if (local.GetLocalStorage("username") == null) {
    username = local.GetLocalSessionStorage("username") as string;
    token = local.GetLocalSessionStorage("auth-token") as string;
    type = local.GetLocalSessionStorage("usertype") as string;
    location = local.GetLocalSessionStorage("location") as string;
  } else {
    username = local.GetLocalStorage("username") as string;
    token = local.GetLocalStorage("auth-token") as string;
    type = local.GetLocalStorage("usertype") as string;
    location = local.GetLocalStorage("location") as string;
  }
  async function GetDataUser() {
    try {
      const res = await UserData().GetBarmanDataUser(inputValue, token);
      let data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function GetDataBarman() {
    try {
      const res = await UserData().GetBarmanDataBarman(
        username,
        inputValue,
        token
      );
      let data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function GetRequestsData(){
    try {
      const res=await HandleInvitation().GetInvitationBarman(token,username);
      const data=await res.json();
      setInviteData(data);
      console.log(data);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if (token != null) {
      let status = TokenValidation.Validate(token);
      setTokenStatus(status);
    } else {
      setTokenStatus(400);
    }
  }, []);
  useEffect(() => {
    setInputValue(location);
    if (type != "barman") {
      GetDataUser();
    } else {
      GetDataBarman();
    }
  }, []);
  useEffect(() => {
    if (type != "barman") {
      GetDataUser();
      console.log(inputValue);
    } else {
      GetDataBarman();
    }
  }, [change]);
useEffect(()=>{
  GetRequestsData();
},[])


  if (tokenstatus != null) {
    if (tokenstatus == 200) {
      return (
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
            height: "40rem",
            gap: "30px",
            overFlow: "auto",
          }}
        >
          <Tabs
            orientation="vertical"
            value={tabValue}
            onChange={(e, newvalue) => {
              setTab(newvalue);
              console.log(newvalue);
            }}
            aria-label="Vertical tabs example"
            sx={{
              borderRight: 1,
              borderColor: "divider",
              boxShadow: "10",
              width: "fit-content",
              height: "20rem",
              borderRadius: "10px",
              position: "sticky",

              minHeight: "auto",
            }}
          >
            <Tab
              sx={{ height: "6rem", marginTop: "1rem" }}
              label="FindBarman"
              onClick={() => {
                setViewBarman("flex");
                setViewRequests("none");
                setViewRecent("none");
              }}
            />
            <Tab
              sx={{ height: "6rem" }}
              label="YouRequests"
              onClick={() => {
                setViewBarman("none");
                setViewRequests("flex");
                setViewRecent("none");
              }}
            />
            <Tab
              sx={{ height: "6rem" }}
              label="RecentEvents"
              onClick={() => {
                setViewBarman("none");
                setViewRequests("none");
                setViewRecent("flex");
              }}
            />
          </Tabs>
          {data && <BarmanList viewbarman={viewbarman} data={data.data} />}
          <Box
            sx={{
              display: viewrecent,
              width: "40%",
              boxShadow: "5",
              height: "45rem",
              borderRadius: "20px",
            }}
          ></Box>
          <Box
            sx={{
              display: viewrequests,
              width: "40%",
              boxShadow: "5",
              height: "45rem",
              borderRadius: "20px",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {invitedata&&  <Requests  subheadername="Incoming requests" viewtype=' ' data={invitedata.data}></Requests>}
            {invitedata && <Requests subheadername="Upcoming Events"  viewtype='none' data={invitedata.data}/>}
          </Box>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              City
            </InputLabel>
            <Select
              required
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={inputValue}
              sx={{ width: "13rem" }}
              label="City"
              onChange={(e) => {
                console.log(e.target.value);
                setInputValue(e.target.value);
                setChange(++change);
              }}
            >
              {cities.map((e) => (
                <MenuItem value={e}>{e}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Container>
      );
    } else {
      return <Navigate replace to="/" />;
    }
  }
};
export default Home;
