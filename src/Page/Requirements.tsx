import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListSubheader,
} from "@mui/material";
import { Navigate } from "react-router-dom";
import useLocal from "../customhooks/useLocal";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { FunctionComponent as FC } from "react";
interface alchoolList {
  list: string[];
  date: string;
  location: string;
}
const Requirements: FC<alchoolList> = (props) => {
  const list = props.list;
  const date = props.date;
  const location = props.location;

  return (
    <Box
      sx={{
        width: "25rem",
        height: "20rem",
        boxShadow: "10",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ marginTop: "10px" }} variant="h5">
          Your Event Requirements
        </Typography>
        <Divider sx={{ width: "100%" }} orientation="horizontal"></Divider>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AddLocationIcon sx={{ color: "blue" }} fontSize="large" />
        <Typography variant="h6">{location}</Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CalendarMonthIcon sx={{ color: "blue" }} fontSize="large" />
        <Typography variant="h6">{date}</Typography>
      </Box>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "8rem",
          width: "100%",
          overFlowY: "auto",
        }}
      >
        <ListSubheader>Alchool List</ListSubheader>
        {list.map((elm) => (
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            key={elm}
          >
            <Typography variant="h6">{elm}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Requirements;
