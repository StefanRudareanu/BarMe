
import {FunctionComponent as FC} from "react";
import {
    Box,
    Card,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Link
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useNavigate } from "react-router-dom";
interface barmans{
    data:{
        username:string,
        phonenumber:string,
        email:string}[];
        viewbarman:string;}
const BarmanList:FC<barmans>=(props)=>{
    const data=props.data;
     const viewbarman=props.viewbarman;
     const navigate=useNavigate();
  return(
     <Box
        sx={{
          display:viewbarman,
          width: "45%",
          borderRadius: "20px",
          alignItems: "flex-start",
          flexWrap:'wrap',
          justifyContent:'center',
          flexDirection:"row",
          height:'46rem',
          overflowY:"scroll",
          gap:'110px'}}
      >
    {data&&
    data.map((element)=>(
        
        <Card
          sx={{
            
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            boxShadow: "5",
            width: "30rem",
            borderRadius: "15px",
          }}
        >
          <CardMedia
            component="img"
            height="200"
            image={require("../avatar.jpg")}
          />
          <Accordion sx={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Details</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: "flex",
                flexDirection: "row",
                height: "1.5rem",
                justifyContent: "space-evenly",
                alignItems: "center",
                gap: "20px",
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
                <EmailIcon />
                <Typography>{element.email}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LocalPhoneIcon />
                <Typography>{element.phonenumber}</Typography>
              </Box>
              
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography>Name:</Typography>
                <Typography>{element.username}</Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Link
          component="button"
         variant="body2"
         underline="none"
         onClick={()=>{
            navigate(`/Profile/${element.username}`)
         }}
         >View Profile</Link>
         </Card>
    ))
      }
      </Box>

  )
}
export default BarmanList;