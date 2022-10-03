import { List,ListSubheader,Divider,ListItemText,ListItemButton,ListItem,Box} from "@mui/material";
import { FunctionComponent as FC} from "react";
interface props{
    eventsnames:{
        name:string,
        _id:string
    }[];
}




const ProfileList:FC<props>=(props)=>{
    const eventsnames=props.eventsnames;
    return(
        <List
            sx={{
              marginTop:'15px',
              height: "27rem",
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "",
              overflow:'auto',
              flexDirection:'column'}}
              disablePadding
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Recents Events</ListSubheader>
            }

          >
            
            {
            eventsnames.map((e)=>(
            <Box>
            <Divider/>
            <ListItem disablePadding sx={{ width: "100%"}} key={e._id}>
              <ListItemButton sx={{ width: "100%" }}>
                <ListItemText
                  sx={{ width: "100%" }}
                  primary={e.name}
                ></ListItemText>
              </ListItemButton>
            </ListItem>
            <Divider/>
            </Box>))}

            </List>
    )

}

export default ProfileList;