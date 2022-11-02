import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListSubheader,
  ListItemButton,
  ListItem,
  ListItemText,
  Divider,
  Snackbar,
  Alert
} from "@mui/material";
import { useState, useEffect } from "react";

import dayjs from "dayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DrinkList from "../Components/DrinkList";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import HandleInvitation from "../endpoints/HandleInvitation";
import useLocal from "../customhooks/useLocal";
import useTokenValidation from "../customhooks/useTokenValidation";
import { stat } from "fs";
interface invitationdata {
    eventDate: string;
    eventPlace: string;
    drinks: string[];
    sender: string;
    reciver: string;

}
const Invitation = () => {
  const { reciver } = useParams();
  const local = useLocal();
  const TokenValidation = useTokenValidation();
  const [pickerValue, setPickerValue] = useState<string>();
  const [drinklist, setDrinklist] = useState<string[]>([]);
  const [actualdrink, setActualDrink] = useState<string>(" ");
  const [eventplace, setEventPlace] = useState<string>();
  let [changeinlist, setChangeInList] = useState(0);
  let arraydrinks: string[];
  const [tokenstatus, setTokenStatus] = useState<number>();
  let token: string;
  let sender: string;
  const [warning, setWarning] = useState(false);
  const [succces,setSucces]=useState(false);
   const handleCloseSucces = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSucces(false);
  };
   const handleCloseWarnig= (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setWarning(false);
  };
  const handleSubmit = async (data: invitationdata) => {
    console.log(data);
    try {
      const res = await HandleInvitation().CreateInvitation(token, data,sender);
      if (res.status == 400) {
        setWarning(true);
      } else {
        setSucces(true);
      }
      const error=await res.json();
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

 
  if (local.GetLocalStorage("auth-token") == null) {
    token = local.GetLocalSessionStorage("auth-token");
    sender = local.GetLocalSessionStorage("username");
  } else {
    token = local.GetLocalStorage("auth-token");
    sender = local.GetLocalStorage("username");
  }
  useEffect(() => {
    if (token != null) {
      let status = TokenValidation.Validate(token);
      setTokenStatus(status);
    } else {
      setTokenStatus(400);
    }
  }, []);

  if (tokenstatus != null) {
    if (tokenstatus == 200) {
      return (
        <Box
          component="form"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "35%",
            height: "40rem",
            boxShadow: "10",
            borderRadius: "30px",
            flexDirection: "column",
            gap: "40px",
          }}
          onSubmit={(e)=>{
            e.preventDefault();  
            const data:invitationdata= {
                eventDate:pickerValue as string,
                eventPlace: eventplace,
                drinks: drinklist,
                sender: sender,
                reciver: reciver,
              };
              handleSubmit(data);

          }}
        >
          <Typography variant="h4" sx={{ marginTop: "30px" }}>
            Event Invite List
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: "20px",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs} required>
              <DesktopDatePicker
                label="Event Date"
                inputFormat="MM/DD/YYYY"
                value={pickerValue}
                onChange={(e) => {
                  setPickerValue(e);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <TextField
              required
              label="Event Place"
              onChange={(e) => {
                setEventPlace(e.target.value);
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "row",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                onChange={(e) => {
                  setActualDrink(e.target.value);
                }}
                label="Preffered Alchool Brands"
              ></TextField>
              <Button
                onClick={(e) => {
                  let data: string[] = drinklist;
                  let accdata = actualdrink.trim();
                  if (accdata != " ") {
                    data.push(actualdrink);
                    setDrinklist(drinklist);
                    setActualDrink(" ");
                  }
                }}
                variant="contained"
                size="small"
              >
                Add
              </Button>
            </Box>
            <Divider orientation="vertical"></Divider>
            <DrinkList alchool={drinklist} />
            <Divider orientation="vertical"></Divider>
          </Box>
          <Button
            variant="contained"
            type='submit'
          >
            SubmitInvite
          </Button>
          <Snackbar open={succces} autoHideDuration={6000} onClose={handleCloseSucces}>
            <Alert
              onClose={handleCloseSucces}
              severity="success"
              sx={{ width: "100%"}}
            >
              Invitation sent succesfully!
            </Alert>
          </Snackbar>
           <Snackbar open={warning} autoHideDuration={6000} onClose={handleCloseWarnig}>
                <Alert
              onClose={handleCloseWarnig}
              severity="error"
              sx={{ width: "100%"}}
            >
             Something went wrong!
            </Alert>
            </Snackbar>
        </Box>
      );
    } else {
      return <Navigate replace to="/" />;
    }
  }
};

export default Invitation;
