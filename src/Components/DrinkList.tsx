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
} from "@mui/material";
import {FunctionComponent as FC} from "react";

interface list{
    alchool:string[];
}


const DrinkList:FC<list> = (props) => {
    const drinklist=props.alchool;
  return (
    <List
      sx={{
        height: "20rem",
        width: "15rem",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "",
        overflow: "auto",
        flexDirection: "column",
      }}
      disablePadding
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Prefered drinks
        </ListSubheader>
      }
    >
      {drinklist.map((e) => (
        <Box>
          <Divider />
          <ListItem disablePadding sx={{ width: "100%" }}>
            <ListItemButton sx={{ width: "100%" }}>
              <ListItemText sx={{ width: "100%" }} primary={e}></ListItemText>
            </ListItemButton>
          </ListItem>
          <Divider />
        </Box>
      ))}
    </List>
  );
};
export default DrinkList;