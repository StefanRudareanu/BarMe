
import { Eventcalendar,toast,MbscCalendarEvent, MbscEventcalendarView} from "@mobiscroll/react";
import useLocal from "../customhooks/useLocal";
import {useState,useEffect,useMemo,useCallback} from 'react'
import{Box} from '@mui/material';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import  HandleInvitation from '../endpoints/HandleInvitation';
interface inviteData{
    data:{
        eventDate:String;
        eventPlace:String;
        _id:string;
    }[]
}
interface CalendarEntry{
    id:string;
    start:string;
    end:string;
    title:string;
    description:string;
    allday:boolean;
    free:boolean;
    color:string;}

const Calendar =()=>{
const [calendarData,setCalendarData]=useState<CalendarEntry[]>();

const GetData=async ()=>{
    try {
           const res=await HandleInvitation().GetAcceptedEventsBarman(token,username);
           const data=await res.json() as inviteData;
           const CalendarData=data.data.map((e)=>({id:e._id,start:e.eventDate,end:e.eventDate,title:e.eventPlace,description:e.eventPlace,allday:false,free:true,color:'#009788'}as CalendarEntry));
           setCalendarData(CalendarData);

    } catch (error) {

        
    }
}
const local=useLocal();
let username:string;
let token:string;
//  const onEventClick =useCallback((event ) => {
//         toast({
//             message: event.event.title
//         });
//     }, []);
    
    const view =useMemo(() => {
        return {
            calendar: { labels: true }
        };
    }, []);

useEffect(()=>{
    GetData();

},[])

if(local.GetLocalSessionStorage('username')==null){
    username=local.GetLocalStorage('username');
    token=local.GetLocalStorage('auth-token');
}
else{
    username=local.GetLocalSessionStorage('username');
    token=local.GetLocalSessionStorage('auth-token');
}
    return(
    <Box sx={{width:'90%',boxShadow:'10'}}>
            <Eventcalendar
             theme="ios" 
            themeVariant="light"
            clickToCreate={true}
            dragToCreate={true}
            dragToMove={true}
            dragToResize={true}
            eventDelete={true}
            data={calendarData}
            view={view}
        ></Eventcalendar>
        </Box>


        
    )
}

export default Calendar;