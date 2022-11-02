import useLocal from "../customhooks/useLocal";
import {useCallback, useEffect} from "react"
import { FunctionComponent as FC} from "react";
import {
  Box,
  Avatar,
  Typography,
  Divider,
  List,
  ListItem,
  ListSubheader,
  IconButton,
  Rating,
  Dialog,
  DialogTitle
} from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HandleInvitation from "../endpoints/HandleInvitation";
import UserData from "../endpoints/HandleUserData";
import {useState} from 'react';
import Requierements from '../Page/Requirements';
interface  listdata{
   height:string;
   elmchange:Boolean;
   ratingdisplay?:string;
   token?:string;
   change?:number;
   setChange?:React.Dispatch<React.SetStateAction<number>>;
   subheadername:string;
   viewtype:string;
  data:{
    eventDate:string;
    eventPlace:string;
    drinks:string[];
    sender:string;
    reciver:string;
    inviteState:string;
    inviteRating:number;
    _id:string;
  }[]
}

const Requests:FC<listdata>=(props)=>{  
    const data=props.data;
    let change=props.change;
    let setChange=props.setChange;
    const elmchange=props.elmchange;
    const ratingdisplay=props.ratingdisplay;
    const token=props.token;
    const viewtype=props.viewtype;
    const height=props.height;
    const subheadername=props.subheadername;
    const [sender,setSender]=useState('none');
    const [reciver,setReciver]=useState('none');
    const [open,setOpen]=useState(false);
    const close=()=>{
        setOpen(false);
    }
    const handlerating=(async(id:string,value:number,username:string)=>{
        try {
          let res= await HandleInvitation().UpdateRatedInvite(token,id,value);
          let msg=await res.json();
          res= await UserData().AddRating(username,value,token);
          msg=await res.json();
          console.log(msg);
        } catch (error) {
            console.log(error);
        }
    })
    const handleaccept=(async(id:string)=>{
         try 
         {
            await HandleInvitation().AcceptInvitaion(token,id,'accepted');
         } catch (error) {
            console.log(error)
         }

    })
    const handledelete=(async(id:string)=>{
          try 
         {
           await HandleInvitation().DelteInvitation(token,id);
         } catch (error) {
            console.log(error)
         }


    })
    useEffect(()=>{
         if(elmchange==true){
            setReciver(' ');
        }
        else{
            setSender(' ');
        }

    },[]);
    return (
        <Box
              sx={{
                width: "100%",
                height: height,
              }}
            >
              <List
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  height:height,
                  overflowY:'auto'
                }}
              >
                <ListSubheader sx={{ borderRadius: "20px",width:'100%',alignItems:'center'}}>
                {subheadername}
                </ListSubheader>
                <Divider sx={{width:'100%'}} orientation='horizontal'></Divider>
                {
                

                data.map((elm) => {

                    
            if(elm.inviteState=='rating'||elm.inviteState=='pending'){
                return(
            <Box
             sx={{
                 width:'100%',
                 display: "flex",
                 flexDirection: "column",
                 justifyContent: "center",
                 alignItems: "center"
             }}
            >
            <ListItem
                sx={{
                      width:'100%',
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      height:'2.5rem',
                   
                }}
                key={elm._id}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                  <Typography sx={{fontSize:'1rem' ,display:sender}}>{elm.sender}</Typography>
                   <Typography sx={{fontSize:'1rem',display:reciver}}>{elm.reciver}</Typography>
                   <Typography sx={{fontSize:'0.7rem'}} >{`Event date: ${elm.eventDate}`}</Typography>
                  </Box>
                     <IconButton sx={{diplay:viewtype}} onClick={()=>{
                        setOpen(true);
                     }}><AccountBoxIcon/></IconButton>  
                    


                         <IconButton sx={{display:viewtype}} onClick={()=>{
                            handleaccept(elm._id);
                            setChange(++change);
                         }}><DoneIcon/></IconButton>
                  <IconButton sx={{display:viewtype}} onClick={()=>{
                    handledelete(elm._id);
                    setChange(++change);
                  }}>
                     <ClearIcon/>
                  </IconButton>
                     <Typography sx={{fontSize:'0.7rem',display:ratingdisplay }} component="legend">Rating:</Typography>
                     <Rating name='no-value' sx={{display:ratingdisplay}} value={null} onChange={async(event,value)=>
                        {
                              await handlerating(elm._id,value,elm.reciver);
                              setChange(++change);
                        }
                     }/>
                      <Dialog onClose={close} open={open}>
                       <Requierements list={elm.drinks} date={elm.eventDate} location={elm.eventPlace}></Requierements>
                      </Dialog>
                </ListItem>
                <Divider sx={{width:'100%'}} orientation='horizontal'></Divider>
                </Box>)}
                else {
                    
                    return(
                           <Box
             sx={{
                 width:'100%',
                 display: "flex",
                 flexDirection: "column",
                 justifyContent: "center",
                 alignItems: "center"
             }}
            >
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
                  <Typography sx={{fontSize:'1rem' ,display:sender}}>{elm.sender}</Typography>
                   <Typography sx={{fontSize:'1rem',display:reciver}}>{elm.reciver}</Typography>
                   <Typography sx={{fontSize:'0.7rem'}} >{`Event date: ${elm.eventDate}`}</Typography>
                  </Box>
                     <IconButton sx={{diplay:viewtype}}><AccountBoxIcon/></IconButton>  
                         <IconButton sx={{display:viewtype}} onClick={()=>{
                            handleaccept(elm._id);
                            setChange(++change);
                         }}><DoneIcon/></IconButton>
                  <IconButton sx={{display:viewtype}} onClick={()=>{
                    handledelete(elm._id);
                    setChange(++change);
                  }}>
                     <ClearIcon/>
                  </IconButton>
                     <Typography sx={{fontSize:'0.7rem',display:ratingdisplay }} component="legend">Rating:</Typography>
                     <Rating name='read-only' sx={{display:ratingdisplay}} value={elm.inviteRating} readOnly />
                </ListItem>
                <Divider sx={{width:'100%'}} orientation='horizontal'></Divider>
                </Box>
                
                
                )}
            })}
              
                
              </List>
              
            </Box>
 
    )
}

export default Requests;