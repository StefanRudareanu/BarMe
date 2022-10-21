import useLocal from "../customhooks/useLocal";
import {useEffect} from "react"
import { FunctionComponent as FC} from "react";
import {
  Box,
  Avatar,
  Typography,
  Rating,
  Divider,
  Button,
  List,
  ListItem,
  ListSubheader,
  IconButton,
  Collapse,
  TextField,
} from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
interface  listdata{
   subheadername:string;
   viewtype:string;
  data:{
    eventDate:string;
    sender:string;
    _id:string;
  }[]
}

const Requests:FC<listdata>=(props)=>{  
    const data=props.data;
    const viewtype=props.viewtype;
    const subheadername=props.subheadername;
    return (
        <Box
              sx={{
                width: "100%",
                height: "22.5rem",
              }}
            >
              <List
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  height:'22.5rem',
                  overflowY:'auto'
                }}
              >
                <ListSubheader sx={{ borderRadius: "20px",width:'100%',alignItems:'center'}}>
                {subheadername}
                </ListSubheader>
                <Divider sx={{ width: "100%"}}></Divider>
                {data.map((elm) => (
            <ListItem
                sx={{
                      width:'100%',
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      height:'2.5rem',
                   
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
                  <Typography sx={{fontSize:'1rem'}}>{elm.sender}</Typography>
                   <Typography sx={{fontSize:'0.7rem'}} >{`Event date: ${elm.eventDate}`}</Typography>

                  </Box>
                     <IconButton sx={{diplay:viewtype}}><AccountBoxIcon/></IconButton>  
                         <IconButton sx={{display:viewtype}}><DoneIcon/></IconButton>
                  <IconButton sx={{display:viewtype}}>
                     <ClearIcon/>
                  </IconButton>
                </ListItem> ))}
                <Divider sx={{width:'100%'}}></Divider>
                
              </List>
              
            </Box>
 
    )
}

export default Requests;