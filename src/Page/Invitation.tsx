import { Box, TextField ,Button,Typography,List,ListSubheader,ListItemButton,ListItem,ListItemText,Divider} from "@mui/material";
import { useState,useEffect } from "react";

import dayjs from "dayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DrinkList from "../Components/DrinkList";
const Invitation = () => {
  const [pickerValue, setPickerValue] = useState(dayjs("2022-01-01"));
  const [drinklist,setDrinklist]=useState<string[]>([]);
  const [actualdrink,setActualDrink]=useState<string>();
  let [changeinlist,setChangeInList]=useState(0);
  let arraydrinks:string[];
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "50%",
        height: "35rem",
        boxShadow: "10",
        borderRadius: "30px",
        flexDirection: "column",
        gap:"40px"
      }}
    >
    <Typography variant="h4" sx={{marginTop:'30px'}}>Event Invite List</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: "20px",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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

        <TextField label="Event Place" />
      </Box>
      <Box
       
      sx={{
         
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "row",
          gap: "5px",
        }}>
            <TextField  onChange={(e)=>{
                setActualDrink(e.target.value);
            }} label="Preffered Alchool Brands"></TextField>
            <Button    onClick={((e)=>{
            let data:string[]=drinklist;
            let accdata=actualdrink.trim();
            if(accdata!=' '){
            data.push(actualdrink);
            console.log(data);
            setDrinklist(drinklist)}
         })} variant="contained" size="small">Add</Button>
          <DrinkList alchool={drinklist}/>
        </Box>
        </Box>
  );
};

export default Invitation;
