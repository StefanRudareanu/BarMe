
import {Box,Avatar,Typography,Button} from "@mui/material";
import {FunctionComponent as FC} from "react";
interface drinklist{

  specilaDrinks:string[];
  height:string;
  boxMargin:string;
}
const CocktailList:FC<drinklist>=(props)=>{
    const specilaDrinks=props.specilaDrinks;
    const height=props.height;
    const margin=props.boxMargin;
    return(
     
        <Box
          sx={{
            display:"flex",
            flexDirection:"row",
            flexWrap:"wrap",
            justifyContent:'flex-start',
            alignItems:" flex-start",
            columnGap:"50px",
            marginTop:margin,
            height:height,
            overflow:"auto",
          }}> 
            { specilaDrinks&&
              specilaDrinks.map((e)=>(
                 <Box sx={{
              display:"flex",
              justifyContent:"center",
              alignItems:"center"}}
            key={specilaDrinks.indexOf(e)}>
              <Avatar variant="square" src={require('../cocktailpng.png')} sx={{height:'fit-content',width:'60px'}}> </Avatar>
              <Typography sx={{fontSize:'1rem'}}>{e}</Typography>
            </Box>
              ))
               }
          </Box>
    )
    



 }
export default CocktailList;