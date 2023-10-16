import dayjs from "dayjs";

interface invitationdata {
  eventDate: string;
  eventPlace: string;
  drinks: string[];
  sender: string;
  reciver: string;
}
const HandleInvitation = () => {
  return {
    async CreateInvitation(token: string, data: invitationdata,username:string) {
      return await fetch(`http://localhost:4000/api/event/${username}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(data),
      });
    },
    async GetInvitationBarman(token: string, username: string) {
      return await fetch(
        `http://localhost:4000/api/event/invitationbarman/${username}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "auth-token": token,
          },
        }
      );
    },
    async GetInvitationUsers(token: string, username: string) {
      return await fetch(
        `http://localhost:4000/api/event/invitationbarman/${username}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "auth-token": token,
          },
        }
      );
    },
    async DelteInvitation(token: string, invitationid: string) {
      return await fetch(`http://localhost:4000/api/event/${invitationid}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "auth-token": token,
        },
      });
    },
    async GetAcceptedEventsBarman(token: string, username: string) {
      return await fetch(
        `http://localhost:4000/api/event/accepted/${username}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "auth-token": token,
          },
        }
      );
    },
    async AcceptInvitaion(token:string,id:string,state:string){
        return await fetch(`http://localhost:4000/api/event/${id}/${state}`,{
            method:'PUT',
            headers:{
                "Content-type":"application/json",
                "auth-token":token
            }
        })
    },
    async GetRecentEvents(token:string,username:string){
        return await fetch(`http://localhost:4000/api/event/recentevents/${username}`,{
            method:'GET',
            headers:{
                'Content-type':'application/json',
                "auth-token":token
            }
        })

    },
      async GetRatingEvents(token:string,username:string){
        return await fetch(`http://localhost:4000/api/event/rating/${username}`,{
            method:'GET',
            headers:{
                'Content-type':'application/json',
                "auth-token":token
            }
        })
    },
    async UpdateRatedInvite(token:string,id:string,value:number){
        return await fetch(`http://localhost:4000/api/event/updaterating/${id}`,{
            method:'PATCH',
            headers:{
                'Content-type':'application/json',
                'auth-token':token  } ,
                body:JSON.stringify({value:value})})
    },
    async GetRatedEventsBarman(token:string, username:string){
      return await fetch(`http://localhost:4000/api/event/ratedeventsbarman/${username}`,{
        method:"GET",
        headers:{
          "Content-type":"application/json",
          'auth-token':token
        }
      })

    },
    async GetRequestedUser(token:string,username:string){
      return await fetch(`http://localhost:4000/api/event/requestedbarman/${username}`,{
        method:"GET",
        headers:{
          "Content-type":'application/json',
          'auth-token':token
        }
      })
    }
  };
};
export default HandleInvitation;
